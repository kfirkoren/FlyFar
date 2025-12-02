import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Plane } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'דף הבית', path: '/' },
    { name: 'יעדים', path: '/destinations' },
    { name: 'חבילות וחופשות', path: '/packages' },
    { name: 'מלונות', path: '/hotels' },
    { name: 'אודות', path: '/about' },
    { name: 'צור קשר', path: '/contact' },
    { name: 'ממשק מנהל', path: '/admin' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-40 border-b-4 border-brand-yellow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          
          {/* Right Side: Logo & Navigation */}
          <div className="flex items-center gap-10">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-brand-yellow rounded-full flex items-center justify-center border-2 border-brand-blue group-hover:rotate-12 transition-transform">
                <Plane className="h-6 w-6 text-white transform -rotate-12" fill="currentColor" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black text-brand-blue leading-none">עפים</span>
                <span className="text-xl font-black text-brand-blue leading-none">רחוק</span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-reverse space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-lg font-medium transition-colors duration-200 ${
                    isActive(link.path) ? 'text-brand-blue font-bold' : 'text-gray-600 hover:text-brand-blue'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          
          {/* Left Side: CTA & Mobile Menu */}
          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <Link to="/contact" className="bg-brand-blue text-white px-5 py-2 rounded-full hover:bg-sky-600 transition shadow-md font-bold">
                חייגו אלינו
              </Link>
            </div>

            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-600 hover:text-brand-blue focus:outline-none"
              >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(link.path) 
                    ? 'bg-sky-50 text-brand-blue' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
