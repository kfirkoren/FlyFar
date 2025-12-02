import React from 'react';
import { Facebook, Instagram, Phone, Mail, MapPin } from 'lucide-react';
import { CONTACT_EMAIL, CONTACT_PHONE } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8 border-t-8 border-brand-blue">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-right">
          
          <div>
            <h3 className="text-2xl font-black mb-6 text-brand-yellow">עפים רחוק</h3>
            <p className="text-gray-400 mb-6 leading-relaxed">
              אנחנו הופכים את החלום התאילנדי שלכם למציאות. <br/>
              טיולים בהתאמה אישית עם ליווי צמוד ומקצועי.
            </p>
            <div className="flex justify-center md:justify-start space-x-reverse space-x-4">
              <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-brand-blue hover:text-white transition"><Facebook size={20} /></a>
              <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-brand-blue hover:text-white transition"><Instagram size={20} /></a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6 text-white border-b-2 border-brand-blue inline-block pb-2">צור קשר</h3>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-center justify-center md:justify-start gap-3">
                <Phone size={18} className="text-brand-yellow" /> {CONTACT_PHONE}
              </li>
              <li className="flex items-center justify-center md:justify-start gap-3">
                <Mail size={18} className="text-brand-yellow" /> {CONTACT_EMAIL}
              </li>
              <li className="flex items-center justify-center md:justify-start gap-3">
                <MapPin size={18} className="text-brand-yellow" /> בנגקוק / תל אביב
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6 text-white border-b-2 border-brand-blue inline-block pb-2">ניווט מהיר</h3>
            <ul className="space-y-3 text-gray-400">
              <li><a href="/#/destinations" className="hover:text-brand-yellow transition">יעדים</a></li>
              <li><a href="/#/about" className="hover:text-brand-yellow transition">אודות</a></li>
              <li><a href="/#/contact" className="hover:text-brand-yellow transition">הצעת מחיר</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} עפים רחוק (Afim Rahok). כל הזכויות שמורות.
        </div>
      </div>
    </footer>
  );
};

export default Footer;