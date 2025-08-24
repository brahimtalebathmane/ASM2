import React from 'react';
import { Target, Users, Lightbulb, Award } from 'lucide-react';
import AnimatedCounter from './AnimatedCounter';
import { useCMS } from './CMSProvider';

const AboutSection = () => {
  const { data, loading } = useCMS();

  if (loading) {
    return <div className="py-20 bg-gray-50"></div>;
  }

  const aboutContent = data.aboutContent || {};
  const missions = aboutContent.missions || [];

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'Target': return <Target className="w-8 h-8" />;
      case 'Users': return <Users className="w-8 h-8" />;
      case 'Lightbulb': return <Lightbulb className="w-8 h-8" />;
      case 'Award': return <Award className="w-8 h-8" />;
      default: return <Target className="w-8 h-8" />;
    }
  };

  return (
    <section id="apropos" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* About Us */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="order-2 lg:order-1">
            <div className="relative">
              <img
                src={aboutContent.image || "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800"}
                alt="Équipe entrepreneurs mauritaniens"
                className="rounded-2xl shadow-xl transform hover:scale-105 transition-transform duration-500"
              />
              
              {/* Enhanced 3D Floating Elements */}
              <div className="absolute -top-4 -left-4 w-20 h-20 bg-green-400 rounded-full opacity-20 animate-float-3d"></div>
              <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-yellow-400 rounded-full opacity-30 animate-bounce-3d"></div>
              <div className="absolute top-1/2 -right-6 w-12 h-12 bg-blue-500 rounded-lg opacity-25 animate-float-3d-delayed transform rotate-45"></div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              {aboutContent.title || "Qui sommes-nous"}<span className="text-green-500">?</span>
            </h2>
            
            <div className="w-20 h-1 bg-gradient-to-r from-green-500 to-blue-500 mb-6"></div>
            
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              {aboutContent.description || "L'Association Mauritanienne des Startups est née de l'idée de réunir sous une même bannière les entreprises technologiques innovantes de Mauritanie."}
            </p>
            
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              {aboutContent.extendedDescription || "Nous œuvrons pour développer un écosystème entrepreneurial dynamique, favoriser l'innovation et accompagner les jeunes entrepreneurs dans leur parcours vers la réussite."}
            </p>
            
            <button className="group bg-gradient-to-r from-blue-900 to-blue-800 text-white px-8 py-4 rounded-lg font-semibold hover:from-blue-800 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center space-x-2">
              <span>Lire Plus</span>
              <Target className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            </button>
          </div>
        </div>

        {/* Missions */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Nos missions
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-green-500 to-blue-500 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {missions.map((mission, index) => (
            <div key={index} className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 hover:border-green-200">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                  {getIconComponent(mission.icon)}
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-green-600 transition-colors">
                  {mission.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {mission.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Stats Section with Animated Counters */}
        <div className="mt-20 bg-gradient-to-r from-blue-900 to-green-800 rounded-3xl p-12 text-white relative overflow-hidden">
          {/* Background 3D Elements */}
          <div className="absolute top-4 right-4 w-32 h-32 bg-white/5 rounded-full animate-pulse"></div>
          <div className="absolute bottom-4 left-4 w-24 h-24 bg-green-400/10 rounded-lg transform rotate-45 animate-float-3d"></div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
            <div className="text-center group hover:scale-110 transition-transform duration-300">
              <AnimatedCounter 
                end={50} 
                suffix="+" 
                className="text-4xl font-bold text-green-400 mb-2"
              />
              <div className="text-blue-200">Startups</div>
            </div>
            <div className="text-center group hover:scale-110 transition-transform duration-300">
              <AnimatedCounter 
                end={100} 
                suffix="+" 
                className="text-4xl font-bold text-green-400 mb-2"
              />
              <div className="text-blue-200">Emplois directs</div>
            </div>
            <div className="text-center group hover:scale-110 transition-transform duration-300">
              <AnimatedCounter 
                end={5} 
                suffix="M+" 
                className="text-4xl font-bold text-green-400 mb-2"
              />
              <div className="text-blue-200">Chiffre d'affaires</div>
            </div>
            <div className="text-center group hover:scale-110 transition-transform duration-300">
              <AnimatedCounter 
                end={20} 
                suffix="+" 
                className="text-4xl font-bold text-green-400 mb-2"
              />
              <div className="text-blue-200">Prix & distinctions</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;