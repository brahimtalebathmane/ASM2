import React from 'react';
import { Target, Users, Lightbulb, Award, CheckCircle, Building } from 'lucide-react';
import { useDynamicContent } from '../hooks/useDynamicContent';

const AboutSection = () => {
  const { data: aboutData, loading } = useDynamicContent('about');

  if (loading) {
    return (
      <section id="apropos" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Chargement des informations...</p>
          </div>
        </div>
      </section>
    );
  }

  // Use first item from array or fallback data
  const about = Array.isArray(aboutData) && aboutData.length > 0 ? aboutData[0] : {
    title: "À propos de l'Association Mauritanienne des Startups",
    description: "L'Association Mauritanienne des Startups (MSA) est une organisation à but non lucratif dédiée au développement de l'écosystème entrepreneurial en Mauritanie.",
    mission: "Notre mission est de fédérer, promouvoir et défendre les intérêts des startups mauritaniennes tout en favorisant l'innovation technologique et l'entrepreneuriat dans le pays.",
    values: [
      "Innovation et créativité technologique",
      "Collaboration et esprit d'équipe",
      "Excellence et qualité dans nos services",
      "Transparence et intégrité"
    ],
    image: "/images/uploads/présentation-entreprise-bleu-moderne-simple.jpg"
  };

  const valueIcons = [
    <Lightbulb className="w-6 h-6" />,
    <Users className="w-6 h-6" />,
    <Award className="w-6 h-6" />,
    <Target className="w-6 h-6" />,
    <Building className="w-6 h-6" />,
    <CheckCircle className="w-6 h-6" />
  ];

  return (
    <section id="apropos" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {about.title || "À propos de nous"}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-blue-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            {about.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="order-2 lg:order-1">
            {/* Mission */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-lg flex items-center justify-center text-white mr-4">
                  <Target className="w-5 h-5" />
                </div>
                Notre Mission
              </h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                {about.mission}
              </p>
            </div>

            {/* Values */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-emerald-600 rounded-lg flex items-center justify-center text-white mr-4">
                  <Award className="w-5 h-5" />
                </div>
                Nos Valeurs
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(about.values || []).map((value, index) => (
                  <div key={index} className="group flex items-center space-x-3 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-lg flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                      {valueIcons[index % valueIcons.length]}
                    </div>
                    <span className="text-gray-800 font-medium group-hover:text-emerald-600 transition-colors">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2">
            <div className="relative">
              <div className="relative overflow-hidden rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-700">
                <img
                  src={about.image || "/images/uploads/présentation-entreprise-bleu-moderne-simple.jpg"}
                  alt="À propos de l'Association Mauritanienne des Startups"
                  className="w-full h-96 lg:h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent"></div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-6 -right-6 w-20 h-20 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl opacity-90 animate-float shadow-xl transform rotate-12"></div>
              <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl opacity-90 animate-float-delayed shadow-xl transform -rotate-12"></div>
              
              {/* Stats Overlay */}
              <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-xl px-6 py-4 shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                  <div>
                    <p className="text-sm font-bold text-gray-800">Association Active</p>
                    <p className="text-xs text-gray-600">Depuis 2024</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 bg-gradient-to-r from-blue-900 to-emerald-900 rounded-3xl p-12 text-white text-center">
          <h3 className="text-3xl font-bold mb-4">Rejoignez notre mission</h3>
          <p className="text-xl text-blue-200 mb-8 max-w-2xl mx-auto">
            Ensemble, construisons l'avenir de l'entrepreneuriat en Mauritanie
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#adhesion"
              className="inline-block bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Devenir Membre
            </a>
            <a
              href="mailto:mauristartups@gmail.com?subject=Demande d'information sur l'association"
              className="inline-block border-2 border-white/30 text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
            >
              Nous Contacter
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;