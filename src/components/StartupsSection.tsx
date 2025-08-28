import React, { useState } from 'react';
import { Search, Users, ExternalLink } from 'lucide-react';
import { useDynamicContent } from '../hooks/useDynamicContent';

const StartupsSection = () => {
  const { data: startups, loading } = useDynamicContent('startups');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStartups = startups.filter(startup =>
    startup.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (startup.description || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <section id="startups" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Chargement des startups...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="startups" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Startups <span className="text-emerald-500">Membres</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez les startups innovantes qui façonnent l'avenir numérique de la Mauritanie
          </p>
        </div>

        {/* Search */}
        <div className="flex mb-12">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Rechercher une startup..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Startups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStartups.map((startup) => (
            <div key={startup.id} className="group bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <img
                    src={startup.logo}
                    alt={startup.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
                      {startup.name}
                    </h3>
                  </div>
                </div>
                <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-emerald-600 transition-colors" />
              </div>

              {/* Description */}
              <p className="text-gray-600 mb-6 line-clamp-3">
                {startup.description}
              </p>

              {/* Info */}
              <div className="space-y-3 mb-6">
                {startup.founder && (
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>Fondateur: {startup.founder}</span>
                  </div>
                )}
                {startup.employees && (
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>Employés: {startup.employees}</span>
                  </div>
                )}
              </div>

              {/* URL */}
              {startup.url ? (
                <a
                  href={startup.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-3 rounded-lg font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 group-hover:shadow-lg text-center"
                >
                  Visiter le site
                </a>
              ) : (
                <a
                  href="mailto:mauristartups@gmail.com"
                  className="block w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-3 rounded-lg font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 group-hover:shadow-lg text-center"
                >
                  En savoir plus
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StartupsSection;
