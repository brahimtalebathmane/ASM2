import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useCMS } from './CMSProvider';

const Header = () => {
  const { data, loading } = useCMS();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (loading) {
    return <div className="h-20 bg-white"></div>;
  }

  const siteConfig = data.siteConfig || {};

  const menuItems = [
    { label: 'Accueil', href: '#accueil' },
    { label: 'Startups Membres', href: '#startups' },
    { label: 'Événements', href: '#evenements' },
    { label: 'Actualités', href: '#actualites' },
    { label: 'Ressources', href: '#ressources' },
    { label: 'Partenaires', href: '#partenaires' },
    { label: 'Adhésion', href: '#adhesion' },
    { label: 'Contact', href: '#contact' }
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img
                src="https://i.postimg.cc/GppXFY5g/18.png"
                alt={siteConfig.title || "Association Mauritanienne des Startups"}
                className="h-14 w-auto object-contain"
              />
              <div className="absolute -inset-1 bg-gradient-to-br from-green-500/20 to-blue-600/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div>
              <h1 className={`text-xl font-bold transition-colors ${
                isScrolled ? 'text-gray-900' : 'text-white'
              }`}>{siteConfig.abbreviation || "MSA"}</h1>
              <p className={`text-xs transition-colors ${
                isScrolled ? 'text-gray-600' : 'text-blue-100'
              }`}>Association Mauritanienne</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item) => (
              <div key={item.label} className="relative">
                {item.dropdown ? (
                  <div
                    className={`flex items-center space-x-1 cursor-pointer transition-colors ${
                      isScrolled 
                        ? 'text-gray-700 hover:text-green-600' 
                        : 'text-white hover:text-green-300'
                    }`}
                    onMouseEnter={() => setActiveDropdown(item.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <span className="font-medium">{item.label}</span>
                    <ChevronDown className="w-4 h-4" />
                    
                    {activeDropdown === item.label && (
                      <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 py-2 animate-in fade-in duration-200">
                        {item.dropdown.map((subItem) => (
                          <a
                            key={subItem.label}
                            href={subItem.href}
                            className="block px-4 py-3 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors"
                          >
                            {subItem.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <a
                    href={item.href}
                    className={`font-medium transition-colors ${
                      isScrolled 
                        ? 'text-gray-700 hover:text-green-600' 
                        : 'text-white hover:text-green-300'
                    }`}
                  >
                    {item.label}
                  </a>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex">
            <a
              href="mailto:mauristartups@gmail.com"
              className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Devenir Membre
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              isScrolled 
                ? 'hover:bg-gray-100 text-gray-700' 
                : 'hover:bg-white/10 text-white'
            }`}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-100 bg-white rounded-b-lg shadow-lg">
            <nav className="space-y-4">
              {menuItems.map((item) => {
                const isEmailCTA = item.label === 'Contact' || item.label === 'Devenir Membre';
                return (
                  <a
                    key={item.label}
                    href={isEmailCTA ? 'mailto:mauristartups@gmail.com' : item.href}
                    className="block text-gray-700 hover:text-green-600 transition-colors font-medium px-4 py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                );
              })}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;