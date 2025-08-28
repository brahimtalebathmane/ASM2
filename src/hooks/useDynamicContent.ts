import React, { useState } from 'react';
import { Calendar, Clock, Users, ArrowRight } from 'lucide-react';
import { useDynamicContent } from '../hooks/useDynamicContent';

const EventsSection = () => {
  const { data: allEvents, loading } = useDynamicContent('events');
  const [activeTab, setActiveTab] = useState('upcoming');
  const [selectedEvent, setSelectedEvent] = useState<any>(null); // الحدث المختار للـ modal

  const openModal = (event: any) => setSelectedEvent(event);
  const closeModal = () => setSelectedEvent(null);

  const now = new Date();
  const upcomingEvents = allEvents.filter(e => new Date(e.date) >= now);
  const pastEvents = allEvents.filter(e => new Date(e.date) < now);
  const currentEvents = activeTab === 'upcoming' ? upcomingEvents : pastEvents;

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
    <section id="evenements" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Événements <span className="text-emerald-500">&</span> Actualités
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto mb-6"></div>
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
              Événements à venir
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === 'past'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-emerald-600'
              }`}
            >
              Événements passés
            </button>
          </div>
        </div>

        {/* Events Grid */}
        {currentEvents.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Aucun événement {activeTab === 'upcoming' ? 'à venir' : 'passé'} pour le moment
            </h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {currentEvents.map((event) => (
              <div key={event.id} className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  {event.image && (
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{event.description}</p>
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4 text-emerald-500" />
                      <span>{new Date(event.date).toLocaleDateString('fr-FR')}</span>
                    </div>
                    {event.time && (
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4 text-emerald-500" />
                        <span>{event.time}</span>
                      </div>
                    )}
                    {event.attendees && (
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Users className="w-4 h-4 text-emerald-500" />
                        <span>{event.attendees} participants</span>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => setSelectedEvent(event)}
                    className="group/btn w-full bg-gradient-to-r from-emerald-500 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-emerald-600 hover:to-blue-700 transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <span>En savoir plus</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedEvent && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setSelectedEvent(null)}
        >
          <div
            className="bg-white rounded-lg max-w-3xl w-full p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 font-bold text-xl"
            >
              &times;
            </button>

            <h2 className="text-2xl font-bold mb-4">{selectedEvent.title}</h2>
            {selectedEvent.image && (
              <img
                src={selectedEvent.image}
                alt={selectedEvent.title}
                className="w-full h-64 object-cover rounded mb-4"
              />
            )}
            <div className="text-gray-700 mb-4">
              <p>{selectedEvent.description}</p>
            </div>
            <div className="text-sm text-gray-500">
              <p>Lieu: {selectedEvent.location}</p>
              <p>Date: {new Date(selectedEvent.date).toLocaleDateString('fr-FR')}</p>
              {selectedEvent.time && <p>Heure: {selectedEvent.time}</p>}
              {selectedEvent.attendees && <p>Participants: {selectedEvent.attendees}</p>}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default EventsSection;
