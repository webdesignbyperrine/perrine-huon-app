'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  // Charger le thème depuis localStorage au montage
  // Light mode par défaut pour les nouveaux utilisateurs
  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    
    if (savedTheme) {
      // Utiliser le thème sauvegardé si l'utilisateur en a choisi un
      setThemeState(savedTheme);
    } else {
      // Light mode par défaut pour les nouveaux utilisateurs
      setThemeState('light');
    }
  }, []);

  // Appliquer le thème sur le document
  useEffect(() => {
    if (!mounted) return;
    
    const root = document.documentElement;
    
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    localStorage.setItem('theme', theme);
  }, [theme, mounted]);

  const toggleTheme = () => {
    setThemeState(prev => prev === 'light' ? 'dark' : 'light');
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    // Retourner des valeurs par défaut si utilisé en dehors du provider (SSR)
    return {
      theme: 'light' as Theme,
      toggleTheme: () => {},
      setTheme: () => {},
    };
  }
  return context;
}
