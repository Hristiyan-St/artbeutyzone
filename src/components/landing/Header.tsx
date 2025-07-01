
'use client';
import Link from 'next/link';
import Image from 'next/image';
import type { NavLink, LocaleContent } from '@/lib/types';
import { MobileNav } from '@/components/MobileNav';
import { LanguageSwitcher } from '@/components/language-switcher';

export function Header({ t }: {t: LocaleContent}) {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="https://firebasestorage.googleapis.com/v0/b/artbeautyzonesalon.firebasestorage.app/o/firebase_icon_28x28.png?alt=media&token=567ced69-ffb1-4297-8e04-ef56db8843b9"
            alt="Art Beauty Zone Logo"
            width={36}
            height={36}
            className="h-9 w-9"
          />
          <span className="text-xl font-bold tracking-tight text-foreground">
            Art Beauty Zone
          </span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {t.navLinks.map((link: NavLink) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <MobileNav navLinks={t.navLinks} />
        </div>
      </div>
    </header>
  );
}
