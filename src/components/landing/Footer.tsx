
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram } from 'lucide-react';
import type { NavLink, LocaleContent } from '@/lib/types';

export function Footer({ t }: { t: LocaleContent }) {
    const socialLinks = [
      { name: 'Facebook', href: 'https://www.facebook.com/share/1EgPAVTrsZ/', icon: Facebook },
      { name: 'Instagram', href: 'https://www.instagram.com/artbeautyzone.varna/', icon: Instagram },
    ];
  return (
    <footer id="contact" className="bg-primary/5 border-t">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          <div className="space-y-4 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="https://firebasestorage.googleapis.com/v0/b/artbeautyzonesalon.firebasestorage.app/o/firebase_icon_28x28.png?alt=media&token=567ced69-ffb1-4297-8e04-ef56db8843b9"
                alt="Art Beauty Zone Logo"
                width={36}
                height={36}
                className="h-9 w-9"
              />
              <span className="text-xl font-bold">Art Beauty Zone</span>
            </Link>
            <p className="text-muted-foreground">{t.footer.sanctuary}</p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <Link key={social.name} href={social.href} className="text-muted-foreground hover:text-primary">
                  <social.icon className="h-6 w-6" />
                  <span className="sr-only">{social.name}</span>
                </Link>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-2">
            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">{t.contact.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                    За въпроси и резервации, моля, свържете се с нас на телефон:
                    <a href="tel:+359877701929" className="block font-bold text-primary mt-2 text-lg hover:underline">
                        +359 87 770 1929
                    </a>
                </p>
                 <p className="mt-2 text-sm text-muted-foreground">
                    или на имейл:
                    <a href="mailto:artbeautyzonevarna@gmail.com" className="block font-bold text-primary mt-1 text-lg hover:underline">
                       artbeautyzonevarna@gmail.com
                    </a>
                </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">{t.footer.quickLinks}</h3>
              <ul className="space-y-2">
                {t.navLinks.map((link: NavLink) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Art Beauty Zone. {t.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
