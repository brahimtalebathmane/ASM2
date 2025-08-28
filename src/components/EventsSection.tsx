import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, ArrowRight, X } from 'lucide-react';
import { useDynamicContent } from '../hooks/useDynamicContent';

interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  image?: string;
  time?: string;
  attendees?: number;
}

const EventsSection = () => {
  const { data: allEvents, loading } = useDynamicContent('events');
  const [activeTab, setActiveTab] = useState('upcoming');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  // تصنيف الأحداث حسب التاريخ
  const now = new Date();
  const upcomingEvents = allEvents.filter(e => new Date(e.date) >= now);
  const pastEvents = allEvents.filter(e => new Date(e.date) < now);
  const currentEvents = activeTab === 'upcoming' ? upcomingEvents : pastEvents;

  const openModal = (event: Event) => {
    setSelectedEvent(event);
  };

  const closeModal = () => {
    setSelectedEvent(null);
  };

  // Function to render markdown-like content
  const renderDescription = (description: string) => {
    if (!description) return '';
    
    // Simple markdown parsing for basic formatting
    return description
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br>')
      .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mb-4">$1</h1>')
      .replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold mb-3">$1</h2>')
      .replace(/^### (.*$)/gim, '<h3 class="text-lg font-bold mb-2">$1</h3>');
  };

  if (loading) {
    return (
      <section id="evenements" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Chargement des événements...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section id="evenements" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Événements <span className="text-emerald-500">&</span> Actualités
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez nos événements passés et à venir qui rassemblent l'écosystème startup mauritanien
            </p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center mb-12">
            <div className="flex bg-white rounded-lg p-1 shadow-lg">
              <button
                onClick={() => setActiveTab('upcoming')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  activeTab === 'upcoming'
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-emerald-600'
                }`}
              >
                Événements à venir ({upcomingEvents.length})
              </button>
              <button
                onClick={() => setActiveTab('past')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  activeTab === 'past'
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-emerald-600'
                }`}
              >
                Événements passés ({pastEvents.length})
              </button>
            </div>
          </div>

          {/* Events Grid */}
          {currentEvents.length === 0 ? (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Calendar className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Aucun événement {activeTab === 'upcoming' ? 'à venir' : 'passé'} pour le moment
                </h3>
                <p className="text-gray-600">
                  Les événements apparaîtront ici une fois ajoutés via le CMS.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {currentEvents.map((event) => (
                <div key={event.id} className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden cursor-pointer">
                  {/* Event Image */}
                  <div className="relative h-48 overflow-hidden bg-gradient-to-br from-emerald-500 to-teal-600">
                    {event.image ? (
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        onError={(e) => {
                          // Fallback to gradient background if image fails to load
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Calendar className="w-16 h-16 text-white opacity-50" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    
                    {/* Date Badge */}
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-emerald-600">
                          {new Date(event.date).getDate()}
                        </div>
                        <div className="text-xs text-gray-600 uppercase">
                          {new Date(event.date).toLocaleDateString('fr-FR', { month: 'short' })}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Event Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors line-clamp-2">
                      {event.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {event.description?.replace(/[#*]/g, '').substring(0, 120)}...
                    </p>

                    {/* Event Meta */}
                    <div className="space-y-2 mb-6">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4 text-emerald-500" />
                        <span>{new Date(event.date).toLocaleDateString('fr-FR', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}</span>
                      </div>
                      
                      {event.time && (
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Clock className="w-4 h-4 text-emerald-500" />
                          <span>{event.time}</span>
                        </div>
                      )}
                      
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4 text-emerald-500" />
                        <span>{event.location}</span>
                      </div>
                      
                      {event.attendees && (
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Users className="w-4 h-4 text-emerald-500" />
                          <span>{event.attendees} participants</span>
                        </div>
                      )}
                    </div>

                    {/* CTA Button */}
                    <button
                      onClick={() => openModal(event)}
                      className="group/btn w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-3 rounded-lg font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                    >
                      <span>En savoir plus</span>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* CTA Section */}
          <div className="mt-16 bg-gradient-to-r from-blue-900 to-emerald-900 rounded-3xl p-12 text-white text-center">
            <h3 className="text-3xl font-bold mb-4">Organisez votre événement</h3>
            <p className="text-xl text-blue-200 mb-8 max-w-2xl mx-auto">
              Vous souhaitez organiser un événement avec la MSA ? Contactez-nous pour discuter de votre projet
            </p>
            <a
              href="mailto:mauristartups@gmail.com?subject=Organisation d'événement"
              className="inline-block bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Nous contacter
            </a>
          </div>
        </div>
      </section>

      {/* Event Details Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Modal Header */}
            <div className="relative">
              {selectedEvent.image ? (
                <div className="h-64 md:h-80 overflow-hidden rounded-t-3xl">
                  <img
                    src={selectedEvent.image}
                    alt={selectedEvent.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                </div>
              ) : (
                <div className="h-64 md:h-80 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-t-3xl flex items-center justify-center">
                  <Calendar className="w-24 h-24 text-white opacity-50" />
                </div>
              )}
              
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg"
              >
                <X className="w-5 h-5 text-gray-700" />
              </button>

              {/* Date Badge */}
              <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg">
                <div className="text-center">
                  <div className="text-3xl font-bold text-emerald-600">
                    {new Date(selectedEvent.date).getDate()}
                  </div>
                  <div className="text-sm text-gray-600 uppercase font-medium">
                    {new Date(selectedEvent.date).toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' })}
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {selectedEvent.title}
              </h2>

              {/* Event Meta */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                  <Calendar className="w-6 h-6 text-emerald-500" />
                  <div>
                    <p className="font-semibold text-gray-900">Date</p>
                    <p className="text-gray-600">
                      {new Date(selectedEvent.date).toLocaleDateString('fr-FR', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                  <MapPin className="w-6 h-6 text-emerald-500" />
                  <div>
                    <p className="font-semibold text-gray-900">Lieu</p>
                    <p className="text-gray-600">{selectedEvent.location}</p>
                  </div>
                </div>

                {selectedEvent.time && (
                  <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                    <Clock className="w-6 h-6 text-emerald-500" />
                    <div>
                      <p className="font-semibold text-gray-900">Heure</p>
                      <p className="text-gray-600">{selectedEvent.time}</p>
                    </div>
                  </div>
                )}

                {selectedEvent.attendees && (
                  <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                    <Users className="w-6 h-6 text-emerald-500" />
                    <div>
                      <p className="font-semibold text-gray-900">Participants</p>
                      <p className="text-gray-600">{selectedEvent.attendees} personnes</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Event Description */}
              <div className="prose prose-lg max-w-none">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Description</h3>
                <div 
                  className="text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ 
                    __html: renderDescription(selectedEvent.description || '') 
                  }}
                />
              </div>

              {/* Modal Actions */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-gray-200">
                <a
                  href={"mailto:mauristartups@gmail.com?subject=Inscription événement: " + selectedEvent.title}
                  className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl text-center"
                >
                  S'inscrire à l'événement
                </a>
                <button
                  onClick={closeModal}
                  className="flex-1 sm:flex-none bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EventsSection;