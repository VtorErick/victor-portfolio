import { useEffect, useState, useCallback } from 'react';
import type { Language } from '@/types/language';

function getPreferredLanguage(): Language {
  if (typeof window === 'undefined') return 'es';
  
  // Check localStorage first (user's explicit choice)
  const stored = window.localStorage.getItem('language') as Language | null;
  if (stored === 'es' || stored === 'en') return stored;
  
  // Default to Spanish (not browser language)
  // Users can change it manually if they prefer English
  return 'es';
}

export function useLanguage() {
  const [language, setLanguage] = useState<Language>('es');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const initial = getPreferredLanguage();
    setLanguage(initial);
    document.documentElement.setAttribute('lang', initial);
    setMounted(true);
  }, []);

  const toggleLanguage = useCallback(() => {
    const next = language === 'es' ? 'en' : 'es';
    setLanguage(next);
    document.documentElement.setAttribute('lang', next);
    
    try {
      window.localStorage.setItem('language', next);
    } catch (error) {
      console.error('Failed to save language preference:', error);
    }
  }, [language]);

  const setLanguageDirectly = useCallback((lang: Language) => {
    setLanguage(lang);
    document.documentElement.setAttribute('lang', lang);
    
    try {
      window.localStorage.setItem('language', lang);
    } catch (error) {
      console.error('Failed to save language preference:', error);
    }
  }, []);

  return { language, toggleLanguage, setLanguage: setLanguageDirectly, mounted };
}
