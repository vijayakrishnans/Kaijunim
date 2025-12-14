export type User = { id: string; name: string; handle: string; avatar: string; location?: string };
export type Media = { url: string; type: 'image' | 'video'; caption?: string; tags?: string[]; location?: string; likes: number; comments: number; expiresAt?: string };
export type Post = Media & { id: string; userId: string; createdAt: string };
export type Story = Media & { id: string; userId: string; createdAt: string };
export type Comment = { id: string; postId: string; userId: string; content: string; createdAt: string };
export type Like = { id: string; postId: string; userId: string; createdAt: string };
export type Follow = { followerId: string; followingId: string; createdAt: string };
export type Conversation = { id: string; participantIds: string[]; lastMessage: string; unread: number };
export type Message = { id: string; conversationId: string; senderId: string; content: string; createdAt: string };
export type Playlist = { id: string; userId: string; title: string; description: string; items: PlaylistItem[] };
export type PlaylistItem = { id: string; playlistId: string; title: string; duration: string; url: string };
export type Product = {
  id: string;
  sellerId: string;
  title: string;
  description: string;
  price: number;
  category: string;
  type: 'digital' | 'physical' | 'service';
  fileUrl: string;
  previewUrl: string;
  gallery: string[];
  tags: string[];
  status: 'active' | 'draft';
  discount?: { percentage: number; start: string; end: string };
  metrics: { views: number; likes: number; sales: number; rating: number; reviews: number };
  featured?: boolean;
};
export type Purchase = { id: string; buyerId: string; sellerId: string; productId: string; price: number; createdAt: string };
export type Review = { id: string; productId: string; userId: string; rating: number; comment: string; createdAt: string };
export type Tutorial = {
  id: string;
  authorId: string;
  title: string;
  description: string;
  content: string;
  category: string;
  thumbnail: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  tags: string[];
  metrics: { views: number; likes: number };
};
export type SubscriptionTier = { id: string; creatorId: string; title: string; price: number; benefits: string[] };
export type Subscription = { id: string; tierId: string; userId: string; createdAt: string };
export type Tip = { id: string; fromUserId: string; toUserId: string; amount: number; reason?: string; createdAt: string };
export type CreatorAnalytics = { id: string; creatorId: string; date: string; views: number; likes: number; comments: number; followersGained: number; revenue: number; engagementRate: number };
export type Job = { id: string; posterId: string; title: string; description: string; category: string; budget: string; duration: string; requirements: string[]; tags: string[]; status: 'open' | 'closed'; views: number; applications: number };
export type OpenSourceProject = { id: string; name: string; description: string; category: string; projectUrl: string; githubUrl: string; supportUrl: string; logo: string; supporters: number };
export type CreatorTool = { id: string; creatorId: string; name: string; description: string; category: string; toolUrl: string; affiliateLink?: string; logo: string; free: boolean; rating: number };

export const users: User[] = Array.from({ length: 6 }).map((_, idx) => ({
  id: `user-${idx + 1}`,
  name: `Creator ${idx + 1}`,
  handle: `creator${idx + 1}`,
  avatar: `https://api.dicebear.com/7.x/identicon/svg?seed=creator${idx + 1}`,
  location: ['Tokyo', 'New York', 'Berlin', 'Seoul', 'Paris', 'Toronto'][idx]
}));

export const posts: Post[] = Array.from({ length: 6 }).map((_, idx) => ({
  id: `post-${idx + 1}`,
  userId: users[idx % users.length].id,
  url: `https://placehold.co/800x450?text=Post+${idx + 1}`,
  type: idx % 2 === 0 ? 'image' : 'video',
  caption: `Adventure ${idx + 1} through the cityscape`,
  tags: ['travel', 'art', 'city', 'culture'],
  location: ['Tokyo', 'New York', 'Berlin', 'Seoul', 'Paris', 'Toronto'][idx % 6],
  likes: 120 + idx * 13,
  comments: 20 + idx * 4,
  createdAt: new Date(Date.now() - idx * 3600_000).toISOString()
}));

export const stories: Story[] = Array.from({ length: 6 }).map((_, idx) => ({
  id: `story-${idx + 1}`,
  userId: users[idx % users.length].id,
  url: `https://placehold.co/400x700?text=Story+${idx + 1}`,
  type: idx % 2 === 0 ? 'image' : 'video',
  caption: `Daily vibe ${idx + 1}`,
  tags: ['behind-the-scenes', 'music'],
  likes: 40 + idx * 5,
  comments: 3 + idx,
  expiresAt: new Date(Date.now() + 12 * 3600_000).toISOString(),
  createdAt: new Date(Date.now() - idx * 1800_000).toISOString()
}));

