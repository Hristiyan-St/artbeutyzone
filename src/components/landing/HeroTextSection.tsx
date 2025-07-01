
'use client';

import { motion } from 'framer-motion';
import type { LocaleContent } from '@/lib/types';

export function HeroTextSection({ t }: {t: LocaleContent}) {
  return (
    <section className="bg-background py-16 sm:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto text-center"
      >
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
          {t.hero.title}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-foreground/80 md:text-xl">
          {t.hero.subtitle}
        </p>
      </motion.div>
    </section>
  );
}
