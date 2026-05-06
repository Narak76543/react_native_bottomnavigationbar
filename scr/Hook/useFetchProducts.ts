import { useState, useEffect, useCallback } from 'react';
import { Product } from '../models/Product';
import { getProducts } from '../service/api';

export const useFetchProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      console.log(
        '===================Data Received:===========================================',
        data,
      );
      setProducts(data);
    } catch (err) {
      setError(
        '======================have a problem with fetching Data===========================',
      );
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return { products, loading, error, refetch: loadData };
};
