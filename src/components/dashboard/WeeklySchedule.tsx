
'use client';

import React from 'react';
import { addDays, format } from 'date-fns';
import { bg } from 'date-fns/locale';
import type { StaffMember, Procedure, FirestoreUser, Appointment } from '@/lib/types';
import { Skeleton } from '../ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Users, User, Scissors, Clock } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface WeeklyScheduleProps {
  weekStartDate: Date;
  onSlotClick: (date: Date, time: string) => void;
  appointments: Appointment[];
  isLoading: boolean;
  staff: StaffMember[];
  clients: FirestoreUser[];
  procedures: Procedure[];
}

const timeSlots = Array.from({ length: 25 }, (_, i) => {
    const hour = 8 + Math.floor(i / 2);
    const minute = (i % 2) * 30;
    return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
}); // 08:00 to 20:00 in 30-min intervals

const ScheduleSkeleton = () => (
    <div className="grid" style={{ gridTemplateColumns: 'auto repeat(7, minmax(0, 1fr))' }}>
        {/* Fake headers */}
        <div className="p-1 sm:p-2 font-semibold text-center border-b border-r"><Skeleton className="w-8 h-5 mx-auto" /></div>
        {[...Array(7)].map((_, i) => (
            <div key={i} className="p-1 sm:p-2 border-b border-r flex flex-col items-center">
                <Skeleton className="w-10 h-5 mb-1" />
                <Skeleton className="w-8 h-4" />
            </div>
        ))}
        {/* Fake body */}
        {timeSlots.map(time => (
            <React.Fragment key={time}>
              <div className="flex items-center justify-center px-1 py-2 text-xs border-b border-r"><Skeleton className="w-8 h-5"/></div>
              {[...Array(7)].map((_, i) => <div key={i} className="h-12 p-1 border-b border-r sm:h-16"></div>)}
            </React.Fragment>
        ))}
    </div>
);


export default function WeeklySchedule({ 
    weekStartDate, 
    onSlotClick, 
    appointments, 
    isLoading,
    staff,
    clients,
    procedures
}: WeeklyScheduleProps) {
  
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStartDate, i));

  const getAppointmentForSlot = (date: Date, time: string): Appointment | undefined => {
    if (!appointments) return undefined;
    const [slotHour, slotMinute] = time.split(':').map(Number);
    const slotTime = new Date(date);
    slotTime.setHours(slotHour, slotMinute, 0, 0);

    return appointments.find(app => {
      const startTime = app.startTime.toDate();
      const endTime = app.endTime.toDate();
      return slotTime >= startTime && slotTime < endTime;
    });
  };
  
  if (isLoading) {
    return <ScheduleSkeleton />;
  }

  if (!staff || staff.length === 0) {
      return (
        <div className="p-4">
            <Alert>
                <Users className="h-4 w-4" />
                <AlertTitle>Няма добавени служители</AlertTitle>
                <AlertDescription>
                    Няма добавени служители. Добавете служител, за да можете да създавате резервации.
                </AlertDescription>
            </Alert>
        </div>
    );
  }

  const AppointmentDetails = ({ appointment }: { appointment: Appointment }) => {
    const staffMember = staff?.find(s => s.id === appointment.staffId);
    const client = clients?.find(c => c.id === appointment.clientId);
    const selectedProcedures = procedures?.filter(p => appointment.procedureIds.includes(p.id));

    return (
        <Popover>
            <PopoverTrigger asChild>
                <div className="w-full h-full p-1 text-xs text-white bg-primary rounded-sm cursor-pointer overflow-hidden flex flex-col justify-center">
                    <p className="font-semibold truncate">{client?.name || 'Клиент'}</p>
                    <p className="truncate text-primary-foreground/80">{staffMember?.name || 'Служител'}</p>
                </div>
            </PopoverTrigger>
            <PopoverContent className="w-64 text-sm">
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="font-bold">{client?.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{staffMember?.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{format(appointment.startTime.toDate(), 'HH:mm')} - {format(appointment.endTime.toDate(), 'HH:mm')}</span>
                    </div>
                    <div className="flex flex-col gap-1 pt-2">
                        <div className="flex items-center gap-2 font-semibold">
                            <Scissors className="h-4 w-4" /> Процедури:
                        </div>
                        <ul className="list-disc pl-6 text-muted-foreground">
                            {selectedProcedures?.map(p => <li key={p.id}>{p.name}</li>)}
                        </ul>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
  };
  
  const renderedAppointments = new Set<string>();

  return (
    <div className="grid bg-card text-card-foreground text-sm relative" style={{ gridTemplateColumns: 'auto repeat(7, minmax(0, 1fr))' }}>
      {/* Top-left sticky corner */}
      <div className="sticky left-0 top-0 z-20 bg-muted/70 backdrop-blur-sm border-b border-r border-border p-1">
        <span className="sr-only">Time</span>
      </div>
      
      {/* Days Header */}
      {weekDays.map((day) => (
        <div
          key={day.toISOString()}
          className="sticky top-0 z-10 p-1 sm:p-2 text-center font-semibold border-b border-r border-border bg-muted/70 backdrop-blur-sm"
        >
          <div className="capitalize hidden sm:block">{format(day, 'E', { locale: bg })}.</div>
          <div className="capitalize sm:hidden">{format(day, 'EEEEE', { locale: bg })}</div>
          <div className="text-xs font-normal text-muted-foreground">{format(day, 'dd.MM')}</div>
        </div>
      ))}
      
      {/* Grid Body */}
      {timeSlots.map(time => (
        <React.Fragment key={time}>
          {/* Time Slot Column */}
          <div className="sticky left-0 z-10 px-1 py-2 text-center text-xs text-muted-foreground bg-card border-b border-r border-border flex items-center justify-center">
            {time}
          </div>
          
          {/* Day Cells for the current time slot */}
          {weekDays.map((day) => {
             const appointmentInSlot = getAppointmentForSlot(day, time);
             
             if (appointmentInSlot && !renderedAppointments.has(appointmentInSlot.id)) {
                 renderedAppointments.add(appointmentInSlot.id);
                 const durationInSlots = Math.ceil(appointmentInSlot.totalDuration / 30);

                 return (
                    <div
                        key={`${day.toISOString()}-${time}`}
                        className="border-b border-r border-border p-0.5 relative"
                         style={{ gridRowEnd: `span ${durationInSlots}` }}
                    >
                       <AppointmentDetails appointment={appointmentInSlot} />
                    </div>
                 )
             }
             
             if (appointmentInSlot && renderedAppointments.has(appointmentInSlot.id)) {
                 return null; // This slot is part of an already rendered appointment
             }

            return (
              <div
                key={`${day.toISOString()}-${time}`}
                className="h-12 sm:h-16 border-b border-r border-border transition-colors hover:bg-primary/10 cursor-pointer"
                onClick={() => onSlotClick(day, time)}
              >
              </div>
            );
          })}
        </React.Fragment>
      ))}
    </div>
  );
}

