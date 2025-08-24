import React from 'react';
import { CMSProvider } from './components/CMSProvider';
import NetlifyIdentity from './components/NetlifyIdentity';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import StartupsSection from './components/StartupsSection';
import EventsSection from './components/EventsSection';
import NewsSection from './components/NewsSection';
import ResourcesSection from './components/ResourcesSection';
import PartnersSection from './components/PartnersSection';
import MembershipSection from './components/MembershipSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

function App() {
  return (
    <CMSProvider>
      <NetlifyIdentity />
      <div className="min-h-screen bg-white">
        <Header />
        <main>
          <HeroSection />
          <AboutSection />
          <StartupsSection />
          <EventsSection />
          <NewsSection />
          <ResourcesSection />
          <PartnersSection />
          <MembershipSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </CMSProvider>
  );
}

export default App;