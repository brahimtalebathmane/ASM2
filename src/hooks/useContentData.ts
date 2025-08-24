import { useState, useEffect } from 'react';

interface ContentData {
  [key: string]: any;
}

export const useContentData = (dataFile: string) => {
  const [data, setData] = useState<ContentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/src/data/${dataFile}.json`);
        if (!response.ok) {
          throw new Error(`Failed to load ${dataFile}`);
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        console.error(`Error loading ${dataFile}:`, err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [dataFile]);

  return { data, loading, error };
};

export default useContentData;