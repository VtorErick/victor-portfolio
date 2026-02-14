import { useState, useCallback, useLayoutEffect } from 'react';

type Theme = 'light' | 'dark';

function getPreferredTheme(): Theme {
  if (typeof window === 'undefined') return 'dark';
  
  const stored = window.localStorage.getItem('theme') as Theme | null;
  if (stored === 'light' || stored === 'dark') return stored;
  
  const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
  return prefersDark ? 'dark' : 'light';
}

export function useTheme() {
  // Initialize with preferred theme to match server-side default
  // This prevents hydration mismatch
  const [theme, setTheme] = useState<Theme>(getPreferredTheme());
  const mounted = typeof window !== 'undefined';

  // Use useLayoutEffect to set theme before paint
  useLayoutEffect(() => {
    const initial = getPreferredTheme();
    document.documentElement.setAttribute('data-theme', initial);
  }, []);

  const toggleTheme = useCallback(() => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    
    try {
      window.localStorage.setItem('theme', next);
    } catch (error) {
      console.error('Failed to save theme preference:', error);
    }
  }, [theme]);

  return { theme, toggleTheme, mounted };
}
