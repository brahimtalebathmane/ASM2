import React, { useState } from 'react';
import { Calendar, User, ArrowRight, TrendingUp, Star } from 'lucide-react';
import { useDynamicContent } from '../hooks/useDynamicContent';

const NewsSection = () => {
  const { data: news, loading } = useDynamicContent('news');
  const [selectedCategory, setSelectedCategory] = useState('Tous');

  const categories = ['Tous', 'Innovations', 'Financements', 'Événements', 'Portraits'];

  const filteredNews = news.filter(article => 
    selectedCategory === 'Tous' || article.category === selectedCategory
  );

  const featuredArticle = news.find(article => article.featured);
  const regularArticles = filteredNews.filter(article => !article.featured);

  if (loading) {
    return (
      <section id="actualites" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Chargement des actualités...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="actualites" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Actualités <span className="text-emerald-500">Tech</span> Mauritanie
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-blue-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez l'actualité et les innovations du secteur technologique en Mauritanie, où startups et entrepreneurs redéfinissent l'avenir numérique du pays.
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-emerald-500 to-blue-600 text-white shadow-lg transform scale-105'
                  : 'bg-white text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 shadow-md'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Featured Article */}
        {featuredArticle && selectedCategory === 'Tous' && (
          <div className="mb-16">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="lg:flex">
                <div className="lg:w-1/2">
                  <img
                    src={featuredArticle.image}
                    alt={featuredArticle.title}
                    className="w-full h-64 lg:h-full object-cover"
                  />
                </div>
                <div className="lg:w-1/2 p-8 lg:p-12">
                  <div className="flex items-center space-x-4 mb-4">
                    <span className="bg-gradient-to-r from-emerald-500 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center">
                      <Star className="w-4 h-4 mr-2" />
                      Article Vedette
                    </span>
                    <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-semibold">
                      {featuredArticle.category}
                    </span>
                  </div>
                  
                  <h3 className="text-3xl font-bold text-gray-900 mb-4 hover:text-emerald-600 transition-colors">
                    {featuredArticle.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                    {featuredArticle.excerpt}
                  </p>

                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span>{featuredArticle.author}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>{featuredArticle.date}</span>
                      </div>
                      <span>Lecture {featuredArticle.readTime}</span>
                    </div>
                  </div>

                  <button className="group bg-gradient-to-r from-emerald-500 to-blue-600 text-white px-8 py-4 rounded-lg font-bold hover:from-emerald-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-3">
                    <span>Lire l'article</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Regular Articles Grid */}
        {filteredNews.length === 0 ? (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Aucun article pour le moment</h3>
              <p className="text-gray-600">
                Les actualités et articles apparaîtront ici une fois ajoutés via le CMS.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularArticles.map((article) => (
              <article key={article.id} className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {article.category}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4" />
                      <span>{article.author}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{article.date}</span>
                      </div>
                      <span>Lecture {article.readTime}</span>
                    </div>
                  </div>

                  {/* CTA */}
                  <button className="group/btn w-full bg-gradient-to-r from-emerald-500 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-emerald-600 hover:to-blue-700 transition-all duration-300 flex items-center justify-center space-x-2">
                    <span>Lire plus</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Featured Article - only show if there are articles */}
        {featuredArticle && selectedCategory === 'Tous' && filteredNews.length > 0 && (
          <div className="mb-16">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="lg:flex">
                <div className="lg:w-1/2">
                  <img
                    src={featuredArticle.image}
                    alt={featuredArticle.title}
                    className="w-full h-64 lg:h-full object-cover"
                  />
                </div>
                <div className="lg:w-1/2 p-8 lg:p-12">
                  <div className="flex items-center space-x-4 mb-4">
                    <span className="bg-gradient-to-r from-emerald-500 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center">
                      <Star className="w-4 h-4 mr-2" />
                      Article Vedette
                    </span>
                    <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-semibold">
                      {featuredArticle.category}
                    </span>
                  </div>
                  
                  <h3 className="text-3xl font-bold text-gray-900 mb-4 hover:text-emerald-600 transition-colors">
                    {featuredArticle.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                    {featuredArticle.excerpt}
                  </p>

                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span>{featuredArticle.author}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>{featuredArticle.date}</span>
                      </div>
                      <span>Lecture {featuredArticle.readTime}</span>
                    </div>
                  </div>

                  <button className="group bg-gradient-to-r from-emerald-500 to-blue-600 text-white px-8 py-4 rounded-lg font-bold hover:from-emerald-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-3">
                    <span>Lire l'article</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Newsletter CTA */}
        <div className="mt-16 bg-gradient-to-r from-blue-900 to-emerald-900 rounded-3xl p-12 text-white text-center">
          <TrendingUp className="w-16 h-16 text-emerald-400 mx-auto mb-6" />
          <h3 className="text-3xl font-bold mb-4">Restez à la pointe de l'innovation</h3>
          <p className="text-xl text-blue-200 mb-8 max-w-2xl mx-auto">
            Recevez chaque semaine les dernières actualités de l'écosystème startup mauritanien directement dans votre boîte mail
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Votre adresse email"
              className="flex-1 px-6 py-4 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder-gray-500"
            />
            <button className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-8 py-4 rounded-lg font-bold hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl">
              S'abonner
            </button>
          </div>
          <p className="text-sm text-blue-300 mt-4">
            Plus de 1,500 entrepreneurs nous font déjà confiance
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;