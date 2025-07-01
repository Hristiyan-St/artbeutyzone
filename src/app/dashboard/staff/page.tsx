
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MoreHorizontal, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import type { StaffMember } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { getStaffMembers } from '@/services/staffService';
import { Skeleton } from '@/components/ui/skeleton';

export default function StaffPage() {
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [staffToDelete, setStaffToDelete] = useState<StaffMember | null>(null);

  const fetchStaff = async () => {
    setIsLoading(true);
    try {
      const staffList = await getStaffMembers();
      setStaff(staffList);
    } catch (err) {
      console.error("Error fetching staff:", err);
      toast({
        variant: 'destructive',
        title: 'Грешка при зареждане',
        description: 'Неуспешно зареждане на служителите.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, [toast]);
  
  const handleDeleteClick = (member: StaffMember) => {
    toast({
        variant: 'destructive',
        title: 'Изтриването е деактивирано',
        description: 'Тази функция е временно деактивирана до разрешаване на проблема с базата данни.',
    });
  };

  const confirmDelete = async () => {
    // This function is currently not called.
    if (!staffToDelete) return;

    try {
      toast({
        title: 'Успешно изтриване (Симулация)',
        description: `Служителят ${staffToDelete.name} беше изтрит.`,
      });
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Грешка при изтриване',
        description: 'Неуспешно изтриване на служителя.',
      });
    } finally {
      setIsDeleteDialogOpen(false);
      setStaffToDelete(null);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Управление на служители</h1>
            <Button asChild>
              <Link href="/dashboard/staff/new">
                <PlusCircle className="mr-2 h-4 w-4" />
                Добави служител
              </Link>
            </Button>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Списък със служители</CardTitle>
            <CardDescription>Преглед и управление на служителите в салона.</CardDescription>
          </CardHeader>
          <CardContent>
             <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="hidden w-[100px] sm:table-cell">
                      <span className="sr-only">Снимка</span>
                    </TableHead>
                    <TableHead>Име</TableHead>
                    <TableHead>Длъжност</TableHead>
                    <TableHead>Имейл</TableHead>
                    <TableHead>Телефон</TableHead>
                    <TableHead>
                      <span className="sr-only">Действия</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    [...Array(3)].map((_, i) => (
                      <TableRow key={i}>
                        <TableCell className="hidden sm:table-cell">
                          <Skeleton className="aspect-square w-16 h-16 rounded-md" />
                        </TableCell>
                        <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                        <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                        <TableCell><Skeleton className="h-5 w-48" /></TableCell>
                        <TableCell><Skeleton className="h-5 w-28" /></TableCell>
                        <TableCell>
                          <Skeleton className="h-8 w-8" />
                        </TableCell>
                      </TableRow>
                    ))
                  ) : staff.length === 0 ? (
                     <TableRow>
                      <TableCell colSpan={6} className="text-center text-muted-foreground">
                        Няма намерени служители.
                      </TableCell>
                    </TableRow>
                  ) : (
                    staff.map((member) => (
                      <TableRow key={member.id}>
                        <TableCell className="hidden sm:table-cell">
                       <Image
                        alt={member.name}
                        className="aspect-square rounded-md object-cover"
                        height="64"
                        src={"https://placehold.co/64x64.png"}
                        width="64"
                        data-ai-hint="person portrait"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{member.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{member.position}</Badge>
                    </TableCell>
                    <TableCell>{member.email}</TableCell>
                    <TableCell>{member.phone}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button aria-haspopup="true" size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Действия</DropdownMenuLabel>
                           <DropdownMenuItem asChild>
                               <Link href={`/dashboard/staff/${member.id}`}>Редактирай</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDeleteClick(member)} disabled>Изтрий (деактивирано)</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                  ))
                  )}
                </TableBody>
              </Table>
          </CardContent>
        </Card>
      </div>

      {isDeleteDialogOpen && (
        <AlertDialog open onOpenChange={setIsDeleteDialogOpen}>
            <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Сигурни ли сте?</AlertDialogTitle>
                <AlertDialogDescription>
                Това действие не може да бъде отменено. Това ще изтрие перманентно служителя {staffToDelete?.name} от базата данни.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Отказ</AlertDialogCancel>
                <AlertDialogAction onClick={confirmDelete}>Изтрий</AlertDialogAction>
            </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
}
