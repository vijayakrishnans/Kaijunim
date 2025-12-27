export type Seller = {
  id: string;
  name: string;
};

export type Discount = {
  percent: number;
  start: string;
  end: string;
};

export type Metrics = {
  views: number;
  likes: number;
  sales: number;
  rating: number;
  reviewsCount: number;
};

export type Product = {
  id: string;
  seller: Seller;
  title: string;
  description: string;
  price: number;
  category: string;
  type: string;
  previewUrl: string;
  tags: string[];
  status: string;
  discount?: Discount | null;
  metrics: Metrics;
  featured: boolean;
  createdAt: string;
};
