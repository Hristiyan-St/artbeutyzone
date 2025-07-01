
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Loader2, ArrowLeft } from 'lucide-react';
import type { StaffMember, WorkingHours } from '@/lib/types';
import { getStaffMember } from '@/services/staffService';
import { Switch } from '@/components/ui/switch';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { saveAppointment } from '@/app/actions'; // We will create a new action for staff

const workingHoursSchema = z.object({
    start: z.string(),
    end: z.string(),
    enabled: z.boolean(),
});

const formSchema = z.object({
  name: z.string().min(2, { message: 'Името трябва да е поне 2 символа.' }),
  position: z.string().min(2, { message: 'Длъжността трябва да е поне 2 символа.' }),
  email: z.string().email({ message: 'Моля, въведете валиден имейл.' }),
  phone: z.string().min(10, { message: 'Телефонният номер трябва да е поне 10 цифри.' }),
  workingHours: z.object({
      monday: workingHoursSchema,
      tuesday: workingHoursSchema,
      wednesday: workingHoursSchema,
      thursday: workingHoursSchema,
      friday: workingHoursSchema,
      saturday: workingHoursSchema,
      sunday: workingHoursSchema,
  })
});

const defaultWorkingHours: WorkingHours = {
    monday: { start: '09:00', end: '18:00', enabled: true },
    tuesday: { start: '09:00', end: '18:00', enabled: true },
    wednesday: { start: '09:00', end: '18:00', enabled: true },
    thursday: { start: '09:00', end: '18:00', enabled: true },
    friday: { start: '09:00', end: '18:00', enabled: true },
    saturday: { start: '10:00', end: '16:00', enabled: false },
    sunday: { start: '10:00', end: '16:00', enabled: false },
};

const weekDays: {key: keyof typeof defaultWorkingHours, label: string}[] = [
    { key: 'monday', label: 'Понеделник'},
    { key: 'tuesday', label: 'Вторник'},
    { key: 'wednesday', label: 'Сряда'},
    { key: 'thursday', label: 'Четвъртък'},
    { key: 'friday', label: 'Петък'},
    { key: 'saturday', label: 'Събота'},
    { key: 'sunday', label: 'Неделя'},
];


