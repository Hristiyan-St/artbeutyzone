'use client';

import type { Dispatch, SetStateAction } from 'react';
import { createContext, useState, useEffect } from 'react';

type Language = 'bg' | 'en' | 'ru';

interface LanguageContextType {
  language: Language;
  setLanguage: Dispatch<SetStateAction<Language>>;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('bg');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const storedLanguage = localStorage.getItem('language') as Language;
    if (storedLanguage && ['bg', 'en', 'ru'].includes(storedLanguage)) {
      setLanguage(storedLanguage);
    }
  }, []);

  useEffect(() => {
    if(isMounted) {
        localStorage.setItem('language', language);
    }
  }, [language, isMounted]);

  if (!isMounted) {
    return null;
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}
