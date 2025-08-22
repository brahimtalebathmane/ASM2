import React, { useState } from 'react';
import { Search, Filter, MapPin, Users, ExternalLink } from 'lucide-react';

const StartupsSection = () => {
  const [selectedSector, setSelectedSector] = useState('Tous');
  const [searchTerm, setSearchTerm] = useState('');

  const sectors = ['Tous', 'FinTech', 'EdTech', 'HealthTech', 'AgriTech', 'E-commerce', 'SaaS'];

  const startups = [
    {
      id: 1,
      name: "MauriPay",
      sector: "FinTech",
      description: "Solution de paiement mobile révolutionnaire pour l'inclusion financière",
      founder: "Aminata Sow",
      employees: "12-15",
      location: "Nouakchott",
      website: "https://mauripay.mr",
      logo: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=200"
    },
    {
      id: 2,
      name: "EduMauri",
      sector: "EdTech",
      description: "Plateforme d'apprentissage en ligne adaptée au contexte mauritanien",
      founder: "Mohamed Lemine",
      employees: "8-10",
      location: "Nouakchott",
      website: "https://edumauri.mr",
      logo: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=200"
    },
    {
      id: 3,
      name: "HealthConnect",
      sector: "HealthTech",
      description: "Télémédecine et gestion numérique des dossiers médicaux",
      founder: "Dr. Fatima Mint",
      employees: "15-20",
      location: "Nouakchott",
      website: "https://healthconnect.mr",
      logo: "https://images.pexels.com/photos/3184317/pexels-photo-3184317.jpeg?auto=compress&cs=tinysrgb&w=200"
    },
    {
      id: 4,
      name: "AgriSmart",
      sector: "AgriTech",
      description: "Solutions IoT pour l'agriculture intelligente et durable",
      founder: "Ousmane Ba",
      employees: "10-12",
      location: "Rosso",
      website: "https://agrismart.mr",
      logo: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=200"
    },
    {
      id: 5,
      name: "MauriShop",
      sector: "E-commerce",
      description: "Marketplace locale connectant vendeurs et acheteurs mauritaniens",
      founder: "Aissata Diallo",
      employees: "20-25",
      location: "Nouakchott",
      website: "https://maurishop.mr",
      logo: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=200"
    },
    {
      id: 6,
      name: "DataFlow",
      sector: "SaaS",
      description: "Solutions de gestion d'entreprise adaptées aux PME mauritaniennes",
      founder: "Cheikh Abdallahi",
      employees: "6-8",
      location: "Nouakchott",
      website: "https://dataflow.mr",
      logo: "https://images.pexels.com/photos/3184317/pexels-photo-3184317.jpeg?auto=compress&cs=tinysrgb&w=200"
    }
  ];

  const filteredStartups = startups.filter(startup => {
    const matchesSector = selectedSector === 'Tous' || startup.sector === selectedSector;
    const matchesSearch = startup.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         startup.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSector && matchesSearch;
  });

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

        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-6 mb-12">
          {/* Search */}
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

          {/* Sector Filter */}
          <div className="flex items-center space-x-2">
            <Filter className="text-gray-400 w-5 h-5" />
            <select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              {sectors.map(sector => (
                <option key={sector} value={sector}>{sector}</option>
              ))}
            </select>
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
                    <span className="text-sm text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                      {startup.sector}
                    </span>
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
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Users className="w-4 h-4" />
                  <span>Fondateur: {startup.founder}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Users className="w-4 h-4" />
                  <span>Employés: {startup.employees}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{startup.location}</span>
                </div>
              </div>

              {/* CTA */}
              <button className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-3 rounded-lg font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 group-hover:shadow-lg">
                Voir le profil
              </button>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center bg-gradient-to-r from-blue-900 to-blue-800 rounded-3xl p-12 text-white">
          <h3 className="text-3xl font-bold mb-4">Votre startup n'est pas listée ?</h3>
          <p className="text-xl text-blue-200 mb-8">
            Rejoignez notre communauté d'entrepreneurs innovants
          </p>
          <button className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            Devenir Membre
          </button>
        </div>
      </div>
    </section>
  );
};

export default StartupsSection;