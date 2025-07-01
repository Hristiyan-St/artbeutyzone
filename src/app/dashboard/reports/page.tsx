
'use client';

import { useState, useEffect, useMemo } from 'react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Line, LineChart, CartesianGrid, Tooltip } from 'recharts';
import {
  add,
  format,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
  isWithinInterval,
  parseISO,
  eachDayOfInterval,
  eachMonthOfInterval,
  subMonths,
} from 'date-fns';
import { bg } from 'date-fns/locale';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getProcedures } from '@/services/proceduresService';
import { getStaffMembers } from '@/services/staffService';
import { getClients } from '@/services/usersService';
import { getAppointments } from '@/services/appointmentsService';
import type { Procedure, StaffMember, FirestoreUser, Appointment } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { DollarSign, Users, CreditCard, Activity } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

type Range = 'week' | 'month' | 'year';

export default function ReportsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [clients, setClients] = useState<FirestoreUser[]>([]);
  const [procedures, setProcedures] = useState<Procedure[]>([]);
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const [range, setRange] = useState<Range>('month');

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [apptsData, clientsData, procsData, staffData] = await Promise.all([
          getAppointments(),
          getClients(),
          getProcedures(),
          getStaffMembers(),
        ]);
        setAppointments(apptsData);
        setClients(clientsData);
        setProcedures(procsData);
        setStaff(staffData);
      } catch (err) {
        console.error(err);
        setError('Неуспешно зареждане на данните за справките.');
        toast({
          variant: 'destructive',
          title: 'Грешка при зареждане',
          description: 'Неуспешно зареждане на данните за справките. Моля, опитайте отново по-късно.',
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [toast]);

  const { filteredAppointments, totalRevenue, totalBookings, activeClients, avgBookingValue, revenueOverTime } = useMemo(() => {
    const now = new Date();
    let interval;

    switch (range) {
      case 'week':
        interval = { start: startOfWeek(now, { weekStartsOn: 1 }), end: endOfWeek(now, { weekStartsOn: 1 }) };
        break;
      case 'year':
        interval = { start: startOfYear(now), end: endOfYear(now) };
        break;
      case 'month':
      default:
        interval = { start: startOfMonth(now), end: endOfMonth(now) };
        break;
    }

    const filtered = appointments.filter(a => isWithinInterval(a.startTime.toDate(), interval));
    
    const totalRevenue = filtered.reduce((sum, appt) => sum + appt.totalPrice, 0);
    const totalBookings = filtered.length;
    const activeClients = new Set(filtered.map(a => a.clientId)).size;
    const avgBookingValue = totalBookings > 0 ? totalRevenue / totalBookings : 0;

    let revenueOverTime: { name: string; Приходи: number }[] = [];

    if (range === 'week' || range === 'month') {
        const days = eachDayOfInterval(interval);
        revenueOverTime = days.map(day => ({
            name: format(day, 'dd.MM'),
            Приходи: appointments
                .filter(a => format(a.startTime.toDate(), 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd'))
                .reduce((sum, appt) => sum + appt.totalPrice, 0)
        }));
    } else { // year
        const yearInterval = { start: startOfYear(now), end: endOfYear(now) };
        const months = eachMonthOfInterval(yearInterval);
        revenueOverTime = months.map(month => ({
            name: format(month, 'MMM', { locale: bg }),
            Приходи: appointments
                .filter(a => format(a.startTime.toDate(), 'yyyy-MM') === format(month, 'yyyy-MM'))
                .reduce((sum, appt) => sum + appt.totalPrice, 0)
        }));
    }
    
    return {
        filteredAppointments: filtered,
        totalRevenue,
        totalBookings,
        activeClients,
        avgBookingValue,
        revenueOverTime
    };

  }, [appointments, range]);

  const proceduresPerformance = useMemo(() => {
    if (isLoading || !procedures.length || !filteredAppointments.length) return [];

    const procStats: { [key: string]: { revenue: number; bookings: number } } = {};

    filteredAppointments.forEach(appt => {
      if (!appt.procedureIds || appt.procedureIds.length === 0) return;
      const pricePerProcedure = appt.totalPrice / appt.procedureIds.length;
      appt.procedureIds.forEach(procId => {
        if (!procStats[procId]) {
          procStats[procId] = { revenue: 0, bookings: 0 };
        }
        procStats[procId].revenue += pricePerProcedure;
        procStats[procId].bookings += 1;
      });
    });

    return Object.entries(procStats).map(([procId, stats]) => {
        const procedure = procedures.find(p => p.id === procId);
        return {
            name: procedure?.name.substring(0, 25) + (procedure && procedure.name.length > 25 ? '...' : '') || 'Неизвестна',
            Приходи: parseFloat(stats.revenue.toFixed(2)),
            Резервации: stats.bookings,
        }
    }).sort((a, b) => b.Приходи - a.Приходи).slice(0, 10); // Top 10

  }, [filteredAppointments, procedures, isLoading]);

  const staffPerformance = useMemo(() => {
    if (isLoading || !staff.length || !filteredAppointments.length) return [];

    const staffStats: { [key: string]: { revenue: number; bookings: number } } = {};

    filteredAppointments.forEach(appt => {
        const staffId = appt.staffId;
        if (!staffStats[staffId]) {
            staffStats[staffId] = { revenue: 0, bookings: 0 };
        }
        staffStats[staffId].revenue += appt.totalPrice;
        staffStats[staffId].bookings += 1;
    });

    return Object.entries(staffStats).map(([staffId, stats]) => {
        const staffMember = staff.find(s => s.id === staffId);
        return {
            name: staffMember?.name || 'Неизвестен',
            Приходи: parseFloat(stats.revenue.toFixed(2)),
            Резервации: stats.bookings,
        }
    }).sort((a, b) => b.Приходи - a.Приходи);
  }, [filteredAppointments, staff, isLoading]);
  
  const chartConfig = {
      Приходи: {
        label: 'Приходи (лв.)',
        color: 'hsl(var(--primary))',
      },
      Резервации: {
        label: 'Резервации',
        color: 'hsl(var(--accent))',
      }
  } as const;


  return (
    <div className="flex-1 space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
        <h2 className="text-3xl font-bold tracking-tight">Справки</h2>
        <Tabs defaultValue={range} onValueChange={(value) => setRange(value as Range)} className="space-y-4">
            <TabsList>
                <TabsTrigger value="week">Седмица</TabsTrigger>
                <TabsTrigger value="month">Месец</TabsTrigger>
                <TabsTrigger value="year">Година</TabsTrigger>
            </TabsList>
        </Tabs>
      </div>

       {error ? (
         <Card className="border-destructive">
            <CardHeader>
                <CardTitle className="text-destructive">Грешка при зареждане</CardTitle>
                <CardDescription>{error}</CardDescription>
            </CardHeader>
        </Card>
      ) : (
        <>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Общо приходи</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        {isLoading ? <Skeleton className="h-8 w-1/2" /> : <div className="text-2xl font-bold">{totalRevenue.toFixed(2)} лв.</div>}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Общо резервации</CardTitle>
                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                         {isLoading ? <Skeleton className="h-8 w-1/4" /> : <div className="text-2xl font-bold">+{totalBookings}</div>}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Активни клиенти</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                         {isLoading ? <Skeleton className="h-8 w-1/4" /> : <div className="text-2xl font-bold">+{activeClients}</div>}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Средна стойност</CardTitle>
                        <Activity className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        {isLoading ? <Skeleton className="h-8 w-1/2" /> : <div className="text-2xl font-bold">{avgBookingValue.toFixed(2)} лв.</div>}
                    </CardContent>
                </Card>
            </div>
            
             <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="lg:col-span-4">
                    <CardHeader>
                        <CardTitle>Преглед на приходите</CardTitle>
                        <CardDescription>
                            Динамична графика на приходите за избрания период.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pl-2">
                    {isLoading ? (
                        <Skeleton className="h-[350px] w-full" />
                    ) : (
                        <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
                            <LineChart accessibilityLayer data={revenueOverTime}>
                                <CartesianGrid vertical={false} />
                                <XAxis dataKey="name" tickLine={false} tickMargin={10} axisLine={false} />
                                <YAxis tickLine={false} tickMargin={10} axisLine={false} tickFormatter={(value) => `${value} лв.`} />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <Line dataKey="Приходи" type="monotone" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
                            </LineChart>
                        </ChartContainer>
                    )}
                    </CardContent>
                </Card>
                 <Card className="lg:col-span-3">
                    <CardHeader>
                        <CardTitle>Последни резервации</CardTitle>
                        <CardDescription>
                            Най-скорошните резервации в салона.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                       {isLoading ? (
                           <div className="space-y-4">
                               <Skeleton className="h-10 w-full" />
                               <Skeleton className="h-10 w-full" />
                               <Skeleton className="h-10 w-full" />
                               <Skeleton className="h-10 w-full" />
                           </div>
                       ) : (
                           <Table>
                               <TableHeader>
                                   <TableRow>
                                       <TableHead>Клиент</TableHead>
                                       <TableHead className="text-right">Сума</TableHead>
                                   </TableRow>
                               </TableHeader>
                               <TableBody>
                                   {filteredAppointments.slice(0, 5).map(appt => (
                                       <TableRow key={appt.id}>
                                           <TableCell>
                                               <div className="font-medium">{clients.find(c => c.id === appt.clientId)?.name || 'Неизвестен'}</div>
                                               <div className="text-sm text-muted-foreground">{format(appt.startTime.toDate(), 'dd.MM.yyyy HH:mm')}</div>
                                           </TableCell>
                                           <TableCell className="text-right font-medium text-primary">+{appt.totalPrice.toFixed(2)} лв.</TableCell>
                                       </TableRow>
                                   ))}
                               </TableBody>
                           </Table>
                       )}
                    </CardContent>
                </Card>
            </div>
             <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Справка по процедури</CardTitle>
                        <CardDescription>Топ 10 най-печеливши процедури за периода.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {isLoading ? <Skeleton className="h-[300px] w-full" /> :
                         proceduresPerformance.length > 0 ? (
                            <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
                                <BarChart data={proceduresPerformance}>
                                    <CartesianGrid vertical={false} />
                                    <XAxis dataKey="name" tickLine={false} tickMargin={10} axisLine={false} angle={-45} textAnchor="end" height={80} />
                                    <YAxis />
                                    <ChartTooltip content={<ChartTooltipContent />} />
                                    <Bar dataKey="Приходи" fill="hsl(var(--primary))" radius={4} />
                                </BarChart>
                            </ChartContainer>
                         ) : (
                             <div className="flex items-center justify-center h-[300px] text-muted-foreground">Няма данни за избрания период.</div>
                         )
                        }
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Справка по служители</CardTitle>
                        <CardDescription>Приходи, генерирани от служител за периода.</CardDescription>
                    </CardHeader>
                    <CardContent>
                       {isLoading ? <Skeleton className="h-[300px] w-full" /> :
                        staffPerformance.length > 0 ? (
                            <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
                                <BarChart data={staffPerformance}>
                                    <CartesianGrid vertical={false} />
                                    <XAxis dataKey="name" tickLine={false} tickMargin={10} axisLine={false} />
                                    <YAxis tickFormatter={(value) => `${value} лв.`}/>
                                    <ChartTooltip content={<ChartTooltipContent />} />
                                    <Bar dataKey="Приходи" fill="hsl(var(--primary))" radius={4} />
                                </BarChart>
                            </ChartContainer>
                        ) : (
                            <div className="flex items-center justify-center h-[300px] text-muted-foreground">Няма данни за избрания период.</div>
                        )
                       }
                    </CardContent>
                </Card>
            </div>
        </>
      )}
    </div>
  );
}
