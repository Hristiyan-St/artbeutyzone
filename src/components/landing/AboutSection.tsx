
'use client';
import { motion } from 'framer-motion';
import type { LocaleContent } from '@/lib/types';

export function AboutSection({ t }: {t: LocaleContent}) {
  return (
    <section id="about" className="py-16 sm:py-24">
      <div className="container mx-auto">
        <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t.about.heading}</h2>
            <p className="mt-4 text-lg text-muted-foreground">{t.about.p1}</p>
            <p className="mt-4 text-muted-foreground">{t.about.p2}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
