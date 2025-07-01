
'use client';
import { useLanguage } from '@/hooks/use-language';
import { locales } from '@/lib/data';
import { Header } from '@/components/landing/Header';
import { HeroSection } from '@/components/landing/HeroSection';
import { HeroTextSection } from '@/components/landing/HeroTextSection';
import { ServicesSection } from '@/components/landing/ServicesSection';
import { PromotionsSection } from '@/components/landing/PromotionsSection';
import { AboutSection } from '@/components/landing/AboutSection';
import { GallerySection } from '@/components/landing/GallerySection';
import { LocationSection } from '@/components/landing/LocationSection';
import { FAQSection } from '@/components/landing/FAQSection';
import { Footer } from '@/components/landing/Footer';
import { CallButton } from '@/components/landing/CallButton';
import { CookieBanner } from '@/components/cookie-banner';

export default function HomePage() {
  const { language } = useLanguage();
  const t = locales[language] || locales.bg;

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header t={t} />
      <main className="flex-1">
        <HeroSection t={t}/>
        <HeroTextSection t={t}/>
        <ServicesSection t={t} />
        <PromotionsSection t={t} />
        <AboutSection t={t}/>
        <GallerySection t={t}/>
        <LocationSection t={t}/>
        <FAQSection t={t}/>
      </main>
      <Footer t={t}/>
      <CookieBanner />
      <CallButton />
    </div>
  );
}
