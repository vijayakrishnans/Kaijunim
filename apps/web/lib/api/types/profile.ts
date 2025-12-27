export type ProfileLinks = {
  website: string;
  twitter: string;
  youtube: string;
};

export type Profile = {
  id: string;
  name: string;
  bio: string;
  avatarUrl: string;
  links: ProfileLinks;
  followersCount: number;
  followingCount: number;
  featuredProductIds: string[];
  createdAt: string;
};
