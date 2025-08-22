import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, Users, Globe } from 'lucide-react';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Téléphone",
      content: "+222 44 09 26 55",
      subtitle: "Lun-Ven: 8h-17h"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      content: "depanapp222@gmail.com",
      subtitle: "Réponse sous 24h"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Adresse",
      content: "Nouakchott, Mauritanie",
      subtitle: "Centre d'affaires"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Horaires",
      content: "Lun-Ven: 8h-17h",
      subtitle: "Sam: 8h-12h"
    }
  ];

  const socialLinks = [
    { name: 'LinkedIn', url: '#', color: 'hover:text-blue-600' },
    { name: 'Twitter', url: '#', color: 'hover:text-blue-400' },
    { name: 'Facebook', url: '#', color: 'hover:text-blue-700' },
    { name: 'Instagram', url: '#', color: 'hover:text-pink-600' }
  ];

  const quickActions = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Devenir membre",
      description: "Rejoignez notre communauté",
      action: "Adhérer maintenant",
      link: "#adhesion"
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "Support technique",
      description: "Besoin d'aide technique ?",
      action: "Obtenir de l'aide",
      link: "#"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Partenariat",
      description: "Collaborons ensemble",
      action: "Discuter",
      link: "#partenaires"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Contactez-<span className="text-emerald-500">nous</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-blue-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Une question, une suggestion ou envie de rejoindre notre écosystème ? Nous sommes là pour vous accompagner dans votre parcours entrepreneurial.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-blue-900 to-emerald-900 rounded-3xl p-8 text-white h-full">
              <h3 className="text-2xl font-bold mb-8">Nos coordonnées</h3>
              
              <div className="space-y-6 mb-8">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      {info.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-emerald-300">{info.title}</h4>
                      <p className="text-white font-medium">{info.content}</p>
                      <p className="text-blue-200 text-sm">{info.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="space-y-4 mb-8">
                <h4 className="text-lg font-bold text-emerald-300">Actions rapides</h4>
                {quickActions.map((action, index) => (
                  <a
                    key={index}
                    href={action.link}
                    className="flex items-center space-x-3 p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-300 group"
                  >
                    <div className="text-emerald-400 group-hover:scale-110 transition-transform">
                      {action.icon}
                    </div>
                    <div>
                      <p className="font-semibold">{action.title}</p>
                      <p className="text-blue-200 text-sm">{action.description}</p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Social Links */}
              <div>
                <h4 className="text-lg font-bold text-emerald-300 mb-4">Suivez-nous</h4>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-all duration-300 transform hover:scale-110"
                    >
                      <span className="text-sm font-semibold">{social.name[0]}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Envoyez-nous un message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                      placeholder="Votre nom complet"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                      placeholder="votre@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                    Sujet *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="">Sélectionnez un sujet</option>
                    <option value="adhesion">Demande d'adhésion</option>
                    <option value="partenariat">Partenariat</option>
                    <option value="evenement">Organisation d'événement</option>
                    <option value="support">Support technique</option>
                    <option value="media">Demande presse/média</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Décrivez votre demande en détail..."
                  ></textarea>
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="consent"
                    required
                    className="w-4 h-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                  />
                  <label htmlFor="consent" className="text-sm text-gray-600">
                    J'accepte que mes données soient utilisées pour traiter ma demande *
                  </label>
                </div>

                <button
                  type="submit"
                  className="group w-full bg-gradient-to-r from-emerald-500 to-blue-600 text-white py-4 px-6 rounded-lg font-bold text-lg hover:from-emerald-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center space-x-3"
                >
                  <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  <span>Envoyer le message</span>
                </button>
              </form>
            </div>

            {/* FAQ Quick Links */}
            <div className="mt-8 bg-emerald-50 rounded-2xl p-6">
              <h4 className="text-lg font-bold text-gray-900 mb-4">Questions fréquentes</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <a href="#" className="flex items-center space-x-2 text-emerald-700 hover:text-emerald-800 transition-colors">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span>Comment devenir membre ?</span>
                </a>
                <a href="#" className="flex items-center space-x-2 text-emerald-700 hover:text-emerald-800 transition-colors">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span>Tarifs d'adhésion</span>
                </a>
                <a href="#" className="flex items-center space-x-2 text-emerald-700 hover:text-emerald-800 transition-colors">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span>Organiser un événement</span>
                </a>
                <a href="#" className="flex items-center space-x-2 text-emerald-700 hover:text-emerald-800 transition-colors">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span>Devenir partenaire</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;