export const comments: Comment[] = Array.from({ length: 6 }).map((_, idx) => ({
  id: `comment-${idx + 1}`,
  postId: posts[idx % posts.length].id,
  userId: users[(idx + 1) % users.length].id,
  content: `Love this perspective ${idx + 1}!`,
  createdAt: new Date(Date.now() - idx * 7200_000).toISOString()
}));

export const likes: Like[] = Array.from({ length: 6 }).map((_, idx) => ({
  id: `like-${idx + 1}`,
  postId: posts[idx % posts.length].id,
  userId: users[(idx + 2) % users.length].id,
  createdAt: new Date().toISOString()
}));

export const follows: Follow[] = Array.from({ length: 6 }).map((_, idx) => ({
  followerId: users[idx].id,
  followingId: users[(idx + 1) % users.length].id,
  createdAt: new Date().toISOString()
}));

export const conversations: Conversation[] = Array.from({ length: 6 }).map((_, idx) => ({
  id: `conv-${idx + 1}`,
  participantIds: [users[idx].id, users[(idx + 1) % users.length].id],
  lastMessage: `Catch up later ${idx + 1}?`,
  unread: idx % 3
}));

export const messages: Message[] = Array.from({ length: 6 }).map((_, idx) => ({
  id: `msg-${idx + 1}`,
  conversationId: conversations[idx % conversations.length].id,
  senderId: users[idx % users.length].id,
  content: `Message ${idx + 1} about the collab idea`,
  createdAt: new Date(Date.now() - idx * 600_000).toISOString()
}));

export const playlistItems: PlaylistItem[] = Array.from({ length: 6 }).map((_, idx) => ({
  id: `pli-${idx + 1}`,
  playlistId: 'playlist-1',
  title: `Inspiration clip ${idx + 1}`,
  duration: `${3 + idx}:0${idx}`,
  url: `https://example.com/video${idx + 1}.mp4`
}));

export const playlists: Playlist[] = Array.from({ length: 6 }).map((_, idx) => ({
  id: `playlist-${idx + 1}`,
  userId: users[idx % users.length].id,
  title: `Curated edits ${idx + 1}`,
  description: 'A mix of cinematic shots and tutorials',
  items: playlistItems
}));

export const products: Product[] = Array.from({ length: 6 }).map((_, idx) => ({
  id: `prod-${idx + 1}`,
  sellerId: users[idx % users.length].id,
  title: `Digital asset pack ${idx + 1}`,
  description: 'High-quality LUTs, textures, and templates.',
  price: 29 + idx * 5,
  category: ['art', 'music', 'software', 'photography', 'games', 'novels'][idx % 6],
  type: 'digital',
  fileUrl: `https://r2.example.com/file${idx + 1}.zip`,
  previewUrl: `https://r2.example.com/preview${idx + 1}.mp4`,
  gallery: [
    `https://placehold.co/600x400?text=Preview+${idx + 1}`,
    `https://placehold.co/600x400?text=Preview+${idx + 1}+b`
  ],
  tags: ['premium', 'creator', 'bundle'],
  status: 'active',
  discount: idx % 2 === 0 ? { percentage: 15, start: new Date().toISOString(), end: new Date(Date.now() + 7 * 86400_000).toISOString() } : undefined,
  metrics: { views: 500 + idx * 30, likes: 120 + idx * 5, sales: 40 + idx * 3, rating: 4.6, reviews: 24 + idx },
  featured: idx % 3 === 0
}));

export const purchases: Purchase[] = Array.from({ length: 6 }).map((_, idx) => ({
  id: `purchase-${idx + 1}`,
  buyerId: users[(idx + 2) % users.length].id,
  sellerId: products[idx % products.length].sellerId,
  productId: products[idx % products.length].id,
  price: products[idx % products.length].price,
  createdAt: new Date(Date.now() - idx * 3600_000).toISOString()
}));

export const reviews: Review[] = Array.from({ length: 6 }).map((_, idx) => ({
  id: `review-${idx + 1}`,
  productId: products[idx % products.length].id,
  userId: users[(idx + 3) % users.length].id,
  rating: 4 + (idx % 2),
  comment: `Fantastic quality pack ${idx + 1}`,
  createdAt: new Date(Date.now() - idx * 6400_000).toISOString()
}));

