export type Poster = {
  id: string;
  name: string;
};

export type Job = {
  id: string;
  poster: Poster;
  title: string;
  description: string;
  category: string;
  budgetMin: number;
  budgetMax: number;
  duration: string;
  requirements: string[];
  tags: string[];
  status: string;
  views: number;
  applicationsCount: number;
  createdAt: string;
};
