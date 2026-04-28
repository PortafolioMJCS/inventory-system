import { useEffect, useState } from "react";
import { Product } from "../types/Product";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct
} from "../services/productService";

export const useProducts = (isAuth: boolean) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await getProducts();
      setProducts(res.data);
    } catch (err) {
      setError("Error al obtener productos");
    } finally {
      setLoading(false);
    }
  };

  const saveProduct = async (product: Product) => {
    try {
      setLoading(true);

      if (product.id) {
        await updateProduct(product);
      } else {
        await createProduct(product);
      }

      await fetchProducts();

    } catch (err) {
      setError("Error al guardar producto");
    } finally {
      setLoading(false);
    }
  };


  const removeProduct = async (id: number) => {
    try {
      setLoading(true);
      await deleteProduct(id);
      await fetchProducts();
    } catch (err) {
      setError("Error al eliminar producto");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  if (isAuth) {
    fetchProducts();
  }
}, [isAuth]);

  return {
    products,
    loading,
    error,
    fetchProducts,
    saveProduct,
    removeProduct
  };
};