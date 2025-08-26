import React from 'react';
import { ArrowRight, Users, Calendar, Trophy, Globe, Rocket } from 'lucide-react';
import AnimatedCounter from './AnimatedCounter';
import { useCMS } from './CMSProvider';

const HeroSection = () => {
  const { data, loading } = useCMS();

  if (loading) {
    return <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-green-900"></div>;
  }

  const heroContent = data.heroContent || {};
  const stats = heroContent.stats || [];

  return (
    <section id="accueil" className="relative min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-green-900 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-10 w-24 h-24 bg-green-400/20 rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-yellow-400/30 rounded-full animate-float-delayed"></div>
        <div className="absolute bottom-20 left-20 w-20 h-20 bg-blue-400/25 rounded-full animate-bounce"></div>
        <div className="absolute top-1/2 right-10 w-32 h-32 bg-green-500/20 rounded-full animate-pulse"></div>
        
        {/* 3D Floating Elements */}
        <div className="absolute top-32 left-1/3 w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-lg opacity-80 animate-float-3d transform rotate-45"></div>
        <div className="absolute bottom-40 right-1/4 w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl opacity-70 animate-float-3d-delayed transform -rotate-12"></div>
        <div className="absolute top-1/3 left-1/4 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-90 animate-bounce-3d"></div>

        {/* Circuit pattern background */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="circuit" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M0,10 L10,10 L10,0 M10,10 L20,10 M10,20 L10,10" stroke="currentColor" strokeWidth="0.5" fill="none"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#circuit)"/>
          </svg>
        </div>

        {/* Gradient orbs */}
        <div className="absolute top-32 left-1/4 w-64 h-64 bg-gradient-to-r from-green-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-32 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-400/10 to-green-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32">
        <div className="flex flex-col lg:flex-row items-center min-h-screen">
          {/* Content */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <div className="mb-8">
              <span className="inline-flex items-center px-4 py-2 bg-green-500/20 text-green-300 rounded-full text-sm font-semibold mb-6 animate-bounce">
                <Globe className="w-4 h-4 mr-2" />
                Innovation • Entrepreneuriat • Excellence
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
              {heroContent.mainTitle || "Synergie Des"}
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-green-300 to-blue-300 animate-gradient">
                {heroContent.highlightedWord || "Startups"}
              </span>
              <br />
              <span className="text-green-400 text-4xl md:text-5xl">{heroContent.subtitle || "Mauritaniennes"}</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-100 mb-10 max-w-2xl leading-relaxed">
              {heroContent.description || "Unies pour innover davantage ! Rejoignez l'écosystème startup le plus dynamique de Mauritanie et participez à la transformation numérique du pays."}
            </p>

            <div className="flex flex-col sm:flex-row gap-6 mb-16">
              <a
                href="#adhesion"
                className="group bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-2xl hover:shadow-green-500/25 transform hover:-translate-y-2 flex items-center justify-center space-x-3"
              >
                <span>{heroContent.primaryButtonText || "Devenir Membre"}</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </a>
              
              <a
                href="#startups"
                className="border-2 border-white/30 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/10 transition-all duration-300 backdrop-blur-sm hover:border-green-400 text-center"
              >
                {heroContent.secondaryButtonText || "Découvrir l'Écosystème"}
              </a>
            </div>

            {/* Enhanced Animated Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center lg:text-left">

              {stats.map((stat: any, index: number) => {
                const IconComponent = stat.icon === 'Users' ? Users : 
                                   stat.icon === 'Calendar' ? Calendar :
                                   stat.icon === 'Trophy' ? Trophy : Rocket;
                const colorClass = index === 0 ? 'from-green-400 to-green-600' :
                                 index === 1 ? 'from-blue-400 to-blue-600' :
                                 index === 2 ? 'from-yellow-400 to-orange-500' : 'from-purple-400 to-purple-600';
                
                return (
                  <div key={index} className="group hover:scale-110 transition-transform duration-300">
                    <div className="flex items-center justify-center lg:justify-start mb-3">
                      <div className={`w-12 h-12 bg-gradient-to-br ${colorClass} rounded-lg flex items-center justify-center mr-3 group-hover:rotate-12 transition-transform duration-300`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <AnimatedCounter 
                        end={stat.number} 
                        suffix={stat.suffix} 
                        className="text-4xl font-bold text-white"
                      />
                    </div>
                    <p className="text-blue-200 font-medium">{stat.label}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Hero Image with 3D Effects */}
          <div className="lg:w-1/2 mt-16 lg:mt-0 relative">
            <div className="relative">
              <div className="relative overflow-hidden rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-700 hover:rotate-1">
                <img
                  src={heroContent.heroImage || "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800"}
                  alt="Entrepreneurs mauritaniens innovants"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent"></div>
              </div>
              
              {/* Enhanced 3D Floating Elements */}
              <div className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl opacity-90 animate-float-3d shadow-xl transform rotate-12 hover:rotate-45 transition-transform duration-500"></div>
              <div className="absolute -bottom-8 -left-8 w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl opacity-90 animate-float-3d-delayed shadow-xl transform -rotate-12 hover:-rotate-45 transition-transform duration-500"></div>
              
              {/* Success indicators with 3D effects */}
              <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm rounded-lg px-4 py-3 shadow-lg animate-bounce transform hover:scale-110 transition-transform duration-300">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-bold text-gray-800">Croissance +200%</span>
                </div>
              </div>

              <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-sm rounded-lg px-4 py-3 shadow-lg transform hover:scale-110 transition-transform duration-300">
                <div className="flex items-center space-x-2">
                  <Trophy className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm font-bold text-gray-800">Association Mauritanienne</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;