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
      return [];

    case 'events':
      return [];

    case 'news':
      return [];

    case 'partners':
      return [];

    case 'resources':
      return [];

    default:
      return [];
  }
};

export default useDynamicContent;