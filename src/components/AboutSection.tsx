import React from 'react';
import { useDynamicContent } from '../hooks/useDynamicContent';

const AboutSection: React.FC = () => {
  const { data, loading } = useDynamicContent('about'); // "about.json" في مجلد /data/

  if (loading) {
    return (
      <section id="apropos" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement du contenu...</p>
        </div>
      </section>
    );
  }

  // استخدام أول عنصر فقط من البيانات (يمكنك إضافة أكثر من عنصر في المستقبل)
  const content = data[0] || {
    title: 'À propos',
    description: 'Description par défaut...',
    mission: 'Mission par défaut...',
    values: ['Valeur 1', 'Valeur 2', 'Valeur 3'],
    image: 'https://i.postimg.cc/GppXFY5g/18.png'
  };

  return (
    <section id="apropos" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{content.title}</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{content.description}</p>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center">
            <img
              src={content.image}
              alt={content.title}
              className="rounded-xl shadow-lg w-full max-w-md object-contain"
            />
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900">Notre mission</h3>
            <p className="text-gray-600">{content.mission}</p>

            <h3 className="text-2xl font-bold text-gray-900">Nos valeurs</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              {content.values.map((valeur: string, index: number) => (
                <li key={index}>{valeur}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
