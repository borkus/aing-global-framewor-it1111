import { create } from 'zustand';
import { chatService } from '@/lib/chat';
import type { Message } from '../../worker/types';
interface AssistantState {
  isOpen: boolean;
  messages: Message[];
  input: string;
  isLoading: boolean;
  streamingMessage: string;
  sessionId: string | null;
}
interface AssistantActions {
  toggleAssistant: () => void;
  setInput: (input: string) => void;
  sendMessage: () => Promise<void>;
  startNewSession: () => void;
}
const useAssistantStore = create<AssistantState & AssistantActions>((set, get) => ({
  isOpen: false,
  messages: [],
  input: '',
  isLoading: false,
  streamingMessage: '',
  sessionId: null,
  toggleAssistant: () => {
    const wasOpen = get().isOpen;
    set({ isOpen: !wasOpen });
    if (!wasOpen) {
      get().startNewSession();
    }
  },
  setInput: (input: string) => {
    set({ input });
  },
  startNewSession: () => {
    chatService.newSession();
    set({
      messages: [],
      streamingMessage: '',
      sessionId: chatService.getSessionId(),
      input: '',
      isLoading: false,
    });
  },
  sendMessage: async () => {
    const { input, messages, sessionId } = get();
    if (!input.trim() || get().isLoading) return;
    const messageContent = input.trim();
    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: messageContent,
      timestamp: Date.now(),
    };
    set(state => ({
      messages: [...state.messages, userMessage],
      input: '',
      isLoading: true,
      streamingMessage: '',
    }));
    try {
      await chatService.sendMessage(messageContent, undefined, (chunk) => {
        set(state => ({
          streamingMessage: state.streamingMessage + chunk,
        }));
      });
      // After streaming, fetch the final state which includes tool calls
      const response = await chatService.getMessages();
      if (response.success && response.data) {
        set({ messages: response.data.messages });
      }
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: "Sorry, I encountered an error. Please try again.",
        timestamp: Date.now(),
      };
      set(state => ({ messages: [...state.messages, errorMessage] }));
    } finally {
      set({ isLoading: false, streamingMessage: '' });
    }
  },
}));
export default useAssistantStore;