import React from 'react';
import ContactForm from '../components/ContactForm';
import { Phone, Mail, Clock, MapPin } from 'lucide-react';
import { CONTACT_EMAIL, CONTACT_PHONE } from '../constants';

const Contact: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl font-black text-gray-900 mb-4">דברו איתנו</h1>
          <p className="text-xl text-gray-600">אנחנו כאן כדי לענות על כל שאלה ולהפוך את החלום שלכם למציאות.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Info Side */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-xl shadow-md border-r-4 border-brand-yellow">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">פרטי התקשרות</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-sky-100 p-3 rounded-full ml-4 text-brand-blue">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">טלפון</h4>
                    <p className="text-gray-600 dir-ltr text-right">{CONTACT_PHONE}</p>
                    <p className="text-sm text-gray-400">זמינים גם בוואטסאפ</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-sky-100 p-3 rounded-full ml-4 text-brand-blue">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">אימייל</h4>
                    <p className="text-gray-600">{CONTACT_EMAIL}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-sky-100 p-3 rounded-full ml-4 text-brand-blue">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">שעות פעילות</h4>
                    <p className="text-gray-600">ראשון - חמישי: 09:00 - 18:00</p>
                    <p className="text-gray-600">שישי: 09:00 - 13:00</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-brand-blue text-white p-8 rounded-xl shadow-md">
              <h3 className="text-2xl font-bold mb-4 text-brand-yellow">למה לסגור איתנו?</h3>
              <ul className="space-y-3 list-disc pr-5">
                <li>ליווי אישי מרגע הפנייה ועד החזרה לארץ.</li>
                <li>מחירים אטרקטיביים בהתחייבות.</li>
                <li>ידע מקומי ששווה זהב.</li>
                <li>טיפול בשינויים וביטולים מול הספקים בתאילנד.</li>
              </ul>
            </div>
          </div>

          {/* Form Side */}
          <div>
            <ContactForm title="שלחו לנו הודעה ונחזור בהקדם" />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;