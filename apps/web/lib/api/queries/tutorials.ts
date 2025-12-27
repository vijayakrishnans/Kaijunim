import { DetailResponse, PaginatedResponse, fetchJson } from '../client';
import { Tutorial } from '../types/tutorials';

export const fetchTutorials = () => fetchJson<PaginatedResponse<Tutorial>>('/api/v1/tutorials');

export const fetchTutorial = (id: string) =>
  fetchJson<DetailResponse<Tutorial>>(`/api/v1/tutorials/${id}`);
