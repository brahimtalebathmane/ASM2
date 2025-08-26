import React from 'react';
import { Handshake, Building, Award, Users } from 'lucide-react';
import { useDynamicContent } from '../hooks/useDynamicContent';
import { useCMS } from './CMSProvider';

const PartnersSection = () => {
  const { data: partners, loading } = useDynamicContent('partners');
  const { data: cmsData } = useCMS();
  
  const testimonials = cmsData?.siteConfig?.testimonials || [];

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

  if (loading) {
    return (
      <section id="partenaires" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Chargement des partenaires...</p>
          </div>
        </div>
      </section>
    );
  }

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
        {partners.length === 0 ? (
          <div className="text-center py-16 mb-16">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Handshake className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Aucun partenaire pour le moment</h3>
              <p className="text-gray-600">
                Les partenaires apparaîtront ici une fois ajoutés via le CMS.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-16">
            {partners.map((partner) => (
              <a
                key={partner.id}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 text-center block"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="w-16 h-16 mx-auto mb-4 rounded-lg object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <h3 className="font-bold text-gray-900 mb-2 text-sm group-hover:text-emerald-600 transition-colors">
                  {partner.name}
                </h3>
              </a>
            ))}
          </div>
        )}

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
            <a
              href="mailto:mauristartups@gmail.com"
              className="inline-block bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-center"
            >
              Devenir Partenaire
            </a>
            <a
              href="mailto:mauristartups@gmail.com"
              className="inline-block border-2 border-white/30 text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-all duration-300 backdrop-blur-sm text-center"
            >
              En savoir plus
            </a>
          </div>
        </div>

        {/* Partner Testimonials */}
        <div className="mt-16">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Témoignages de nos <span className="text-emerald-500">partenaires</span>
          </h3>

          {testimonials.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600">Aucun témoignage pour le moment. Ajoutez-en via le CMS.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((testimonial: any, index: number) => (
                <div key={index} className="bg-white p-8 rounded-2xl shadow-lg">
                  <div className="flex items-center mb-4">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4 object-cover"
                    />
                    <div>
                      <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.position}, {testimonial.company}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 italic">
                    "{testimonial.testimonial}"
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;