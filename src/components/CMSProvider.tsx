import React, { createContext, useContext, useState, useEffect } from 'react';

interface CMSData {
  siteConfig: any;
  heroContent: any;
  aboutContent: any;
  membershipPlans: any;
}

interface CMSContextType {
  data: CMSData;
  loading: boolean;
  error: string | null;
  refreshData: () => void;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

export const useCMS = () => {
  const context = useContext(CMSContext);
  if (context === undefined) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
};

export const CMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<CMSData>({
    siteConfig: null,
    heroContent: null,
    aboutContent: null,
    membershipPlans: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Load data from public folder
      const loadFile = async (path: string) => {
        try {
          const response = await fetch(path);
          if (!response.ok) {
            throw new Error(`Failed to load ${path}`);
          }
          const text = await response.text();
          
          // Check if we got HTML instead of JSON (404 page)
          if (text.trim().startsWith('<!DOCTYPE html>') || text.trim().startsWith('<html')) {
            console.warn(`Got HTML response for ${path}, using fallback`);
            return null;
          }
          
          return JSON.parse(text);
        } catch (err) {
          console.warn(`Failed to load ${path}:`, err);
          return null;
        }
      };

      const [siteConfig, heroContent, aboutContent, membershipPlans] = await Promise.all([
        loadFile('/data/siteConfig.json'),
        loadFile('/data/heroContent.json'),
        loadFile('/data/aboutContent.json'),
        loadFile('/data/membership.json'),
      ]);

      setData({
        siteConfig: siteConfig || {
          title: "Site Web Association Mauritanienne des Startups - MSA",
          description: "L'Association Mauritanienne des Startups œuvre pour développer un écosystème entrepreneurial dynamique et favoriser l'innovation technologique en Mauritanie.",
          logo: "https://i.postimg.cc/GppXFY5g/18.png",
          abbreviation: "MSA",
          email: "mauristartups@gmail.com",
          phone: "+222 44 09 26 55",
          address: "Nouakchott, Mauritanie"
        },
        heroContent: heroContent || {
          mainTitle: "Synergie Des",
          highlightedWord: "Startups",
          subtitle: "Mauritaniennes",
          description: "Unies pour innover davantage ! Rejoignez l'écosystème startup le plus dynamique de Mauritanie et participez à la transformation numérique du pays.",
          primaryButtonText: "Devenir Membre",
          secondaryButtonText: "Découvrir l'Écosystème",
          heroImage: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800",
          stats: [
            { number: 50, suffix: "+", label: "Startups Membres", icon: "Users" },
            { number: 25, suffix: "+", label: "Événements/An", icon: "Calendar" },
            { number: 100, suffix: "M+", label: "Ouguiya Financements", icon: "Trophy" },
            { number: 200, suffix: "+", label: "Emplois Créés", icon: "Rocket" }
          ]
        },
        aboutContent: aboutContent || {
          title: "Qui sommes-nous?",
          description: "L'Association Mauritanienne des Startups est née de l'idée de réunir sous une même bannière les entreprises technologiques innovantes de Mauritanie.",
          extendedDescription: "Nous œuvrons pour développer un écosystème entrepreneurial dynamique, favoriser l'innovation et accompagner les jeunes entrepreneurs dans leur parcours vers la réussite.",
          image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800",
          missions: [
            { title: "Fédération", description: "Fédérer tout l'écosystème Tech en une communauté forte.", icon: "Target" },
            { title: "Networking & Lobbying", description: "Se positionner comme interlocuteur de référence pour les autorités.", icon: "Users" },
            { title: "Formation", description: "Apporter notre expérience pour améliorer la compétitivité des Start-up mauritaniennes.", icon: "Lightbulb" },
            { title: "Innovation", description: "Promouvoir l'innovation technologique et accompagner les entrepreneurs.", icon: "Award" }
          ]
        },
        membershipPlans: membershipPlans || {
          plans: [
            {
              id: "startup",
              name: "Startup",
              price: "50,000",
              period: "/an",
              description: "Parfait pour les jeunes entreprises qui démarrent",
              popular: false,
              features: ["Accès à tous les événements MSA", "Listing dans l'annuaire des startups"]
            }
          ]
        },
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load CMS data');
      console.error('CMS data loading error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const refreshData = () => {
    loadData();
  };

  return (
    <CMSContext.Provider value={{ data, loading, error, refreshData }}>
      {children}
    </CMSContext.Provider>
  );
};