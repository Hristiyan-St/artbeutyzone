
'use client';

import { motion } from 'framer-motion';
import type { LocaleContent } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Phone, MapPin, Mail } from 'lucide-react';

export function LocationSection({ t }: {t: LocaleContent}) {
  const mapUrl = "https://maps.google.com/maps?q=General%20Stolipin%2022,%20Varna,%20Bulgaria&t=&z=15&ie=UTF8&iwloc=&output=embed";

  return (
    <section id="location" className="bg-primary/5 py-16 sm:py-24">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t.location.title}</h2>
            <p className="mt-4 text-lg text-muted-foreground">{t.location.subtitle}</p>
            <div className="mt-8 space-y-4 text-muted-foreground">
              <div className="flex items-center gap-4">
                <MapPin className="h-6 w-6 text-primary" />
                <span>{t.location.address}</span>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="h-6 w-6 text-primary" />
                <span>{t.location.phone}</span>
              </div>
              <div className="flex items-center gap-4">
                <Mail className="h-6 w-6 text-primary" />
                <span>{t.location.email}</span>
              </div>
            </div>
            <Button asChild className="mt-8">
                <a href="https://www.google.com/maps/search/?api=1&query=General+Stolipin+22,+Varna,+Bulgaria" target="_blank" rel="noopener noreferrer">{t.location.openInMaps}</a>
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="overflow-hidden rounded-lg shadow-xl aspect-[4/3]"
          >
            <iframe
                src={mapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
