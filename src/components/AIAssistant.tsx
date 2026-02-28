import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, X, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import useAssistantStore from '@/stores/assistantStore';
import { cn } from '@/lib/utils';
export function AIAssistant() {
  const isOpen = useAssistantStore(s => s.isOpen);
  const messages = useAssistantStore(s => s.messages);
  const input = useAssistantStore(s => s.input);
  const isLoading = useAssistantStore(s => s.isLoading);
  const streamingMessage = useAssistantStore(s => s.streamingMessage);
  const toggleAssistant = useAssistantStore(s => s.toggleAssistant);
  const setInput = useAssistantStore(s => s.setInput);
  const sendMessage = useAssistantStore(s => s.sendMessage);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector('div');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [messages, streamingMessage]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage();
  };
  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.5, type: 'spring', stiffness: 260, damping: 20 }}
        >
          <Button
            size="lg"
            className="rounded-full w-16 h-16 bg-indigo-600 hover:bg-indigo-700 shadow-lg hover:shadow-xl transition-all"
            onClick={toggleAssistant}
            aria-label="Open AI Assistant"
          >
            <Sparkles className="h-8 w-8 text-white" />
          </Button>
        </motion.div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed bottom-0 right-0 sm:bottom-6 sm:right-6 w-full h-full sm:w-[400px] sm:h-[600px] bg-background border border-border rounded-lg shadow-2xl z-50 flex flex-col"
          >
            <header className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-2">
                <Bot className="h-6 w-6 text-indigo-600" />
                <h3 className="font-semibold text-lg">AING Assistant</h3>
              </div>
              <Button variant="ghost" size="icon" onClick={toggleAssistant} aria-label="Close AI Assistant">
                <X className="h-5 w-5" />
              </Button>
            </header>
            <ScrollArea className="flex-1" ref={scrollAreaRef}>
              <div className="p-4 space-y-4">
                {messages.length === 0 && (
                  <div className="text-center text-muted-foreground py-8">
                    <Bot className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Ask me anything about the AING™ Framework.</p>
                  </div>
                )}
                {messages.map((msg) => (
                  <div key={msg.id} className={cn("flex", msg.role === 'user' ? 'justify-end' : 'justify-start')}>
                    <div className={cn("max-w-[80%] p-3 rounded-2xl", msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted')}>
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                    </div>
                  </div>
                ))}
                {streamingMessage && (
                  <div className="flex justify-start">
                    <div className="bg-muted p-3 rounded-2xl max-w-[80%]">
                      <p className="whitespace-pre-wrap">{streamingMessage}<span className="animate-pulse">|</span></p>
                    </div>
                  </div>
                )}
                {isLoading && !streamingMessage && (
                  <div className="flex justify-start">
                    <div className="bg-muted p-3 rounded-2xl">
                      <div className="flex space-x-1">
                        {[0, 1, 2].map(i => <div key={i} className="w-2 h-2 bg-current rounded-full animate-pulse" style={{ animationDelay: `${i * 100}ms` }} />)}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
            <form onSubmit={handleSubmit} className="p-4 border-t">
              <div className="flex gap-2 items-center">
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) handleSubmit(e); }}
                  placeholder="Ask AING..."
                  className="flex-1 resize-none"
                  rows={1}
                  disabled={isLoading}
                />
                <Button type="submit" disabled={!input.trim() || isLoading}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}