import api from "../api/axios";
import { Product } from "../types/Product";

export const getProducts = () => {
  return api.get<Product[]>("/products");
};

export const createProduct = (product: Product) => {
  return api.post("/products", product);
};

export const updateProduct = (product: Product) => {
  return api.put(`/products/${product.id}`, product);
};

export const deleteProduct = (id: number) => {
  return api.delete(`/products/${id}`);
};