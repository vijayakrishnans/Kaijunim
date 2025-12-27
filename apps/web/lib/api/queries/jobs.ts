import { DetailResponse, PaginatedResponse, fetchJson } from '../client';
import { Job } from '../types/jobs';

export const fetchJobs = () => fetchJson<PaginatedResponse<Job>>('/api/v1/jobs');

export const fetchJob = (id: string) => fetchJson<DetailResponse<Job>>(`/api/v1/jobs/${id}`);
