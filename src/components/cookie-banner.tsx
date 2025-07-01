'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Cookie } from 'lucide-react';

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('cookie_consent');
      if (consent !== 'true') {
        setIsVisible(true);
      }
    } catch (error) {
      console.error('Could not access local storage:', error);
    }
  }, []);

  const acceptCookies = () => {
    try {
      localStorage.setItem('cookie_consent', 'true');
      setIsVisible(false);
    } catch (error) {
      console.error('Could not set item in local storage:', error);
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 animate-slide-in-from-bottom-full">
      <div className="container mx-auto px-4 py-2 sm:py-0">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-t-lg border-t border-x border-border bg-background/80 p-4 shadow-2xl backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <Cookie className="h-6 w-6 text-primary" />
            <p className="text-sm text-foreground">
              We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.
            </p>
          </div>
          <Button onClick={acceptCookies} size="sm" className="shrink-0">
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
}
