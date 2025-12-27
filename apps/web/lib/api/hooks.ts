import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchJobs, fetchJob } from './queries/jobs';
import { fetchProducts, fetchProduct } from './queries/products';
import { fetchProfile } from './queries/profile';
import { fetchTutorials, fetchTutorial } from './queries/tutorials';
import { fetchConversations, fetchMessages, postMessage } from './queries/messages';
import { SendMessageInput } from './types/messages';

export const useProducts = () =>
  useQuery({ queryKey: ['products'], queryFn: fetchProducts });

export const useProduct = (id?: string) =>
  useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProduct(id || ''),
    enabled: Boolean(id)
  });

export const useJobs = () => useQuery({ queryKey: ['jobs'], queryFn: fetchJobs });

export const useJob = (id?: string) =>
  useQuery({
    queryKey: ['job', id],
    queryFn: () => fetchJob(id || ''),
    enabled: Boolean(id)
  });

export const useTutorials = () =>
  useQuery({ queryKey: ['tutorials'], queryFn: fetchTutorials });

export const useTutorial = (id?: string) =>
  useQuery({
    queryKey: ['tutorial', id],
    queryFn: () => fetchTutorial(id || ''),
    enabled: Boolean(id)
  });

export const useProfile = (id?: string) =>
  useQuery({
    queryKey: ['profile', id],
    queryFn: () => fetchProfile(id || ''),
    enabled: Boolean(id)
  });

export const useConversations = () =>
  useQuery({ queryKey: ['conversations'], queryFn: fetchConversations });

export const useMessages = (conversationId?: string) =>
  useQuery({
    queryKey: ['messages', conversationId],
    queryFn: () => fetchMessages(conversationId || ''),
    enabled: Boolean(conversationId)
  });

export const useSendMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: SendMessageInput) => postMessage(input),
    onSuccess: (response) => {
      const conversationId = response.item.conversationId;
      queryClient.invalidateQueries({ queryKey: ['messages', conversationId] });
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
    }
  });
};
