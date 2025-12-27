import { DetailResponse, PaginatedResponse, fetchJson } from '../client';
import { Product } from '../types/products';

export const fetchProducts = () => fetchJson<PaginatedResponse<Product>>('/api/v1/products');

export const fetchProduct = (id: string) =>
  fetchJson<DetailResponse<Product>>(`/api/v1/products/${id}`);
