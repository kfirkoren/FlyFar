import React, { useState } from 'react';

interface ContactFormProps {
  title?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ title = "בואו נתכנן את הטיול שלכם" }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    type: 'זוגות / ירח דבש',
    dates: '',
    budget: '',
    notes: ''
  });

  const webhookUrl = import.meta.env.VITE_CONTACT_WEBHOOK_URL;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!webhookUrl) {
      alert("שגיאה: חסרה כתובת וובהוק (VITE_CONTACT_WEBHOOK_URL)");
      return;
    }

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Webhook request failed");
      }

      alert("תודה! פנייתך התקבלה, נחזור אליך בהקדם.");
      setFormData({
        name: '', phone: '', email: '', type: 'זוגות / ירח דבש', dates: '', budget: '', notes: ''
      });
    } catch (error) {
      console.error("Failed to submit contact form", error);
      alert("מצטערים, לא הצלחנו לשלוח את הטופס. נסה שוב בעוד רגע.");
    }
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border-t-8 border-brand-blue relative overflow-hidden">
      <div className="absolute top-0 right-0 w-20 h-20 bg-brand-yellow/20 rounded-bl-full -mr-4 -mt-4"></div>
      <h3 className="text-2xl font-bold mb-6 text-gray-800 text-center relative z-10">{title}</h3>
      <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">שם מלא</label>
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            required 
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none bg-gray-50 focus:bg-white transition" 
            placeholder="ישראל ישראלי" 
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">טלפון</label>
            <input 
              type="tel" 
              name="phone" 
              value={formData.phone} 
              onChange={handleChange} 
              required 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none bg-gray-50 focus:bg-white transition" 
              placeholder="050-0000000" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">אימייל</label>
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none bg-gray-50 focus:bg-white transition" 
              placeholder="example@mail.com" 
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">סוג טיול</label>
            <select 
              name="type" 
              value={formData.type} 
              onChange={handleChange} 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none bg-gray-50 focus:bg-white transition"
            >
              <option>זוגות / ירח דבש</option>
              <option>משפחות</option>
              <option>צעירים / מסיבות</option>
              <option>קבוצות</option>
              <option>גיל הזהב</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">תאריך משוער</label>
            <input 
              type="text" 
              name="dates" 
              value={formData.dates} 
              onChange={handleChange} 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none bg-gray-50 focus:bg-white transition" 
              placeholder="לדוגמה: ינואר 2025" 
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">הערות / בקשות מיוחדות</label>
          <textarea 
            name="notes" 
            value={formData.notes} 
            onChange={handleChange} 
            rows={3} 
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none bg-gray-50 focus:bg-white transition" 
            placeholder="לדוגמה: מעדיפים מלונות 5 כוכבים בפוקט..." 
          />
        </div>

        <button 
          type="submit" 
          className="w-full bg-brand-blue hover:bg-sky-600 text-white font-bold py-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1"
        >
          שלח פרטים לקבלת הצעה
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
