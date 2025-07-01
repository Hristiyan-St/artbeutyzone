
'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { submitContactForm } from '@/app/actions';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';

const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Името трябва да е поне 2 символа.' }),
  email: z.string().email({ message: 'Моля, въведете валиден имейл.' }),
  message: z.string().min(10, { message: 'Съобщението трябва да е поне 10 символа.' }),
});

export function ContactForm() {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    // In a real app, you would use a library like 'next-intl' for translations.
    const t = {
        contact: {
            title: 'Запазете час',
            subtitle: 'Имате въпроси или искате да запазите час? Попълнете формата и ще се свържем с вас.',
            namePlaceholder: 'Вашето име',
            emailPlaceholder: 'Вашият имейл',
            messagePlaceholder: 'Вашето съобщение',
            sendButton: 'Изпрати съобщение',
            successTitle: 'Съобщението е изпратено!',
            successDescription: 'Получихме съобщението ви и ще се свържем с вас скоро.',
        }
    }

    const form = useForm<z.infer<typeof contactFormSchema>>({
        resolver: zodResolver(contactFormSchema),
        defaultValues: {
            name: '',
            email: '',
            message: '',
        },
    });

    async function onSubmit(values: z.infer<typeof contactFormSchema>) {
        setIsSubmitting(true);
        const result = await submitContactForm(values);

        if (result.success) {
            toast({
                title: t.contact.successTitle,
                description: t.contact.successDescription,
            });
            form.reset();
        } else {
            console.error(result.error);
            toast({
                variant: 'destructive',
                title: 'Грешка',
                description: result.error || 'Неуспешно изпращане на съобщението. Моля, опитайте отново по-късно.',
            });
        }
        setIsSubmitting(false);
    }

    return (
        <div>
            <h3 className="text-lg font-semibold text-foreground">{t.contact.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{t.contact.subtitle}</p>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-4">
                <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel className="sr-only">{t.contact.namePlaceholder}</FormLabel>
                    <FormControl>
                        <Input placeholder={t.contact.namePlaceholder} {...field} autoComplete="name" />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel className="sr-only">{t.contact.emailPlaceholder}</FormLabel>
                    <FormControl>
                        <Input placeholder={t.contact.emailPlaceholder} {...field} autoComplete="email" />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel className="sr-only">{t.contact.messagePlaceholder}</FormLabel>
                    <FormControl>
                        <Textarea placeholder={t.contact.messagePlaceholder} {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {t.contact.sendButton}
                </Button>
            </form>
            </Form>
        </div>
    )
}
