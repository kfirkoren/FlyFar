import React, { useEffect, useState } from 'react';
import { DESTINATIONS } from '../constants';
import { Link } from 'react-router-dom';
import { MapPin, Calendar } from 'lucide-react';
import { Destination } from '../types';
import { loadDestinations, DESTINATIONS_STORAGE_KEY } from '../services/destinationStorage';

const Destinations: React.FC = () => {
  const [destinations, setDestinations] = useState<Destination[]>(() => loadDestinations());

  useEffect(() => {
    const syncFromStorage = (event: StorageEvent) => {
      if (event.key === DESTINATIONS_STORAGE_KEY) {
        setDestinations(loadDestinations());
      }
    };
    window.addEventListener('storage', syncFromStorage);
    return () => window.removeEventListener('storage', syncFromStorage);
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <div className="relative bg-brand-blue py-24">
         <div className="absolute inset-0 overflow-hidden mix-blend-multiply opacity-40">
            <img src="https://picsum.photos/id/29/1920/600" alt="background" className="w-full h-full object-cover" />
         </div>
         <div className="relative max-w-7xl mx-auto px-4 text-center text-white">
            <h1 className="text-5xl font-black mb-4 drop-shadow-md">יעדים בתאילנד</h1>
            <p className="text-xl max-w-2xl mx-auto opacity-100 font-medium">מהצפון הירוק ועד האיים האקזוטיים בדרום, תאילנד מציעה עולם ומלואו.</p>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="space-y-16">
          {destinations.map((dest, index) => (
            <div key={dest.id} className={`flex flex-col md:flex-row gap-8 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
              <div className="w-full md:w-1/2 h-80 md:h-[400px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white ring-4 ring-gray-100">
                <img src={dest.image} alt={dest.name} className="w-full h-full object-cover hover:scale-105 transition duration-700" />
              </div>
              
              <div className="w-full md:w-1/2 space-y-4">
                <h2 className="text-3xl font-bold text-gray-800 flex items-center">
                  <MapPin className="ml-2 text-brand-blue" /> {dest.name}
                </h2>
                <div className="flex items-center text-brand-dark bg-brand-yellow/30 w-fit px-3 py-1 rounded-full text-sm font-bold border border-brand-yellow/50">
                  <Calendar size={16} className="ml-2" /> עונה מומלצת: {dest.season}
                </div>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {dest.description}
                  <br />
                  זהו יעד מושלם המשלב טבע, תרבות ופינוק. בין אם אתם מחפשים הרפתקאות או בטן-גב, כאן תמצאו את הכל.
                </p>
                <div className="pt-4">
                  <Link to="/contact" className="inline-block border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white font-bold py-2 px-6 rounded-lg transition duration-300">
                    תכננו לי טיול ב{dest.name}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Destinations;
