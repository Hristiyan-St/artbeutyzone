
'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Sparkles, Droplets, ShieldCheck, Award, Package as PackageIcon, Gift } from 'lucide-react';
import type { Promotion, LocaleContent } from '@/lib/types';

const MotionCard = motion(Card);

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const promoIconComponents: Record<string, React.ElementType> = {
    Sparkles,
    Droplets,
    ShieldCheck,
    Award,
    Package: PackageIcon,
    Gift,
};

export function PromotionsSection({ t }: { t: LocaleContent }) {
    const promotionList = t.promotions.packages;

    return (
        <section id="promotions" className="bg-primary/5 py-16 sm:py-24">
            <div className="container mx-auto">
                <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t.promotions.title}</h2>
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">{t.promotions.subtitle}</p>
                </div>
                 <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {promotionList.length === 0 ? (
                         <p className="text-center text-muted-foreground col-span-full">{t.promotions.noPromotions}</p>
                    ) : (
                        promotionList.map((promo, index: number) => {
                            const Icon = promoIconComponents[promo.icon as keyof typeof promoIconComponents] || Gift;
                            return (
                                <MotionCard
                                    key={index}
                                    className="overflow-hidden flex flex-col"
                                    variants={cardVariants}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, amount: 0.3 }}
                                >
                                    <CardHeader className="items-center text-center">
                                        <Icon className="h-10 w-10 text-accent mb-2" />
                                        <CardTitle className="text-xl text-primary">{promo.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex-grow text-center">
                                        <p className="text-muted-foreground">{promo.description}</p>
                                    </CardContent>
                                    <CardFooter>
                                        <Button asChild className="w-full">
                                            <Link href="#contact">{promo.cta}</Link>
                                        </Button>
                                    </CardFooter>
                                </MotionCard>
                            )
                        })
                    )}
                </div>
            </div>
        </section>
    );
}
