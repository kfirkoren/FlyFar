import React from 'react';
import { MessageCircle } from 'lucide-react';
import { CONTACT_WHATSAPP } from '../constants';

const WhatsAppButton: React.FC = () => {
  return (
    <a
      href={`https://wa.me/${CONTACT_WHATSAPP}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-transform hover:scale-110 flex items-center justify-center animate-bounce"
      aria-label="צרו קשר בוואטסאפ"
    >
      <MessageCircle size={32} />
    </a>
  );
};

export default WhatsAppButton;
