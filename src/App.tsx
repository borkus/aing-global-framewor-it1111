import React from 'react';
import { Outlet } from 'react-router-dom';
import { AppHeader } from './components/layout/AppHeader';
import { AppFooter } from './components/layout/AppFooter';
import { AIAssistant } from './components/AIAssistant';
import { Toaster } from '@/components/ui/sonner';
export function App() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <AppHeader />
      <main className="flex-grow">
        <Outlet />
      </main>
      <AppFooter />
      <AIAssistant />
      <Toaster richColors />
    </div>
  );
}