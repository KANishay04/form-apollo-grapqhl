// src/hooks/useMockData.js
import { useState } from 'react';

const useMockData = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setData({ name: '', email: '', password: '' });
      setError(null);
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };

  const performMutation = async (formData) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setData(formData);
      setError(null);
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };

  return { loading, data, error, fetchData, performMutation };
};

export default useMockData;
