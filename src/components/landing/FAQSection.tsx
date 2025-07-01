
'use client';

import type { LocaleContent } from '@/lib/types';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export function FAQSection({ t }: {t: LocaleContent}) {
    return (
        <section id="faq" className="py-16 sm:py-24">
            <div className="container mx-auto">
                <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t.faq.title}</h2>
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">{t.faq.subtitle}</p>
                </div>
                <Accordion type="single" collapsible className="w-full mt-12 max-w-3xl mx-auto">
                    {t.faq.items.map((item: any, index: number) => (
                        <AccordionItem value={`faq-${index}`} key={item.question}>
                            <AccordionTrigger>{item.question}</AccordionTrigger>
                            <AccordionContent>
                                {item.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    );
}
