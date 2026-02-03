import { useEffect, useState, useCallback } from 'react';

type Theme = 'light' | 'dark';

function getPreferredTheme(): Theme {
  if (typeof window === 'undefined') return 'light';
  
  const stored = window.localStorage.getItem('theme') as Theme | null;
  if (stored === 'light' || stored === 'dark') return stored;
  
  const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
  return prefersDark ? 'dark' : 'light';
}

export function useTheme() {
  // Initialize with 'light' to match server-side default
  // This prevents hydration mismatch
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Get the actual preference after mount
    const initial = getPreferredTheme();
    // Only update if it's different from the default
    if (initial !== 'light') {
      setTheme(initial);
      document.documentElement.setAttribute('data-theme', initial);
    } else {
      // Ensure attribute is set even if theme matches
      document.documentElement.setAttribute('data-theme', 'light');
    }
    setMounted(true);
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
