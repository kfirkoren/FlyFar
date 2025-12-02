import React, { useEffect, useState } from 'react';
import { PlusCircle, Trash2, RefreshCcw, Info } from 'lucide-react';
import { Destination, Hotel, Package, TripType } from '../types';
import {
  fetchPackages,
  fetchHotels,
  fetchDestinations,
  addPackage,
  addHotel,
  addDestination,
  deletePackage,
  deleteHotel,
  deleteDestination,
  resetPackages,
  resetHotels,
  resetDestinations,
} from '../services/supabaseData';

const isBrowser = () => typeof window !== 'undefined' && typeof localStorage !== 'undefined';
const ADMIN_USER = import.meta.env.VITE_ADMIN_USER || 'admin';
const ADMIN_PASS = import.meta.env.VITE_ADMIN_PASS || 'admin123';
const AUTH_KEY = 'afim-rahok-admin-auth';

const emptyPackageForm = {
  title: '',
  description: '',
  priceStart: 1800,
  duration: '7 ימים',
  type: TripType.COUPLES,
  image: '',
  highlights: ''
};

const emptyHotelForm = {
  name: '',
  stars: 4,
  area: '',
  priceLevel: '',
  image: '',
  tags: ''
};

const emptyDestinationForm = {
  name: '',
  description: '',
  image: '',
  season: ''
};

type PackageFormState = typeof emptyPackageForm;
type PackageFormField = keyof PackageFormState;
type HotelFormState = typeof emptyHotelForm;
type HotelFormField = keyof HotelFormState;
type DestinationFormState = typeof emptyDestinationForm;
type DestinationFormField = keyof DestinationFormState;

