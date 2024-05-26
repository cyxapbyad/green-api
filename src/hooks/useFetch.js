import { useState, useEffect } from 'react';
import axios from 'axios';

export const useFetch = async (method, url, body) => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const timeoutRef = useRef(null);

  const fetchData = async () => {
    setLoading(true);
    setError(false);
    try {
      const result = await axios({
        method: method,
        url: url,
        data: body,
      });
      setData(result);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
      setError(true);
    }
  };

  useEffect(() => {
    if (!query || query.trim() === '') {
      setBooks([]);
      return;
    } else {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        fetchData();
      }, 500);
    }

    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [query]);
  return { data, isLoading, isError };
};
