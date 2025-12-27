export type Creator = {
  id: string;
  name: string;
};

export type Tutorial = {
  id: string;
  creator: Creator;
  title: string;
  description: string;
  contentMarkdown: string;
  category: string;
  thumbnailUrl: string;
  difficulty: string;
  estimatedMinutes: number;
  tags: string[];
  views: number;
  likes: number;
  createdAt: string;
};
