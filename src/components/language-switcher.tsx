'use client';

import { useLanguage } from '@/hooks/use-language';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Globe } from 'lucide-react';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Globe className="h-5 w-5" />
          <span className="sr-only">Change language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setLanguage('bg')} disabled={language === 'bg'}>
          🇧🇬 Български
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('en')} disabled={language === 'en'}>
          🇬🇧 English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('ru')} disabled={language === 'ru'}>
          🇷🇺 Русский
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
