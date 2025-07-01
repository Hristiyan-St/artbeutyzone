
'use client';
import { Sparkles } from 'lucide-react';
import { LaserIcon, LpgIcon, RadioFrequencyIcon, CuppingIcon, PhysioIcon, MaderoTherapyIcon } from '@/components/icons';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import type { LocaleContent, ServiceCategory } from '@/lib/types';

interface ServicesSectionProps {
  t: LocaleContent;
}

export function ServicesSection({ t }: ServicesSectionProps) {
  const getCategoryIcon = (categoryName: string): React.ElementType => {
    if (categoryName.includes('Лазерна епилация')) return LaserIcon;
    if (categoryName.includes('LPG')) return LpgIcon;
    if (categoryName.includes('Радиочестотен')) return RadioFrequencyIcon;
    if (categoryName.includes('Вендузо')) return CuppingIcon;
    if (categoryName.includes('Физиотерапия')) return PhysioIcon;
    if (categoryName.includes('Мадеротерапия')) return MaderoTherapyIcon;
    return Sparkles;
  };
  
  const serviceCategories: ServiceCategory[] = t.services.categories || [];

  return (
    <section id="services" className="py-16 sm:py-24">
      <div className="container mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t.services.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            {t.services.subtitle}
          </p>
        </div>
        
        <Accordion type="single" collapsible className="w-full mt-12 max-w-4xl mx-auto">
          {serviceCategories.length > 0 ? (
            serviceCategories.map((category) => {
              const Icon = getCategoryIcon(category.category);
              return (
                <AccordionItem value={category.category} key={category.category}>
                  <AccordionTrigger className="text-xl font-semibold hover:no-underline">
                    <div className="flex items-center gap-3">
                      <Icon className="h-6 w-6 text-primary" />
                      {category.category}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="divide-y divide-border">
                      {category.items.map((item, index) => {
                        if (item.prices) {
                          return item.prices.map((priceOption, priceIndex) => (
                            <div key={`${index}-${priceIndex}`} className="grid grid-cols-[2fr,1fr,auto] items-center gap-4 py-3 text-sm last:pb-0">
                              <span>{priceOption.type.replace(/\s\d+[-–]?\d*\s*минути/, '')}</span>
                              <span className="text-center text-muted-foreground">{priceOption.type.match(/(\d+[-–]?\d*\s*минути)/)?.[0]}</span>
                              <span className="font-medium text-primary text-right">{priceOption.price} лв.</span>
                            </div>
                          ));
                        }
                        return (
                          <div key={index} className="grid grid-cols-[2fr,1fr,auto] items-center gap-4 py-3 text-sm last:pb-0">
                            <span>{item.name}</span>
                            <span className="text-center text-muted-foreground">{item.description?.match(/(\d+[-–]?\d*\s*минути)/)?.[0]}</span>
                            <span className="font-medium text-primary text-right">{item.price} лв.</span>
                          </div>
                        );
                      })}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })
          ) : (
            <p className="text-center text-muted-foreground mt-12">В момента няма налични процедури. Моля, проверете по-късно.</p>
          )}
        </Accordion>
      </div>
    </section>
  );
}
