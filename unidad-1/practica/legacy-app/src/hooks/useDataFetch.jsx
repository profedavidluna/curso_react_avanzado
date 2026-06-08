import { useEffect, useState } from 'react';

const useDataFetch = (url, initialData = []) => {

  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Error HTTP ${response.status}`);
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Error cargando datos');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

  }, [url]);


  return { data: data, loading, error };
};

export default useDataFetch;