export type ConversationParticipant = {
  id: string;
  name: string;
  avatarUrl: string;
};

export type Conversation = {
  id: string;
  participants: ConversationParticipant[];
  lastMessagePreview: string;
  unreadCount: number;
  updatedAt: string;
};

export type MessageSender = {
  id: string;
  name: string;
};

export type Message = {
  id: string;
  conversationId: string;
  sender: MessageSender;
  body: string;
  createdAt: string;
  status: 'sent' | 'delivered' | 'read';
};

export type SendMessageInput = {
  conversationId: string;
  body: string;
};
