
'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import type { LocaleContent } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const MotionCard = motion(Card);

export function GallerySection({ t }: {t: LocaleContent}) {
  return (
    <section id="gallery" className="bg-primary/5 py-16 sm:py-24">
      <div className="container mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t.gallery.title}</h2>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {t.gallery.images.map((image: any, index: number) => (
            <MotionCard
              key={image.id}
              className="overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="aspect-video relative">
                <Image
                  src={image.src}
                  alt={image.alt}
                  data-ai-hint={image.hint}
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle>{image.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{image.description}</p>
              </CardContent>
            </MotionCard>
          ))}
        </div>
      </div>
    </section>
  );
}
