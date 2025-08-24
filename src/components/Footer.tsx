import React from 'react';
import { Rocket, Phone, Mail, MapPin, ArrowRight, Heart } from 'lucide-react';
import { useCMS } from './CMSProvider';

const Footer = () => {
  const { data, loading } = useCMS();

  if (loading) {
    return <div className="bg-gradient-to-br from-gray-900 via-blue-900 to-emerald-900 text-white py-16"></div>;
  }

  const siteConfig = data.siteConfig || {};

  const footerLinks = {
    'L\'Association': [
      { label: 'À propos', href: '#apropos' },
      { label: 'Notre équipe', href: '#equipe' },
      { label: 'Nos missions', href: '#missions' },
      { label: 'Statuts', href: '#statuts' }
    ],
    'Services': [
      { label: 'Adhésion', href: '#adhesion' },
      { label: 'Événements', href: '#evenements' },
      { label: 'Ressources', href: '#ressources' },
      { label: 'Mentoring', href: '#mentoring' }
    ],
    'Écosystème': [
      { label: 'Startups membres', href: '#startups' },
      { label: 'Partenaires', href: '#partenaires' },
      { label: 'Investisseurs', href: '#investisseurs' },
      { label: 'Incubateurs', href: '#incubateurs' }
    ],
    'Support': [
      { label: 'Contact', href: '#contact' },
      { label: 'FAQ', href: '#faq' },
      { label: 'Documentation', href: '#docs' },
      { label: 'Support technique', href: '#support' }
    ]
  };

  const socialLinks = [
    { name: 'LinkedIn', url: '#' },
    { name: 'Twitter', url: '#' },
    { name: 'Facebook', url: '#' },
    { name: 'Instagram', url: '#' },
    { name: 'YouTube', url: '#' }
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-blue-900 to-emerald-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Rocket className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">{siteConfig.abbreviation || "MSA"}</h3>
                <p className="text-blue-200 text-sm">Association Mauritanienne</p>
              </div>
            </div>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              {siteConfig.description || "L'Association Mauritanienne des Startups œuvre pour développer un écosystème entrepreneurial dynamique et favoriser l'innovation technologique en Mauritanie."}
            </p>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-emerald-400" />
                <span className="text-gray-300">{siteConfig.phone || "+222 44 09 26 55"}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-emerald-400" />
                <span className="text-gray-300">{siteConfig.email || "depanapp222@gmail.com"}</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-emerald-400" />
                <span className="text-gray-300">{siteConfig.address || "Nouakchott, Mauritanie"}</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-emerald-500 transition-all duration-300 transform hover:scale-110"
                >
                  <span className="text-sm font-semibold">{social.name[0]}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {Object.entries(footerLinks).map(([category, links]) => (
                <div key={category}>
                  <h4 className="text-lg font-bold text-emerald-400 mb-4">{category}</h4>
                  <ul className="space-y-3">
                    {links.map((link, index) => (
                      <li key={index}>
                        <a
                          href={link.href}
                          className="text-gray-300 hover:text-emerald-400 transition-colors duration-300 flex items-center group"
                        >
                          <span>{link.label}</span>
                          <ArrowRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-white/10 pt-12 mt-12">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="text-center lg:text-left mb-6 lg:mb-0">
              <h4 className="text-2xl font-bold text-emerald-400 mb-2">Restez connecté</h4>
              <p className="text-gray-300">
                Recevez les dernières actualités de l'écosystème startup mauritanien
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto lg:min-w-96">
              <input
                type="email"
                placeholder="Votre adresse email"
                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent backdrop-blur-sm"
              />
              <button className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-2">
                <span>S'abonner</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <span className="text-gray-400">© 2025 Association Mauritanienne des Startups.</span>
              <span className="text-gray-400">Tous droits réservés.</span>
            </div>
            
            <div className="flex items-center space-x-6">
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors text-sm">
                Mentions légales
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors text-sm">
                Politique de confidentialité
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors text-sm">
                CGU
              </a>
            </div>
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-gray-500 text-sm flex items-center justify-center">
              Fait avec <Heart className="w-4 h-4 text-red-500 mx-1" /> pour l'écosystème startup mauritanien
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;