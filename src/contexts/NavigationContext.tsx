import { createContext, useContext, useState, useCallback } from 'react';
import type { View } from '@/types';

interface NavigationContextType {
  currentView: View;
  navigateTo: (view: View) => void;
  viewParams: Record<string, unknown>;
  setViewParams: (params: Record<string, unknown>) => void;
  navigateToAlbum: (albumId: string) => void;
  navigateToArtist: (artistId: string) => void;
  navigateToSearch: (query: string) => void;
  history: View[];
  goBack: () => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const [currentView, setCurrentView] = useState<View>('home');
  const [viewParams, setViewParamsState] = useState<Record<string, unknown>>({});
  const [history, setHistory] = useState<View[]>(['home']);

  const navigateTo = useCallback((view: View) => {
    setCurrentView(view);
    setHistory(prev => [...prev, view]);
  }, []);

  const setViewParams = useCallback((params: Record<string, unknown>) => {
    setViewParamsState(params);
  }, []);

  const navigateToAlbum = useCallback((albumId: string) => {
    setViewParamsState({ albumId });
    setCurrentView('album');
    setHistory(prev => [...prev, 'album']);
  }, []);

  const navigateToArtist = useCallback((artistId: string) => {
    setViewParamsState({ artistId });
    setCurrentView('artist');
    setHistory(prev => [...prev, 'artist']);
  }, []);

  const navigateToSearch = useCallback((query: string) => {
    setViewParamsState({ query });
    setCurrentView('search');
    setHistory(prev => [...prev, 'search']);
  }, []);

  const goBack = useCallback(() => {
    setHistory(prev => {
      if (prev.length > 1) {
        const newHistory = prev.slice(0, -1);
        setCurrentView(newHistory[newHistory.length - 1]);
        return newHistory;
      }
      return prev;
    });
  }, []);

  return (
    <NavigationContext.Provider
      value={{
        currentView,
        navigateTo,
        viewParams,
        setViewParams,
        navigateToAlbum,
        navigateToArtist,
        navigateToSearch,
        history,
        goBack,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
}
