
'use client';

import { useState, useMemo, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import { bg } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";
import { useToast } from '@/hooks/use-toast';
import { Loader2, Check, ChevronsUpDown } from 'lucide-react';
import type { StaffMember, FirestoreUser, Procedure } from '@/lib/types';
import { saveAppointment } from '@/app/actions';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';

const appointmentSchema = z.object({
  clientType: z.enum(['existing', 'new']),
  clientId: z.string().optional(),
  newClientName: z.string().optional(),
  newClientPhone: z.string().optional(),
  staffId: z.string({ required_error: 'Моля, изберете служител.' }).min(1, 'Моля, изберете служител.'),
  procedureIds: z.array(z.string()).min(1, { message: 'Моля, изберете поне една процедура.' }),
  notes: z.string().optional(),
}).superRefine((data, ctx) => {
    if (data.clientType === 'existing' && !data.clientId) {
        ctx.addIssue({
            code: 'custom',
            path: ['clientId'],
            message: 'Моля, изберете съществуващ клиент.',
        });
    }
    if (data.clientType === 'new' && (!data.newClientName || data.newClientName.length < 2)) {
         ctx.addIssue({
            code: 'custom',
            path: ['newClientName'],
            message: 'Името на новия клиент е задължително.',
        });
    }
     if (data.clientType === 'new' && (!data.newClientPhone || data.newClientPhone.length < 10)) {
         ctx.addIssue({
            code: 'custom',
            path: ['newClientPhone'],
            message: 'Телефонът на новия клиент е задължителен.',
        });
    }
});

interface AppointmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
  slot: { date: Date; time: string } | null;
  staff: StaffMember[];
  clients: FirestoreUser[];
  procedures: Procedure[];
}

export function AppointmentDialog({ open, onOpenChange, onSuccess, slot, staff, clients, procedures }: AppointmentDialogProps) {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof appointmentSchema>>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      clientType: 'existing',
      staffId: '',
      procedureIds: [],
      notes: '',
    },
  });

  const clientType = form.watch('clientType');
  const watchedProcedureIds = form.watch('procedureIds') || [];

  useEffect(() => {
    if (open) {
      form.reset({
        clientType: 'existing',
        staffId: '',
        procedureIds: [],
        notes: '',
        clientId: undefined,
        newClientName: '',
        newClientPhone: '',
      });
    }
  }, [open, form]);

  const { totalDuration, totalPrice } = useMemo(() => {
    return procedures
        .filter(p => watchedProcedureIds.includes(p.id))
        .reduce(
            (acc, proc) => {
                acc.totalDuration += proc.duration;
                acc.totalPrice += proc.price;
                return acc;
            },
            { totalDuration: 0, totalPrice: 0 }
        );
}, [watchedProcedureIds, procedures]);


  async function onSubmit(values: z.infer<typeof appointmentSchema>) {
    if (!slot) return;

    // Optimistic UI update: Close dialog immediately
    onOpenChange(false);
    
    try {
        const result = await saveAppointment({
          clientId: values.clientType === 'existing' ? values.clientId : undefined,
          newClient: values.clientType === 'new' ? { name: values.newClientName!, phone: values.newClientPhone! } : undefined,
          staffId: values.staffId,
          procedureIds: values.procedureIds,
          notes: values.notes,
          date: slot.date.toISOString(),
          time: slot.time,
        });

        if (result?.success) {
          toast({
            title: 'Успешно създаден час!',
            description: `Резервацията беше създадена успешно.`,
          });
          onSuccess(); // Re-fetch appointments to show the new one
        } else {
          toast({
            variant: 'destructive',
            title: 'Грешка при създаване на час',
            description: result?.error || 'Възникна неочаквана грешка при запис.',
          });
        }
    } catch (error: any) {
        console.error("Submit Error in Dialog:", error);
        toast({
            variant: 'destructive',
            title: 'Критична грешка',
            description: error.message || 'Възникна неочаквана грешка. Моля, проверете конзолата.',
        });
    }
  }

  if (!slot) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Създаване на резервация</DialogTitle>
          <DialogDescription>
            {`Запазвате час за ${format(slot.date, 'PPP', { locale: bg })} в ${slot.time}`}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">

            <FormField
              control={form.control}
              name="clientType"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Тип клиент</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex space-x-4"
                    >
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                           <RadioGroupItem value="existing" id="clientType-existing" />
                        </FormControl>
                        <Label htmlFor="clientType-existing" className="font-normal cursor-pointer">Съществуващ</Label>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2">
                         <FormControl>
                            <RadioGroupItem value="new" id="clientType-new" />
                         </FormControl>
                        <Label htmlFor="clientType-new" className="font-normal cursor-pointer">Нов</Label>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {clientType === 'existing' && (
              <FormField
                control={form.control}
                name="clientId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Клиент</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger><SelectValue placeholder="Изберете клиент" /></SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {clients.map(client => <SelectItem key={client.id} value={client.id}>{client.name}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {clientType === 'new' && (
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="newClientName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Име на нов клиент</FormLabel>
                      <FormControl><Input placeholder="Иван Иванов" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="newClientPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Телефон на нов клиент</FormLabel>
                      <FormControl><Input placeholder="0888123456" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
            
            <FormField
              control={form.control}
              name="staffId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Служител</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger><SelectValue placeholder="Изберете служител" /></SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {staff.map(s => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="procedureIds"
              render={({ field }) => {
                const selected = procedures.filter(p => field.value?.includes(p.id));
                return (
                  <FormItem>
                    <FormLabel>Процедури</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-full justify-between h-auto min-h-10",
                              !field.value?.length && "text-muted-foreground"
                            )}
                          >
                            <div className="flex gap-1 flex-wrap">
                              {selected.length > 0 ? (
                                selected.map(p => <Badge variant="secondary" key={p.id}>{p.name}</Badge>)
                              ) : (
                                "Изберете процедура/и"
                              )}
                            </div>
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[475px] p-0">
                        <Command>
                          <CommandInput placeholder="Търсене на процедура..." />
                          <CommandList>
                            <CommandEmpty>Няма намерени процедури.</CommandEmpty>
                            <CommandGroup className="max-h-64 overflow-auto">
                                {procedures.map((procedure) => (
                                    <CommandItem
                                    value={procedure.name}
                                    key={procedure.id}
                                    onSelect={() => {
                                        const currentIds = form.getValues('procedureIds') || [];
                                        const newIds = currentIds.includes(procedure.id)
                                        ? currentIds.filter(id => id !== procedure.id)
                                        : [...currentIds, procedure.id];
                                        form.setValue('procedureIds', newIds, { shouldValidate: true });
                                    }}
                                    >
                                    <Check
                                        className={cn(
                                        "mr-2 h-4 w-4",
                                        field.value?.includes(procedure.id) ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    <div className="flex-1">{procedure.name}</div>
                                    <div className="text-xs text-muted-foreground">{procedure.duration} мин. / {procedure.price} лв.</div>
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Бележки (по желание)</FormLabel>
                  <FormControl><Textarea placeholder="Допълнителна информация за резервацията..." {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {watchedProcedureIds.length > 0 && (
              <div className="p-3 bg-muted rounded-md text-sm text-muted-foreground space-y-1">
                <div className="flex justify-between"><span>Общо времетраене:</span><span className="font-medium text-foreground">{totalDuration} мин.</span></div>
                <div className="flex justify-between"><span>Обща цена:</span><span className="font-medium text-foreground">{totalPrice.toFixed(2)} лв.</span></div>
              </div>
            )}
            
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>Отказ</Button>
              <Button type="submit">
                Създай резервация
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

    