export const tutorials: Tutorial[] = Array.from({ length: 6 }).map((_, idx) => ({
  id: `tutorial-${idx + 1}`,
  authorId: users[idx % users.length].id,
  title: `Cinematic editing ${idx + 1}`,
  description: 'Learn transitions, pacing, and color grading.',
  content: '# Cinematic magic\nDetailed steps with references.',
  category: ['video', 'audio', 'design'][idx % 3],
  thumbnail: `https://placehold.co/500x300?text=Tutorial+${idx + 1}`,
  difficulty: ['beginner', 'intermediate', 'advanced'][idx % 3] as Tutorial['difficulty'],
  estimatedTime: `${20 + idx} min`,
  tags: ['editing', 'workflow'],
  metrics: { views: 900 + idx * 80, likes: 120 + idx * 7 }
}));

export const subscriptionTiers: SubscriptionTier[] = Array.from({ length: 6 }).map((_, idx) => ({
  id: `tier-${idx + 1}`,
  creatorId: users[idx % users.length].id,
  title: `Supporter ${idx + 1}`,
  price: 5 + idx,
  benefits: ['Behind-the-scenes', 'Exclusive presets', 'Monthly Q&A']
}));

export const subscriptions: Subscription[] = Array.from({ length: 6 }).map((_, idx) => ({
  id: `sub-${idx + 1}`,
  tierId: subscriptionTiers[idx % subscriptionTiers.length].id,
  userId: users[(idx + 4) % users.length].id,
  createdAt: new Date(Date.now() - idx * 86400_000).toISOString()
}));

export const tips: Tip[] = Array.from({ length: 6 }).map((_, idx) => ({
  id: `tip-${idx + 1}`,
  fromUserId: users[(idx + 1) % users.length].id,
  toUserId: users[idx % users.length].id,
  amount: 3 + idx,
  reason: 'Loved your latest drop',
  createdAt: new Date(Date.now() - idx * 1000_000).toISOString()
}));

export const creatorAnalytics: CreatorAnalytics[] = Array.from({ length: 6 }).map((_, idx) => ({
  id: `analytics-${idx + 1}`,
  creatorId: users[idx % users.length].id,
  date: new Date(Date.now() - idx * 86400_000).toISOString().slice(0, 10),
  views: 1000 + idx * 120,
  likes: 200 + idx * 30,
  comments: 90 + idx * 10,
  followersGained: 20 + idx * 3,
  revenue: 300 + idx * 50,
  engagementRate: 0.12 + idx * 0.01
}));

export const jobs: Job[] = Array.from({ length: 6 }).map((_, idx) => ({
  id: `job-${idx + 1}`,
  posterId: users[idx % users.length].id,
  title: `Freelance project ${idx + 1}`,
  description: 'Looking for a creative collaborator for a short-term sprint.',
  category: ['translator', 'artist', 'game developer', 'designer', 'composer', 'developer'][idx % 6],
  budget: `$${500 + idx * 150}`,
  duration: `${2 + idx} weeks`,
  requirements: ['Portfolio', 'Availability', 'Communication'],
  tags: ['remote', 'paid', 'async'],
  status: idx % 2 === 0 ? 'open' : 'closed',
  views: 300 + idx * 20,
  applications: 10 + idx * 2
}));

export const openSourceProjects: OpenSourceProject[] = Array.from({ length: 6 }).map((_, idx) => ({
  id: `oss-${idx + 1}`,
  name: `Project ${idx + 1}`,
  description: 'Open-source dependency powering media experiences.',
  category: ['ui', 'api', 'devops'][idx % 3],
  projectUrl: 'https://example.com',
  githubUrl: 'https://github.com/example/repo',
  supportUrl: 'https://github.com/sponsors/example',
  logo: `https://placehold.co/100x100?text=OSS+${idx + 1}`,
  supporters: 120 + idx * 5
}));

export const creatorTools: CreatorTool[] = Array.from({ length: 6 }).map((_, idx) => ({
  id: `tool-${idx + 1}`,
  creatorId: users[idx % users.length].id,
  name: `Toolbox ${idx + 1}`,
  description: 'A tool used daily to optimize workflow.',
  category: ['editing', 'automation', 'design'][idx % 3],
  toolUrl: 'https://example.com/tool',
  affiliateLink: 'https://example.com/affiliate',
  logo: `https://placehold.co/120x120?text=Tool+${idx + 1}`,
  free: idx % 2 === 0,
  rating: 4.3
}));
