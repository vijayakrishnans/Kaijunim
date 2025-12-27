import { DetailResponse, fetchJson } from '../client';
import { Profile } from '../types/profile';

export const fetchProfile = (id: string) => fetchJson<DetailResponse<Profile>>(`/api/v1/profile/${id}`);
