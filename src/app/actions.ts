
'use server';

import type { Procedure } from '@/lib/types';
import { getProcedures } from '@/services/proceduresService';
import { addAppointment as addAppointmentToDb } from '@/services/appointmentsService';
import { createClient } from '@/services/usersService';
import { revalidatePath } from 'next/cache';

export async function saveAppointment(data: {
  clientId?: string;
  newClient?: { name: string, phone: string };
  staffId: string;
  procedureIds: string[];
  notes?: string;
  date: string;
  time: string;
}) {
  try {
    let finalClientId = data.clientId;

    if (data.newClient && data.newClient.name) {
      if (!data.newClient.phone) {
        return { success: false, error: "Телефонният номер за нов клиент е задължителен." };
      }
      // Assuming createClient is robust and won't hang
      finalClientId = await createClient(data.newClient);
    }

    if (!finalClientId) {
      return { success: false, error: "Не е избран или създаден клиент." };
    }

    // Use the service function which has the mock data fallback
    const allProcedures = await getProcedures();
    
    const selectedProcedures = allProcedures.filter(p => data.procedureIds.includes(p.id));

    if (selectedProcedures.length === 0) {
      // This might happen if mock procedures on client don't match mock procedures on server
      // after a fallback scenario.
      return { success: false, error: "Не са избрани валидни процедури. Моля, опитайте отново." };
    }

    const { totalDuration, totalPrice } = selectedProcedures.reduce(
      (acc, proc) => {
        acc.totalDuration += proc.duration;
        acc.totalPrice += proc.price;
        return acc;
      },
      { totalDuration: 0, totalPrice: 0 }
    );
      
    const [hour, minute] = data.time.split(':').map(Number);
    const startTime = new Date(data.date);
    startTime.setHours(hour, minute, 0, 0);

    const endTime = new Date(startTime.getTime() + totalDuration * 60000);

    const newAppointment = {
      clientId: finalClientId,
      staffId: data.staffId,
      procedureIds: data.procedureIds,
      notes: data.notes || '',
      totalDuration,
      totalPrice,
      startTime,
      endTime,
    };
    
    await addAppointmentToDb(newAppointment);

    revalidatePath('/dashboard/schedule');
    revalidatePath('/dashboard/reports');
    revalidatePath('/dashboard/clients');

    return { success: true };
  } catch (error: any) {
    console.error("Failed to save appointment:", error);
    return { success: false, error: error.message || 'Възникна непозната грешка при запазване.' };
  }
}
