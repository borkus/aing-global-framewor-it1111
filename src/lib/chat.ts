// Chat service removed – static build
export const MODELS: { id: string; name: string }[] = [];
export const chatService = {
  getSessionId: () => '',
  newSession: () => {},
  sendMessage: async () => ({ success: false }),
  getMessages: async () => ({ success: false }),
  clearMessages: async () => ({ success: false }),
};
export const formatTime = (_ts: number) => '';
export const generateSessionTitle = () => '';
export const renderToolCall = () => '';