export default function StaffFormPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;
    const isNew = id === 'new';

    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isFetching, setIsFetching] = useState(!isNew);
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            position: '',
            email: '',
            phone: '',
            workingHours: defaultWorkingHours,
        },
    });

    useEffect(() => {
      if (isNew) return;

      const fetchStaffMember = async () => {
        setIsFetching(true);
        try {
          const staffMember = await getStaffMember(id);
          if (staffMember) {
            form.reset({
                name: staffMember.name,
                position: staffMember.position,
                email: staffMember.email,
                phone: staffMember.phone,
                workingHours: { ...defaultWorkingHours, ...staffMember.workingHours },
            });
          } else {
            toast({
              variant: 'destructive',
              title: 'Грешка',
              description: 'Служителят не е намерен.',
            });
            router.push('/dashboard/staff');
          }
        } catch (error) {
           toast({
              variant: 'destructive',
              title: 'Грешка при зареждане',
              description: 'Неуспешно зареждане на данните за служителя.',
            });
            router.push('/dashboard/staff');
        } finally {
            setIsFetching(false);
        }
      };
      
      fetchStaffMember();
    }, [id, isNew, form, router, toast]);
    

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true);
        toast({
            title: 'Функцията се разработва',
            description: 'Запазването на служители ще бъде достъпно скоро.',
        });
        setIsSubmitting(false);
        // Here you would call a server action e.g. await saveStaffMember({id: isNew ? undefined : id, ...values});
    }
    
    if (isFetching) {
        return (
            <div className="space-y-4 p-4">
                <div className="flex items-center gap-4 mb-4">
                    <Button type="button" variant="outline" size="icon" className="h-7 w-7" asChild>
                        <Link href="/dashboard/staff">
                            <ArrowLeft className="h-4 w-4" />
                            <span className="sr-only">Назад</span>
                        </Link>
                    </Button>
                    <Skeleton className="h-6 w-48" />
                </div>
                <Card>
                    <CardHeader>
                        <Skeleton className="h-6 w-1/3" />
                        <Skeleton className="h-4 w-2/3" />
                    </CardHeader>
                    <CardContent className="space-y-6 pt-6">
                        <div className="space-y-2">
                           <Skeleton className="h-4 w-1/4" />
                           <Skeleton className="h-10 w-full" />
                        </div>
                         <div className="space-y-2">
                           <Skeleton className="h-4 w-1/4" />
                           <Skeleton className="h-10 w-full" />
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }
    
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex items-center gap-4 mb-4">
                    <Button type="button" variant="outline" size="icon" className="h-7 w-7" asChild>
                        <Link href="/dashboard/staff">
                            <ArrowLeft className="h-4 w-4" />
                            <span className="sr-only">Назад</span>
                        </Link>
                    </Button>
                    <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                        {isNew ? 'Добавяне на служител' : `Редактиране: ${form.watch('name') || ''}`}
                    </h1>
                    <div className="hidden items-center gap-2 md:ml-auto md:flex">
                        <Button type="button" variant="outline" size="sm" asChild>
                             <Link href="/dashboard/staff">Отказ</Link>
                        </Button>
                        <Button type="submit" size="sm" disabled={isSubmitting}>
                            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Запази
                        </Button>
                    </div>
                </div>

                 <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                   <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                     <Card>
                        <CardHeader>
                            <CardTitle>Информация за служителя</CardTitle>
                            <CardDescription>Попълнете основните данни за служителя.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-6">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel>Име</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Иван Иванов" {...field} disabled={isSubmitting} autoComplete="name" />
                                        </FormControl>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="position"
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel>Длъжност</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Напр. Козметик" {...field} disabled={isSubmitting} />
                                        </FormControl>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                            <FormLabel>Имейл</FormLabel>
                                            <FormControl>
                                                <Input type="email" placeholder="email@example.com" {...field} disabled={isSubmitting} autoComplete="email" />
                                            </FormControl>
                                            <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="phone"
                                        render={({ field }) => (
                                            <FormItem>
                                            <FormLabel>Телефон</FormLabel>
                                            <FormControl>
                                                <Input placeholder="0888123456" {...field} disabled={isSubmitting} autoComplete="tel" />
                                            </FormControl>
                                            <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                   </div>
                   <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                        <Card>
                            <CardHeader>
                                <CardTitle>Работно време</CardTitle>
                                <CardDescription>Настройте стандартното работно време.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {weekDays.map(day => {
                                        const fieldName = `workingHours.${day.key}` as const;
                                        const isEnabled = form.watch(`${fieldName}.enabled`);
                                        return (
                                        <div key={day.key} className="grid grid-cols-[1fr_auto] items-center gap-4">
                                            <div>
                                                <FormLabel className={cn("text-sm font-normal", !isEnabled && "text-muted-foreground")}>{day.label}</FormLabel>
                                                <div className="grid grid-cols-2 gap-2 mt-1">
                                                    <FormField
                                                        control={form.control}
                                                        name={`${fieldName}.start`}
                                                        render={({ field }) => (
                                                        <FormItem>
                                                            <FormControl>
                                                            <Input type="time" {...field} disabled={isSubmitting || !isEnabled} />
                                                            </FormControl>
                                                        </FormItem>
                                                        )}
                                                    />
                                                    <FormField
                                                        control={form.control}
                                                        name={`${fieldName}.end`}
                                                        render={({ field }) => (
                                                        <FormItem>
                                                            <FormControl>
                                                            <Input type="time" {...field} disabled={isSubmitting || !isEnabled} />
                                                            </FormControl>
                                                        </FormItem>
                                                        )}
                                                    />
                                                </div>
                                            </div>

                                            <FormField
                                                control={form.control}
                                                name={`${fieldName}.enabled`}
                                                render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                    <Switch checked={field.value} onCheckedChange={field.onChange} disabled={isSubmitting} />
                                                    </FormControl>
                                                </FormItem>
                                                )}
                                            />
                                        </div>
                                        );
                                    })}
                                </div>
                            </CardContent>
                        </Card>
                   </div>
                 </div>
                
                 <div className="mt-4 flex items-center justify-end gap-2 md:hidden">
                    <Button type="button" variant="outline" size="sm" asChild>
                        <Link href="/dashboard/staff">Отказ</Link>
                    </Button>
                    <Button type="submit" size="sm" disabled={isSubmitting}>
                        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Запази
                    </Button>
                </div>
            </form>
        </Form>
    );
}
