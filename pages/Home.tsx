import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Map, Sun, Star } from 'lucide-react';
import ContactForm from '../components/ContactForm';
import { DESTINATIONS } from '../constants';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center text-white">
        <div className="absolute inset-0 bg-brand-blue/30 z-10 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-black/20 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: 'url("https://picsum.photos/id/1039/1920/1080")' }} 
        ></div>
        
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-7xl font-black mb-6 drop-shadow-lg text-white">
            מתכננים טיול לתאילנד? <br/>
            <span className="text-brand-yellow drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">עפים רחוק</span> איתכם.
          </h1>
          <p className="text-xl md:text-2xl mb-8 font-medium drop-shadow-md">
            טיסות, מלונות יוקרה, אטרקציות ומסלול מותאם אישית בדיוק בשבילכם.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link to="/contact" className="bg-brand-yellow hover:bg-yellow-400 text-gray-900 text-lg font-bold py-3 px-8 rounded-full transition shadow-xl transform hover:scale-105">
              תכנון מסלול אישי
            </Link>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-12">איך זה עובד?</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { title: 'משאירים פרטים', icon: '📝', desc: 'ממלאים טופס קצר עם העדפות ותקציב' },
              { title: 'בונים מסלול', icon: '🗺️', desc: 'המומחים שלנו בונים לכם לו"ז מדויק' },
              { title: 'סוגרים הזמנות', icon: '✅', desc: 'מלונות, טיסות פנים ואטרקציות במחירים הטובים ביותר' },
              { title: 'טסים בראש שקט', icon: '✈️', desc: 'אנחנו זמינים לכל שאלה גם בזמן הטיול' }
            ].map((step, idx) => (
              <div key={idx} className="p-6 rounded-xl bg-gray-50 hover:shadow-lg hover:bg-sky-50 transition border border-transparent hover:border-brand-blue/20">
                <div className="text-5xl mb-4">{step.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-brand-blue">{step.title}</h3>
                <p className="text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-brand-blue text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-brand-yellow/20 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <h2 className="text-3xl font-bold text-center mb-12">למה לבחור ב-"עפים רחוק"?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Map, title: 'מומחיות מקומית', text: 'צוות שנמצא בתאילנד ומכיר כל פינה.' },
              { icon: Sun, title: 'שירות בעברית', text: 'מענה מלא בעברית, גם בווטסאפ.' },
              { icon: Star, title: 'מחירים הוגנים', text: 'ללא עמלות תיווך מיותרות.' },
              { icon: CheckCircle, title: 'אמינות', text: 'אלפי לקוחות מרוצים לא טועים.' },
            ].map((item, i) => (
              <div key={i} className="text-center p-6 border-2 border-white/20 rounded-2xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition">
                <div className="bg-white text-brand-blue w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <item.icon size={32} />
                </div>
                <h3 className="text-xl font-bold mb-2 text-brand-yellow">{item.title}</h3>
                <p className="text-blue-50">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">היעדים הכי חמים</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {DESTINATIONS.map((dest) => (
              <Link to="/destinations" key={dest.id} className="relative group overflow-hidden rounded-xl aspect-[3/4] shadow-md">
                <img src={dest.image} alt={dest.name} className="w-full h-full object-cover transition duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6">
                  <div>
                    <h3 className="text-white text-xl font-bold group-hover:text-brand-yellow transition">{dest.name}</h3>
                    <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">לחץ לפרטים</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gray-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4">
          <ContactForm />
        </div>
      </section>

    </div>
  );
};

export default Home;