const AdminPackages: React.FC = () => {
  const [isAuthed, setIsAuthed] = useState<boolean>(() => (isBrowser() ? localStorage.getItem(AUTH_KEY) === '1' : false));
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [packages, setPackages] = useState<Package[]>([]);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [packageForm, setPackageForm] = useState<PackageFormState>(emptyPackageForm);
  const [hotelForm, setHotelForm] = useState<HotelFormState>(emptyHotelForm);
  const [destinationForm, setDestinationForm] = useState<DestinationFormState>(emptyDestinationForm);
  const [isLoading, setIsLoading] = useState(true);
  const [actionMessage, setActionMessage] = useState('');
  const [actionError, setActionError] = useState('');

  const loadAll = async () => {
    setIsLoading(true);
    setActionError('');
    try {
      const [p, h, d] = await Promise.all([fetchPackages(), fetchHotels(), fetchDestinations()]);
      setPackages(p);
      setHotels(h);
      setDestinations(d);
    } catch (err) {
      console.error(err);
      setActionError('שגיאה בטעינת הנתונים מסופבייס.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = loginForm.username === ADMIN_USER && loginForm.password === ADMIN_PASS;
    if (isValid) {
      setIsAuthed(true);
      setLoginError('');
      if (isBrowser()) {
        localStorage.setItem(AUTH_KEY, '1');
      }
    } else {
      setLoginError('שם משתמש או סיסמה שגויים');
    }
  };

  const handleLogout = () => {
    setIsAuthed(false);
    if (isBrowser()) {
      localStorage.removeItem(AUTH_KEY);
    }
  };

  const handlePackageChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const field = name as PackageFormField;
    setPackageForm((prev) => ({
      ...prev,
      [field]: field === 'priceStart' ? Number(value) : value,
    }));
  };

  const handleAddPackage = async (e: React.FormEvent) => {
    e.preventDefault();

    const highlightsArray = packageForm.highlights
      .split(',')
      .map((h) => h.trim())
      .filter(Boolean);

    try {
      const created = await addPackage({
        title: packageForm.title.trim() || 'חבילה חדשה',
        description: packageForm.description.trim() || 'תיאור יתווסף בהמשך.',
        priceStart: Number(packageForm.priceStart) || 0,
        duration: packageForm.duration || '7 ימים',
        type: packageForm.type,
        image: packageForm.image.trim() || `https://picsum.photos/seed/${Date.now()}/800/600`,
        highlights: highlightsArray.length ? highlightsArray : ['פירוט המאפיינים יתווסף בהמשך'],
      });
      setPackages((prev) => [...prev, created]);
      setPackageForm(emptyPackageForm);
      setActionMessage('חבילה נוספה בהצלחה');
      setActionError('');
    } catch (err) {
      console.error(err);
      setActionError('שגיאה בהוספת חבילה.');
    }
  };

  const handleRemovePackage = async (id: string) => {
    try {
      await deletePackage(id);
      setPackages((prev) => prev.filter((pkg) => pkg.id !== id));
      setActionMessage('חבילה נמחקה');
    } catch (err) {
      console.error(err);
      setActionError('שגיאה במחיקת חבילה.');
    }
  };

  const handleResetPackages = async () => {
    try {
      const fresh = await resetPackages();
      setPackages(fresh);
      setActionMessage('חבילות אופסו לברירת מחדל');
    } catch (err) {
      console.error(err);
      setActionError('שגיאה באיפוס חבילות.');
    }
  };

  const handleHotelChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const field = name as HotelFormField;
    setHotelForm((prev) => ({
      ...prev,
      [field]: field === 'stars' ? Number(value) : value,
    }));
  };

  const handleAddHotel = async (e: React.FormEvent) => {
    e.preventDefault();

    const tagsArray = hotelForm.tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    try {
      const created = await addHotel({
        name: hotelForm.name.trim() || 'מלון חדש',
        stars: Math.min(Math.max(Number(hotelForm.stars) || 0, 1), 5),
        area: hotelForm.area || 'תאילנד',
        priceLevel: hotelForm.priceLevel || 'בינוני',
        image: hotelForm.image.trim() || `https://picsum.photos/seed/h${Date.now()}/800/600`,
        tags: tagsArray.length ? tagsArray : ['מאפיינים יתווספו בהמשך'],
      });
      setHotels((prev) => [...prev, created]);
      setHotelForm(emptyHotelForm);
      setActionMessage('מלון נוסף בהצלחה');
      setActionError('');
    } catch (err) {
      console.error(err);
      setActionError('שגיאה בהוספת מלון.');
    }
  };

  const handleRemoveHotel = async (id: string) => {
    try {
      await deleteHotel(id);
      setHotels((prev) => prev.filter((hotel) => hotel.id !== id));
      setActionMessage('מלון נמחק');
    } catch (err) {
      console.error(err);
      setActionError('שגיאה במחיקת מלון.');
    }
  };

  const handleResetHotels = async () => {
    try {
      const fresh = await resetHotels();
      setHotels(fresh);
      setActionMessage('מלונות אופסו לברירת מחדל');
    } catch (err) {
      console.error(err);
      setActionError('שגיאה באיפוס מלונות.');
    }
  };

  const handleDestinationChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const field = name as DestinationFormField;
    setDestinationForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddDestination = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const created = await addDestination({
        name: destinationForm.name.trim() || 'יעד חדש',
        description: destinationForm.description.trim() || 'תיאור יתווסף בהמשך.',
        image: destinationForm.image.trim() || `https://picsum.photos/seed/d${Date.now()}/800/600`,
        season: destinationForm.season || 'כל השנה',
      });
      setDestinations((prev) => [...prev, created]);
      setDestinationForm(emptyDestinationForm);
      setActionMessage('יעד נוסף בהצלחה');
      setActionError('');
    } catch (err) {
      console.error(err);
      setActionError('שגיאה בהוספת יעד.');
    }
  };

  const handleRemoveDestination = async (id: string) => {
    try {
      await deleteDestination(id);
      setDestinations((prev) => prev.filter((dest) => dest.id !== id));
      setActionMessage('יעד נמחק');
    } catch (err) {
      console.error(err);
      setActionError('שגיאה במחיקת יעד.');
    }
  };

  const handleResetDestinations = async () => {
    try {
      const fresh = await resetDestinations();
      setDestinations(fresh);
      setActionMessage('יעדים אופסו לברירת מחדל');
    } catch (err) {
      console.error(err);
      setActionError('שגיאה באיפוס יעדים.');
    }
  };

  if (!isAuthed) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-md border border-gray-200 space-y-6">
          <div className="flex items-center gap-3">
            <PlusCircle className="text-brand-blue" />
            <div>
              <h1 className="text-2xl font-black text-gray-900">כניסה לממשק מנהל</h1>
              <p className="text-gray-500 text-sm">נא להזין שם משתמש וסיסמה</p>
            </div>
          </div>

          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">שם משתמש</label>
              <input
                type="text"
                value={loginForm.username}
                onChange={(e) => setLoginForm((prev) => ({ ...prev, username: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent bg-gray-50 focus:bg-white transition"
                placeholder="admin"
                autoComplete="username"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">סיסמה</label>
              <input
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm((prev) => ({ ...prev, password: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent bg-gray-50 focus:bg-white transition"
                placeholder="******"
                autoComplete="current-password"
                required
              />
            </div>
            {loginError && <p className="text-sm text-red-600">{loginError}</p>}
            <button
              type="submit"
              className="w-full bg-brand-blue hover:bg-sky-600 text-white font-bold py-3 rounded-xl shadow-md transition"
            >
              כניסה
            </button>
          </form>
          <p className="text-xs text-gray-400 text-center">
            לצורכי אבטחה אמתית נדרש אימות בצד שרת. כאן ההגנה היא בצד לקוח בלבד.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 space-y-10">
        <div className="bg-white shadow-md p-6 rounded-2xl border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <PlusCircle className="text-brand-blue" />
              <h1 className="text-3xl font-black text-gray-900">ממשק מנהל - חבילות, מלונות ויעדים</h1>
            </div>
            <button
              onClick={handleLogout}
              className="text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg transition"
            >
              התנתק
            </button>
          </div>
          <div className="flex items-start gap-2 text-sm text-gray-600 bg-sky-50 p-3 rounded-xl border border-sky-100">
            <Info size={18} className="text-brand-blue mt-0.5" />
            <p>
              הנתונים נשמרים בסופבייס. בסביבת פרודקשן מומלץ להפעיל RLS ולהגביל כתיבה למשתמשים מאומתים או דרך API מאובטח.
            </p>
          </div>
        </div>
        {isLoading && <div className="text-center text-gray-500">טוען נתונים מסופבייס...</div>}
        {actionError && <div className="text-center text-red-600">{actionError}</div>}
        {actionMessage && <div className="text-center text-green-600">{actionMessage}</div>}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <form onSubmit={handleAddPackage} className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">הוספת חבילה חדשה</h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">כותרת</label>
              <input
                name="title"
                value={packageForm.title}
                onChange={handlePackageChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent bg-gray-50 focus:bg-white transition"
                placeholder="לדוגמה: חופשה משפחתית בפוקט"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">תיאור קצר</label>
              <textarea
                name="description"
                value={packageForm.description}
                onChange={handlePackageChange}
                rows={3}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent bg-gray-50 focus:bg-white transition"
                placeholder="שורת המחץ של החבילה"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">מחיר התחלתי (USD)</label>
                <input
                  type="number"
                  name="priceStart"
                  value={packageForm.priceStart}
                  onChange={handlePackageChange}
                  min={0}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent bg-gray-50 focus:bg-white transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">משך החבילה</label>
                <input
                  name="duration"
                  value={packageForm.duration}
                  onChange={handlePackageChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent bg-gray-50 focus:bg-white transition"
                  placeholder="לדוגמה: 10 ימים"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">סוג קהל</label>
                <select
                  name="type"
                  value={packageForm.type}
                  onChange={handlePackageChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent bg-gray-50 focus:bg-white transition"
                >
                  {[TripType.COUPLES, TripType.FAMILIES, TripType.YOUNG].map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">כתובת תמונה</label>
                <input
                  name="image"
                  value={packageForm.image}
                  onChange={handlePackageChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent bg-gray-50 focus:bg-white transition"
                  placeholder="https://example.com/photo.jpg"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">מאפיינים (מופרדים בפסיק)</label>
              <textarea
                name="highlights"
                value={packageForm.highlights}
                onChange={handlePackageChange}
                rows={2}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent bg-gray-50 focus:bg-white transition"
                placeholder="לדוגמה: מלונות 5 כוכבים, מדריך צמוד, סיורי אוכל"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-brand-blue hover:bg-sky-600 text-white font-bold py-3 rounded-xl shadow-md transition"
            >
              הוסף חבילה
            </button>
          </form>

          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">חבילות קיימות ({packages.length})</h2>
              <button
                onClick={handleResetPackages}
                className="flex items-center gap-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg transition"
              >
                <RefreshCcw size={16} /> אפס לברירת מחדל
              </button>
            </div>

            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
              {packages.map((pkg) => (
                <div key={pkg.id} className="border border-gray-200 rounded-xl p-4 flex flex-col gap-2 bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase text-gray-500">{pkg.type}</p>
                      <h3 className="text-lg font-bold text-gray-900">{pkg.title}</h3>
                    </div>
                    <button
                      onClick={() => handleRemovePackage(pkg.id)}
                      className="text-red-600 hover:text-red-700 bg-white border border-red-200 rounded-full p-2 transition"
                      aria-label={`מחק ${pkg.title}`}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <p className="text-sm text-gray-600">{pkg.description}</p>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="bg-white border border-gray-200 text-gray-700 px-2 py-1 rounded-md">משך: {pkg.duration}</span>
                    <span className="bg-white border border-gray-200 text-gray-700 px-2 py-1 rounded-md">החל מ-${pkg.priceStart}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {pkg.highlights.slice(0, 4).map((h, i) => (
                      <span key={i} className="bg-brand-blue/10 text-brand-blue text-xs px-2 py-1 rounded-md">
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
              {packages.length === 0 && (
                <div className="text-center text-gray-500 py-10 border border-dashed border-gray-300 rounded-xl">
                  אין חבילות להצגה. הוסיפו חבילה חדשה או אפסו לברירת המחדל.
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <form onSubmit={handleAddHotel} className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">הוספת מלון חדש</h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">שם המלון</label>
              <input
                name="name"
                value={hotelForm.name}
                onChange={handleHotelChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent bg-gray-50 focus:bg-white transition"
                placeholder="לדוגמה: Four Seasons Bangkok"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">דירוג כוכבים (1-5)</label>
                <input
                  type="number"
                  name="stars"
                  value={hotelForm.stars}
                  onChange={handleHotelChange}
                  min={1}
                  max={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent bg-gray-50 focus:bg-white transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">אזור</label>
                <input
                  name="area"
                  value={hotelForm.area}
                  onChange={handleHotelChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent bg-gray-50 focus:bg-white transition"
                  placeholder="פוקט / בנגקוק / קוסמוי"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">רמת מחיר</label>
                <input
                  name="priceLevel"
                  value={hotelForm.priceLevel}
                  onChange={handleHotelChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent bg-gray-50 focus:bg-white transition"
                  placeholder="יוקרה / גבוה / בינוני"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">כתובת תמונה</label>
                <input
                  name="image"
                  value={hotelForm.image}
                  onChange={handleHotelChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent bg-gray-50 focus:bg-white transition"
                  placeholder="https://example.com/photo.jpg"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">תגיות (מופרדות בפסיק)</label>
              <textarea
                name="tags"
                value={hotelForm.tags}
                onChange={handleHotelChange}
                rows={2}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent bg-gray-50 focus:bg-white transition"
                placeholder="לדוגמה: חוף פרטי, מתאים למשפחות, ספא"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-brand-blue hover:bg-sky-600 text-white font-bold py-3 rounded-xl shadow-md transition"
            >
              הוסף מלון
            </button>
          </form>

          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">מלונות קיימים ({hotels.length})</h2>
              <button
                onClick={handleResetHotels}
                className="flex items-center gap-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg transition"
              >
                <RefreshCcw size={16} /> אפס לברירת מחדל
              </button>
            </div>

            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
              {hotels.map((hotel) => (
                <div key={hotel.id} className="border border-gray-200 rounded-xl p-4 flex flex-col gap-2 bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase text-gray-500">{hotel.area}</p>
                      <h3 className="text-lg font-bold text-gray-900">{hotel.name}</h3>
                    </div>
                    <button
                      onClick={() => handleRemoveHotel(hotel.id)}
                      className="text-red-600 hover:text-red-700 bg-white border border-red-200 rounded-full p-2 transition"
                      aria-label={`מחק ${hotel.name}`}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <p className="text-sm text-gray-600">דירוג: {hotel.stars} כוכבים · רמת מחיר: {hotel.priceLevel}</p>
                  <div className="flex flex-wrap gap-2">
                    {hotel.tags.slice(0, 4).map((tag, i) => (
                      <span key={i} className="bg-brand-blue/10 text-brand-blue text-xs px-2 py-1 rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
              {hotels.length === 0 && (
                <div className="text-center text-gray-500 py-10 border border-dashed border-gray-300 rounded-xl">
                  אין מלונות להצגה. הוסיפו מלון חדש או אפסו לברירת המחדל.
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <form onSubmit={handleAddDestination} className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">הוספת יעד חדש</h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">שם היעד</label>
              <input
                name="name"
                value={destinationForm.name}
                onChange={handleDestinationChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent bg-gray-50 focus:bg-white transition"
                placeholder="לדוגמה: קופנגן"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">תיאור</label>
              <textarea
                name="description"
                value={destinationForm.description}
                onChange={handleDestinationChange}
                rows={3}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent bg-gray-50 focus:bg-white transition"
                placeholder="מה מיוחד ביעד הזה?"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">עונה מומלצת</label>
                <input
                  name="season"
                  value={destinationForm.season}
                  onChange={handleDestinationChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent bg-gray-50 focus:bg-white transition"
                  placeholder="לדוגמה: נובמבר - פברואר"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">כתובת תמונה</label>
                <input
                  name="image"
                  value={destinationForm.image}
                  onChange={handleDestinationChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent bg-gray-50 focus:bg-white transition"
                  placeholder="https://example.com/photo.jpg"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-brand-blue hover:bg-sky-600 text-white font-bold py-3 rounded-xl shadow-md transition"
            >
              הוסף יעד
            </button>
          </form>

          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">יעדים קיימים ({destinations.length})</h2>
              <button
                onClick={handleResetDestinations}
                className="flex items-center gap-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg transition"
              >
                <RefreshCcw size={16} /> אפס לברירת מחדל
              </button>
            </div>

            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
              {destinations.map((dest) => (
                <div key={dest.id} className="border border-gray-200 rounded-xl p-4 flex flex-col gap-2 bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase text-gray-500">{dest.season}</p>
                      <h3 className="text-lg font-bold text-gray-900">{dest.name}</h3>
                    </div>
                    <button
                      onClick={() => handleRemoveDestination(dest.id)}
                      className="text-red-600 hover:text-red-700 bg-white border border-red-200 rounded-full p-2 transition"
                      aria-label={`מחק ${dest.name}`}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <p className="text-sm text-gray-600">{dest.description}</p>
                </div>
              ))}
              {destinations.length === 0 && (
                <div className="text-center text-gray-500 py-10 border border-dashed border-gray-300 rounded-xl">
                  אין יעדים להצגה. הוסיפו יעד חדש או אפסו לברירת המחדל.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPackages;
