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

      const [siteConfig, heroContent, aboutContent, membershipPlans] = await Promise.all([
        fetch('/src/data/siteConfig.json').then(res => res.json()),
        fetch('/src/data/heroContent.json').then(res => res.json()),
        fetch('/src/data/aboutContent.json').then(res => res.json()),
        fetch('/src/data/membership.json').then(res => res.json()),
      ]);

      setData({
        siteConfig,
        heroContent,
        aboutContent,
        membershipPlans,
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