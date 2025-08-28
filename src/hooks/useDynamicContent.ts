import { useState, useEffect } from 'react';

interface ContentItem {
  [key: string]: any;
}

export const useDynamicContent = (collection: string) => {
  const [data, setData] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadContent = async () => {
    try {
      setLoading(true);
      setError(null);

      // Add cache busting parameter (correct Template Literal)
      const cacheBuster = `?v=${Date.now()}&t=${Math.random()}`;
      const response = await fetch(`/data/${collection}.json${cacheBuster}`);
      
      if (!response.ok) {
        throw new Error(`Failed to load ${collection}: ${response.status}`);
      }

      const text = await response.text();
      
      // Check if we got HTML instead of JSON (404 page)
      if (text.trim().startsWith('<!DOCTYPE html>') || text.trim().startsWith('<html')) {
        console.warn(`Got HTML response for ${collection}, using fallback data`);
        setData(getFallbackData(collection));
        return;
      }

      try {
        const jsonData = JSON.parse(text);
        
        // Extract the array from the JSON structure based on collection type
        let items: ContentItem[] = [];
        
        switch (collection) {
          case 'startups':
            items = jsonData.startups || [];
            break;
          case 'events':
            items = jsonData.events || [];
            break;
          case 'news':
            items = jsonData.articles || [];
            break;
          case 'partners':
            items = jsonData.partners || [];
            break;
          case 'resources':
            items = jsonData.resources || [];
            break;
          case 'about':
            // For about section, we expect a single object, so wrap it in an array
            items = jsonData ? [jsonData] : [];
            break;
          default:
            items = Array.isArray(jsonData) ? jsonData : (jsonData ? [jsonData] : []);
        }
        
        // Add unique IDs if not present
        const itemsWithIds = items.map((item, index) => ({
          ...item,
          id: item.id || `${collection}-${index}`
        }));
        
        setData(itemsWithIds);
      } catch (parseError) {
        console.error(`Failed to parse JSON for ${collection}:`, parseError);
        setData(getFallbackData(collection));
      }

    } catch (err) {
      console.error(`Error loading ${collection}:`, err);
      setError(err instanceof Error ? err.message : 'Unknown error');
      setData(getFallbackData(collection));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContent();
  }, [collection]);

  // Auto-refresh every 30 seconds to catch CMS updates
  useEffect(() => {
    const interval = setInterval(() => {
      loadContent();
    }, 30000);

    return () => clearInterval(interval);
  }, [collection]);

  return { data, loading, error, refetch: loadContent };
};

// Fallback data for when dynamic loading fails
const getFallbackData = (collection: string): ContentItem[] => {
  switch (collection) {
    case 'startups':
      return [
        {
          id: 'fallback-startup-1',
          name: 'Startup Example',
          logo: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=200',
          description: 'Description de la startup exemple',
          url: 'https://example.com'
        }
      ];

    case 'events':
      return [
        {
          id: 'fallback-event-1',
          title: 'Événement Exemple',
          date: '2025-03-15T09:00:00.000Z',
          location: 'Nouakchott',
          description: 'Description de l\'événement exemple'
        }
      ];

    case 'news':
      return [
        {
          id: 'fallback-news-1',
          title: 'Article Exemple',
          date: '2025-01-15T10:00:00.000Z',
          image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800',
          content: 'Contenu de l\'article exemple'
        }
      ];

    case 'partners':
      return [
        {
          id: 'fallback-partner-1',
          name: 'Partenaire Exemple',
          logo: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=200',
          url: 'https://example.com'
        }
      ];

    case 'resources':
      return [
        {
          id: 'fallback-resource-1',
          title: 'Ressource Exemple',
          type: 'PDF',
          file: '/example.pdf',
          description: 'Description de la ressource exemple'
        }
      ];

    case 'about':
      return [
        {
          id: 'fallback-about-1',
          title: 'À propos de l\'Association Mauritanienne des Startups',
          description: 'L\'Association Mauritanienne des Startups (MSA) est une organisation à but non lucratif dédiée au développement de l\'écosystème entrepreneurial en Mauritanie.',
          mission: 'Notre mission est de fédérer, promouvoir et défendre les intérêts des startups mauritaniennes.',
          values: ['Innovation', 'Collaboration', 'Excellence', 'Transparence'],
          image: '/images/uploads/présentation-entreprise-bleu-moderne-simple.jpg'
        }
      ];

    default:
      return [];
  }
};

export default useDynamicContent;
