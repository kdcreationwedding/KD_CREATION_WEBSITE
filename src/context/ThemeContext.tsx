import React, { createContext, useContext, useEffect, useState } from 'react';

export type Theme = 'dark' | 'offwhite';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'offwhite',
  toggleTheme: () => {},
  setTheme: () => {}
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    const saved = localStorage.getItem('kd_theme') as Theme;
    if (saved) return saved;
    // Auto system theme detection
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'offwhite'; // Default Off-White Mode
  });

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('kd_theme', newTheme);
  };

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'offwhite' : 'dark';
    setTheme(next);
  };

  // Sync class on document root
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'offwhite') {
      root.classList.remove('dark');
      root.classList.add('theme-offwhite');
    } else {
      root.classList.remove('theme-offwhite');
      root.classList.add('dark');
    }
  }, [theme]);

  // Listen to OS system color scheme preference changes automatically
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemChange = (e: MediaQueryListEvent) => {
      // Only auto-switch if user hasn't explicitly set a preference in localStorage
      if (!localStorage.getItem('kd_theme')) {
        setThemeState(e.matches ? 'dark' : 'offwhite');
      }
    };

    mediaQuery.addEventListener('change', handleSystemChange);
    return () => mediaQuery.removeEventListener('change', handleSystemChange);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
