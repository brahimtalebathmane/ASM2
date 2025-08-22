import React from 'react';
import { Handshake, Building, Award, Users } from 'lucide-react';

const PartnersSection = () => {
  const partners = [
    {
      id: 1,
      name: "Banque Atlantique",
      logo: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=200",
      category: "Financier",
      description: "Partenaire financier principal pour le financement des startups"
    },
    {
      id: 2,
      name: "Université de Nouakchott",
      logo: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=200",
      category: "Académique",
      description: "Collaboration pour la recherche et l'innovation"
    },
    {
      id: 3,
      name: "Ministère de l'Économie Numérique",
      logo: "https://images.pexels.com/photos/3184317/pexels-photo-3184317.jpeg?auto=compress&cs=tinysrgb&w=200",
      category: "Institutionnel",
      description: "Soutien institutionnel et réglementaire"
    },
    {
      id: 4,
      name: "TechHub Incubator",
      logo: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=200",
      category: "Incubateur",
      description: "Incubation et accompagnement des startups"
    },
    {
      id: 5,
      name: "Orange Mauritanie",
      logo: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=200",
      category: "Télécoms",
      description: "Partenaire technologique et innovation"
    },
    {
      id: 6,
      name: "Mauritel",
      logo: "https://images.pexels.com/photos/3184317/pexels-photo-3184317.jpeg?auto=compress&cs=tinysrgb&w=200",
      category: "Télécoms",
      description: "Solutions de connectivité et infrastructure"
    }
  ];

  const partnershipBenefits = [
    {
      icon: <Handshake className="w-8 h-8" />,
      title: "Collaboration stratégique",
      description: "Développez des synergies durables avec l'écosystème startup mauritanien"
    },
    {
      icon: <Building className="w-8 h-8" />,
      title: "Visibilité accrue",
      description: "Augmentez votre visibilité auprès de la communauté entrepreneuriale"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Innovation ouverte",
      description: "Accédez aux innovations et solutions développées par nos startups"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Réseau étendu",
      description: "Élargissez votre réseau professionnel et créez de nouvelles opportunités"
    }
  ];

  return (
    <section id="partenaires" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Nos <span className="text-emerald-500">Partenaires</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez les organisations qui nous accompagnent dans notre mission de développement de l'écosystème startup mauritanien
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-16">
          {partners.map((partner) => (
            <div key={partner.id} className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 text-center">
              <img
                src={partner.logo}
                alt={partner.name}
                className="w-16 h-16 mx-auto mb-4 rounded-lg object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <h3 className="font-bold text-gray-900 mb-2 text-sm group-hover:text-emerald-600 transition-colors">
                {partner.name}
              </h3>
              <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                {partner.category}
              </span>
            </div>
          ))}
        </div>

        {/* Partnership Benefits */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Pourquoi devenir <span className="text-emerald-500">partenaire</span> ?
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {partnershipBenefits.map((benefit, index) => (
              <div key={index} className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center text-white mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  {benefit.icon}
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors">
                  {benefit.title}
                </h4>
                <p className="text-gray-600">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-3xl p-12 text-white text-center">
          <h3 className="text-3xl font-bold mb-4">Rejoignez notre écosystème</h3>
          <p className="text-xl text-blue-200 mb-8 max-w-2xl mx-auto">
            Devenez partenaire de l'Association Mauritanienne des Startups et contribuez au développement de l'innovation en Mauritanie
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Devenir Partenaire
            </button>
            <button className="border-2 border-white/30 text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
              En savoir plus
            </button>
          </div>
        </div>

        {/* Partner Testimonials */}
        <div className="mt-16">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Témoignages de nos <span className="text-emerald-500">partenaires</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-center mb-4">
                <img
                  src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=100"
                  alt="Directeur Banque Atlantique"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-bold text-gray-900">Ahmed Ould Mohamed</h4>
                  <p className="text-sm text-gray-600">Directeur, Banque Atlantique</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "Notre partenariat avec l'AMS nous permet d'identifier et de soutenir les startups les plus prometteuses. C'est un investissement dans l'avenir économique de la Mauritanie."
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-center mb-4">
                <img
                  src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=100"
                  alt="Recteur Université"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-bold text-gray-900">Dr. Fatima Mint Salem</h4>
                  <p className="text-sm text-gray-600">Recteur, Université de Nouakchott</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "La collaboration avec l'AMS enrichit notre mission éducative en connectant nos étudiants avec l'écosystème entrepreneurial réel."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;