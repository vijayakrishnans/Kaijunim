import { DetailResponse, PaginatedResponse, fetchJson } from '../client';
import { Conversation, Message, SendMessageInput } from '../types/messages';

export const fetchConversations = () =>
  fetchJson<PaginatedResponse<Conversation>>('/api/v1/conversations');

export const fetchMessages = (conversationId: string) =>
  fetchJson<PaginatedResponse<Message>>(`/api/v1/conversations/${conversationId}/messages`);

export const postMessage = (input: SendMessageInput) =>
  fetchJson<DetailResponse<Message>>('/api/v1/messages', {
    method: 'POST',
    body: JSON.stringify({
      conversationId: input.conversationId,
      body: input.body
    })
  });
