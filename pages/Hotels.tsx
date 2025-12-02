import React, { useEffect, useState } from 'react';
import { HOTELS } from '../constants';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { Hotel } from '../types';
import { fetchHotels } from '../services/supabaseData';

const Hotels: React.FC = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchHotels();
        setHotels(data.length ? data : HOTELS);
      } catch (err) {
        console.error(err);
        setError('לא הצלחנו לטעון מלונות, מציג ברירת מחדל.');
        setHotels(HOTELS);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black text-gray-900 mb-4">מלונות מומלצים</h1>
          <p className="text-gray-600">בחרנו עבורכם את המלונות הטובים ביותר בכל רמת מחיר</p>
        </div>

        {isLoading ? (
          <div className="text-center text-gray-500">טוען מלונות...</div>
        ) : (
          <>
            {error && <div className="text-center text-red-600 mb-4">{error}</div>}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {hotels.map((hotel) => (
                <div key={hotel.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition group">
                  <div className="h-56 relative">
                    <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                    <div className="absolute bottom-0 right-0 bg-brand-blue text-white px-4 py-1 rounded-tl-lg text-sm font-bold">
                      {hotel.area}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold">{hotel.name}</h3>
                      <div className="flex text-brand-yellow">
                        {[...Array(hotel.stars)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                      </div>
                    </div>
                    <div className="text-sm text-gray-500 mb-4">{hotel.priceLevel}</div>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {hotel.tags.map(tag => (
                        <span key={tag} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-md">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Link to="/contact" className="block w-full text-center bg-brand-blue text-white py-2 rounded-lg font-bold hover:bg-sky-600 transition">
                      בדוק זמינות ומחיר
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

export default Hotels;
