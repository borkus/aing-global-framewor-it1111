// Assistant store removed – static build
import { create } from 'zustand';

const useAssistantStore = create(() => ({
  isOpen: false,
  messages: [] as never[],
  input: '',
  isLoading: false,
  streamingMessage: '',
  sessionId: null as string | null,
  toggleAssistant: () => {},
  setInput: (_: string) => {},
  sendMessage: async () => {},
  startNewSession: () => {},
}));

export default useAssistantStore;
