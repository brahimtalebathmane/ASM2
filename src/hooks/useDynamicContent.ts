import { useState, useEffect } from 'react';

interface ContentItem {
  [key: string]: any;
}

export const useDynamicContent = (collection: string) => {
  const [data, setData] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadContent = async () => {
      try {
        setLoading(true);
        setError(null);

        // Try to fetch the collection data
        const response = await fetch(`/data/${collection}/`);
        
        if (!response.ok) {
          // If direct folder access fails, try to load individual files
          // This is a fallback for when we can't list directory contents
          setData([]);
          return;
        }

        const text = await response.text();
        
        // Check if we got HTML instead of JSON (404 page)
        if (text.trim().startsWith('<!DOCTYPE html>') || text.trim().startsWith('<html')) {
          console.warn(`Got HTML response for ${collection}, using fallback data`);
          setData([]);
          return;
        }

        try {
          const jsonData = JSON.parse(text);
          setData(Array.isArray(jsonData) ? jsonData : [jsonData]);
        } catch (parseError) {
          console.warn(`Failed to parse JSON for ${collection}:`, parseError);
          setData([]);
        }

      } catch (err) {
        console.error(`Error loading ${collection}:`, err);
        setError(err instanceof Error ? err.message : 'Unknown error');
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [collection]);

  return { data, loading, error, refetch: () => loadContent() };
};

// Hook for loading markdown files from collections
export const useMarkdownCollection = (collection: string) => {
  const [data, setData] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMarkdownFiles = async () => {
      try {
        setLoading(true);
        setError(null);

        // For now, we'll use static data as a fallback
        // In a real implementation, you'd need a way to list files in the directory
        const fallbackData = getFallbackData(collection);
        setData(fallbackData);

      } catch (err) {
        console.error(`Error loading ${collection}:`, err);
        setError(err instanceof Error ? err.message : 'Unknown error');
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    loadMarkdownFiles();
  }, [collection]);

  return { data, loading, error };
};

// Fallback data for when dynamic loading fails
const getFallbackData = (collection: string): ContentItem[] => {
  switch (collection) {
    case 'startups':
      return [
        {
          id: 1,
          name: "MauriPay",
          sector: "FinTech",
          description: "Solution de paiement mobile révolutionnaire pour l'inclusion financière",
          founder: "Aminata Sow",
          employees: "12-15",
          location: "Nouakchott",
          website: "https://mauripay.mr",
          logo: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=200"
        },
        {
          id: 2,
          name: "EduMauri",
          sector: "EdTech",
          description: "Plateforme d'apprentissage en ligne adaptée au contexte mauritanien",
          founder: "Mohamed Lemine",
          employees: "8-10",
          location: "Nouakchott",
          website: "https://edumauri.mr",
          logo: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=200"
        },
        {
          id: 3,
          name: "HealthConnect",
          sector: "HealthTech",
          description: "Télémédecine et gestion numérique des dossiers médicaux",
          founder: "Dr. Fatima Mint",
          employees: "15-20",
          location: "Nouakchott",
          website: "https://healthconnect.mr",
          logo: "https://images.pexels.com/photos/3184317/pexels-photo-3184317.jpeg?auto=compress&cs=tinysrgb&w=200"
        }
      ];

    case 'events':
      return [
        {
          id: 1,
          title: "Mauritania Tech Summit 2025",
          date: "15 Mars 2025",
          time: "09:00 - 18:00",
          location: "Centre de Conférences, Nouakchott",
          attendees: "200+",
          type: "Conférence",
          description: "Le plus grand événement tech de Mauritanie réunissant entrepreneurs, investisseurs et experts",
          image: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=600",
          status: "upcoming"
        },
        {
          id: 2,
          title: "Workshop: Financement des Startups",
          date: "28 Février 2025",
          time: "14:00 - 17:00",
          location: "Incubateur TechHub, Nouakchott",
          attendees: "50+",
          type: "Atelier",
          description: "Découvrez les stratégies de levée de fonds et rencontrez des investisseurs potentiels",
          image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600",
          status: "upcoming"
        }
      ];

    case 'news':
      return [
        {
          id: 1,
          title: "MauriPay lève 2 millions d'ouguiyas pour sa expansion",
          category: "Financements",
          excerpt: "La startup fintech mauritanienne annonce une levée de fonds record pour étendre ses services de paiement mobile dans toute la région.",
          author: "Fatima Mint Ahmed",
          date: "15 Janvier 2025",
          readTime: "5 min",
          image: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=600",
          featured: true
        }
      ];

    case 'partners':
      return [
        {
          id: 1,
          name: "Banque Atlantique",
          logo: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=200",
          category: "Financier",
          description: "Partenaire financier principal pour le financement des startups"
        }
      ];

    case 'resources':
      return [
        {
          id: 1,
          title: "Guide complet : Créer sa startup en Mauritanie",
          category: "Guides",
          type: "PDF",
          size: "2.5 MB",
          downloads: 1250,
          description: "Toutes les étapes pour lancer votre startup, de l'idée à la mise sur le marché"
        }
      ];

    default:
      return [];
  }
};

export default useDynamicContent;