
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { LocaleContent } from '@/lib/types';
import { Button } from '@/components/ui/button';

export function HeroSection({ t }: { t: LocaleContent }) {
  return (
    <section className="relative h-[80vh] min-h-[600px] w-full">
      <Image
        src={t.hero.imageUrl}
        alt="Luxurious interior of Art Beauty Zone salon"
        data-ai-hint="luxury salon"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-background/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-8">
        <div className="container mx-auto flex items-end justify-between">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.4 }}>
            <Button asChild size="lg">
              <Link href="#services">{t.hero.secondaryCta}</Link>
            </Button>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.4 }}>
            <Button asChild variant="outline" size="lg">
              <Link href="#contact">{t.hero.primaryCta}</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
