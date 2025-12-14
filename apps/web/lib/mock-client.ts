import {
  comments,
  conversations,
  creatorAnalytics,
  creatorTools,
  follows,
  jobs,
  likes,
  messages,
  openSourceProjects,
  playlistItems,
  playlists,
  posts,
  products,
  purchases,
  reviews,
  stories,
  subscriptionTiers,
  subscriptions,
  tips,
  tutorials,
  users
} from '@/data/sampleData';

const delay = (ms = 200) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchEntity<T>(data: T, ms = 150): Promise<T> {
  await delay(ms);
  return data;
}

export const api = {
  getFeed: () => fetchEntity({ posts, stories }),
  getExplore: () => fetchEntity(posts),
  getMarketplaceProducts: () => fetchEntity(products),
  getMarketplaceJobs: () => fetchEntity(jobs),
  getProductDetail: (id: string) => fetchEntity(products.find((p) => p.id === id)),
  getTutorials: () => fetchEntity(tutorials),
  getTutorialDetail: (id: string) => fetchEntity(tutorials.find((t) => t.id === id)),
  getMessages: () => fetchEntity(conversations),
  getChat: (id: string) => fetchEntity(messages.filter((m) => m.conversationId === id)),
  getProfile: (userId: string) => fetchEntity({ user: users.find((u) => u.id === userId), posts, products }),
  getLibrary: (userId: string) => fetchEntity(purchases.filter((p) => p.buyerId === userId)),
  getOpenSource: () => fetchEntity(openSourceProjects),
  getTools: () => fetchEntity(creatorTools),
  getDashboard: (userId: string) => fetchEntity({
    analytics: creatorAnalytics.filter((a) => a.creatorId === userId),
    products: products.filter((p) => p.sellerId === userId),
    subscriptions: subscriptions.filter((s) => subscriptionTiers.find((t) => t.id === s.tierId)?.creatorId === userId)
  })
};
