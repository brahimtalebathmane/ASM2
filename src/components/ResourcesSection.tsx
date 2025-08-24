import React, { useState } from 'react';
import { Download, FileText, Video, BookOpen, ExternalLink } from 'lucide-react';
import { useDynamicContent } from '../hooks/useDynamicContent';

const ResourcesSection = () => {
  const { data: resources, loading } = useDynamicContent('resources');
  const [activeCategory, setActiveCategory] = useState('Tous');

  const categories = ['Tous', 'Guides', 'Financements', 'Juridique', 'Marketing', 'Technique'];

  const filteredResources = resources.filter(resource => 
    activeCategory === 'Tous' || resource.category === activeCategory
  );

  const webinars = [
    {
      id: 1,
      title: "Lever des fonds en Mauritanie",
      date: "20 Janvier 2025",
      duration: "45 min",
      speaker: "Aminata Sow, Investisseur",
      views: 850
    },
    {
      id: 2,
      title: "Marketing digital pour startups",
      date: "15 Janvier 2025",
      duration: "1h 20min",
      speaker: "Mohamed Lemine, Expert Digital",
      views: 1200
    },
    {
      id: 3,
      title: "Construire une équipe performante",
      date: "10 Janvier 2025",
      duration: "55 min",
      speaker: "Fatima Mint, CEO HealthConnect",
      views: 670
    }
  ];

  if (loading) {
    return (
      <section id="ressources" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Chargement des ressources...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="ressources" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Espace <span className="text-emerald-500">Ressources</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Guides pratiques, opportunités de financement et outils pour accompagner votre parcours entrepreneurial
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Resources */}
          <div className="lg:col-span-2">
            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-8">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                    activeCategory === category
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Resources Grid */}
            {filteredResources.length === 0 ? (
              <div className="text-center py-16">
                <div className="max-w-md mx-auto">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <BookOpen className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Aucune ressource pour le moment</h3>
                  <p className="text-gray-600">
                    Les ressources et guides apparaîtront ici une fois ajoutés via le CMS.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredResources.map((resource) => (
                  <div key={resource.id} className="group bg-gray-50 hover:bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-start space-x-4">
                      {/* Icon */}
                      <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                        <FileText className="w-6 h-6" />
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                          {resource.title}
                        </h3>
                        
                        <p className="text-gray-600 mb-4">
                          {resource.description}
                        </p>

                        {/* Meta */}
                        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                          <span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full">
                            {resource.category}
                          </span>
                          <span>{resource.type}</span>
                          <span>{resource.size}</span>
                          <span>{resource.downloads} téléchargements</span>
                        </div>

                        {/* Download Button */}
                        <button className="group/btn flex items-center space-x-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl">
                          <Download className="w-4 h-4 group-hover/btn:translate-y-0.5 transition-transform" />
                          <span>Télécharger</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column - Webinars */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Webinaires <span className="text-emerald-500">Récents</span>
            </h3>

            <div className="space-y-4">
              {webinars.map((webinar) => (
                <div key={webinar.id} className="group bg-gray-50 hover:bg-white border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                      <Video className="w-5 h-5" />
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors">
                        {webinar.title}
                      </h4>
                      
                      <p className="text-sm text-gray-600 mb-2">
                        {webinar.speaker}
                      </p>
                      
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span>{webinar.date}</span>
                        <span>{webinar.duration}</span>
                        <span>{webinar.views} vues</span>
                      </div>
                    </div>
                    
                    <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-emerald-600 transition-colors" />
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-8 bg-gradient-to-r from-blue-900 to-blue-800 rounded-2xl p-6 text-white text-center">
              <BookOpen className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
              <h4 className="text-xl font-bold mb-2">Besoin d'aide ?</h4>
              <p className="text-blue-200 mb-4 text-sm">
                Consultez notre FAQ ou contactez notre équipe
              </p>
              <button className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl">
                Obtenir de l'aide
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResourcesSection;