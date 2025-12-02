import React from 'react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-black text-center mb-8 text-gray-800">מי אנחנו?</h1>
        
        <div className="prose prose-lg mx-auto text-gray-600">
          <p className="text-xl leading-relaxed mb-6">
            ברוכים הבאים ל-<strong className="text-brand-blue">עפים רחוק</strong>, הבית של המטיילים הישראלים בתאילנד.
            הקמנו את הסוכנות מתוך אהבה אמיתית לממלכת סיאם, אחרי שנים של מגורים וטיולים באזור.
          </p>
          
          <p className="mb-6">
            אנחנו לא מאמינים בחבילות "פס ייצור". אנחנו מאמינים שכל מטייל הוא עולם ומלואו. 
            הצוות שלנו מורכב מישראלים ומקומיים החיים בתאילנד, שמכירים את הפינות הנסתרות, המסעדות הכי טובות והחופים השקטים שרק המקומיים מכירים.
          </p>

          <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">הערכים שלנו</h3>
          <ul className="list-disc pr-6 space-y-2 mb-8 marker:text-brand-yellow">
            <li><strong>שקיפות מלאה:</strong> בלי עמלות נסתרות ובלי הפתעות.</li>
            <li><strong>זמינות 24/7:</strong> אנחנו כאן בשבילכם בוואטסאפ לכל שאלה, גם כשישראל ישנה.</li>
            <li><strong>מקצועיות:</strong> אנחנו מבקרים בכל המלונות שאנחנו ממליצים עליהם.</li>
            <li><strong>יחס אישי:</strong> תכנון הטיול נעשה בשיחה אישית, לא על ידי מחשב.</li>
          </ul>

          <div className="bg-brand-blue/5 p-8 rounded-xl border border-brand-blue mt-10 text-center">
            <h3 className="text-2xl font-bold text-brand-blue mb-4">רוצים להכיר אותנו יותר?</h3>
            <p className="mb-6">דברו איתנו, נשמח לעזור לכם להגשים חלום.</p>
            <Link to="/contact" className="bg-brand-blue text-white px-8 py-3 rounded-full font-bold hover:bg-sky-600 transition shadow-lg">
              יצירת קשר
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;