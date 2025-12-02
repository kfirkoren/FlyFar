import React, { useEffect, useState } from 'react';
import { TripType, Package } from '../types';
import { CheckCircle, Clock, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fetchPackages } from '../services/supabaseData';
import { PACKAGES } from '../constants';

const Packages: React.FC = () => {
  const [filter, setFilter] = useState<TripType>(TripType.ALL);
  const [packages, setPackages] = useState<Package[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchPackages();
        setPackages(data.length ? data : PACKAGES);
      } catch (err) {
        console.error(err);
        setError('לא הצלחנו לטעון את החבילות כרגע, מציג ברירת מחדל.');
        setPackages(PACKAGES);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  const filteredPackages = filter === TripType.ALL 
    ? packages 
    : packages.filter(p => p.type === filter);

  return (
    <div className="pt-8 pb-16 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black text-gray-900 mb-4">חבילות נופש בתאילנד</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            בחרו את סגנון הטיול שלכם ותנו לצוות של <span className="font-bold text-brand-blue">עפים רחוק</span> לדאוג לכל השאר.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {[TripType.ALL, TripType.COUPLES, TripType.FAMILIES, TripType.YOUNG].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                filter === type 
                  ? 'bg-brand-blue text-white shadow-lg transform scale-105 ring-2 ring-offset-2 ring-brand-blue' 
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="text-center text-gray-500">טוען חבילות...</div>
        ) : (
          <>
            {error && <div className="text-center text-red-600 mb-4">{error}</div>}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPackages.map((pkg) => (
                <div key={pkg.id} className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col h-full border border-gray-100 hover:border-brand-yellow transition-colors duration-300">
                  <div className="relative h-64">
                    <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover" />
                    <div className="absolute top-4 right-4 bg-brand-yellow text-gray-900 text-xs font-bold px-3 py-1 rounded-full uppercase shadow-md">
                      {pkg.type}
                    </div>
                  </div>
                  
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-2xl font-bold mb-3 text-gray-800">{pkg.title}</h3>
                    <p className="text-gray-600 mb-6 flex-1">{pkg.description}</p>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center text-gray-500">
                        <Clock size={18} className="ml-2 text-brand-blue" />
                        <span>{pkg.duration}</span>
                      </div>
                      <div className="flex items-center text-gray-500">
                        <DollarSign size={18} className="ml-2 text-brand-blue" />
                        <span>החל מ-${pkg.priceStart} לאדם</span>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-bold text-gray-900 mb-2 text-sm">מה בחבילה:</h4>
                      <ul className="space-y-1">
                        {pkg.highlights.map((h, i) => (
                          <li key={i} className="flex items-start text-sm text-gray-600">
                            <CheckCircle size={14} className="ml-2 mt-1 text-green-500 shrink-0" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Link 
                      to="/contact"
                      className="block w-full bg-gray-900 hover:bg-brand-blue text-white text-center font-bold py-3 rounded-xl transition duration-300"
                    >
                      קבלו הצעה לחבילה זו
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

      </div>
    </div>
  );
};

export default Packages;
