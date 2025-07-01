
'use client';

import { useState, useEffect, useCallback } from 'react';
import { addDays, format, startOfWeek, subDays } from 'date-fns';
import { bg } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, PlusCircle } from 'lucide-react';
import WeeklySchedule from '@/components/dashboard/WeeklySchedule';
import { AppointmentDialog } from '@/components/dashboard/AppointmentDialog';
import type { Appointment, Procedure, StaffMember, FirestoreUser } from '@/lib/types';
import { getStaffMembers } from '@/services/staffService';
import { getClients } from '@/services/usersService';
import { getAppointments } from '@/services/appointmentsService';
import { getProcedures } from '@/services/proceduresService';
import { useToast } from '@/hooks/use-toast';

export default function SchedulePage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [clients, setClients] = useState<FirestoreUser[]>([]);
  const [procedures, setProcedures] = useState<Procedure[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<{ date: Date; time: string } | null>(null);

  const startOfWeekDate = startOfWeek(currentDate, { weekStartsOn: 1 }); // Monday
  
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [staffData, clientData, appointmentData, procedureData] = await Promise.all([
        getStaffMembers(),
        getClients(),
        getAppointments(),
        getProcedures(),
      ]);
      setStaff(staffData);
      setClients(clientData);
      setAppointments(appointmentData);
      setProcedures(procedureData);
    } catch (err: any) {
      console.error("Failed to fetch page data:", err);
      toast({
        variant: 'destructive',
        title: 'Грешка при зареждане на графика',
        description: err.message || 'Връзката с базата данни е неуспешна. Моля, проверете конзолата за грешки.',
      })
    } finally {
      setIsLoading(false);
    }
  }, [toast]);
  
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const goToPreviousWeek = () => {
    setCurrentDate(subDays(currentDate, 7));
  };

  const goToNextWeek = () => {
    setCurrentDate(addDays(currentDate, 7));
  };

  const handleSlotClick = (date: Date, time: string) => {
    setSelectedSlot({ date, time });
    setIsDialogOpen(true);
  };
  
  const weekRange = `${format(startOfWeekDate, 'dd MMMM', { locale: bg })} - ${format(addDays(startOfWeekDate, 6), 'dd MMMM yyyy', { locale: bg })}`;

  return (
    <div className="flex flex-col h-full">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-1">
            <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={goToPreviousWeek} className="h-8 w-8">
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm md:text-base font-semibold text-center w-48 md:w-64">
                    {weekRange}
                </span>
                <Button variant="outline" size="icon" onClick={goToNextWeek} className="h-8 w-8">
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
            <Button onClick={() => handleSlotClick(new Date(), '09:00')}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Добави резервация
            </Button>
        </div>
        
        <div className="flex-1 overflow-auto rounded-lg border">
            <WeeklySchedule 
                weekStartDate={startOfWeekDate} 
                onSlotClick={handleSlotClick}
                appointments={appointments}
                isLoading={isLoading}
                staff={staff}
                clients={clients}
                procedures={procedures}
            />
        </div>

        <AppointmentDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          onSuccess={() => {
            setIsDialogOpen(false);
            fetchData();
          }}
          slot={selectedSlot}
          staff={staff}
          clients={clients}
          procedures={procedures}
        />
    </div>
  );
}
