import { useState, useCallback } from 'react';

export const useApi = (apiFunction) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const callApi = useCallback(async (params) => {
    setLoading(true);
    setError(null);
    try {
      let result;
      if (params)
        result = await apiFunction(params)
      else
        result = await apiFunction();
      setData(result);
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Something went wrong';
      setError({ message: errorMessage, error: err});
    } finally {
      setLoading(false);
    }
  }, [apiFunction]);

  return [callApi, { data, loading, error }];
};
