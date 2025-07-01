
'use client';

import { useState, useEffect } from 'react';
import { MoreHorizontal, Award, PlusCircle } from 'lucide-react';
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
import type { FirestoreUser } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { getClients } from '@/services/usersService';

export default function ClientsPage() {
  const [clients, setClients] = useState<FirestoreUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchClients = async () => {
      setIsLoading(true);
      try {
        const clientList = await getClients();
        setClients(clientList);
      } catch (err) {
        console.error("Error fetching clients:", err);
        toast({
          variant: 'destructive',
          title: 'Грешка при зареждане',
          description: 'Неуспешно зареждане на клиентите. Показани са примерни данни.',
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchClients();
  }, [toast]);


  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Клиенти</h1>
             <Button disabled>
              <PlusCircle className="mr-2 h-4 w-4" />
              Добави клиент (деактивирано)
            </Button>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Списък с клиенти</CardTitle>
            <CardDescription>Преглед на регистрираните потребители. Управлението е временно деактивирано.</CardDescription>
          </CardHeader>
          <CardContent>
             <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Име</TableHead>
                    <TableHead>Имейл</TableHead>
                    <TableHead>Телефон</TableHead>
                    <TableHead>Точки за лоялност</TableHead>
                    <TableHead>
                      <span className="sr-only">Действия</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    [...Array(5)].map((_, i) => (
                      <TableRow key={i}>
                        <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                        <TableCell><Skeleton className="h-5 w-48" /></TableCell>
                        <TableCell><Skeleton className="h-5 w-28" /></TableCell>
                        <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                        <TableCell>
                          <Skeleton className="h-8 w-8" />
                        </TableCell>
                      </TableRow>
                    ))
                  ) : clients.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-muted-foreground">
                        Няма намерени клиенти.
                      </TableCell>
                    </TableRow>
                  ) : (
                    clients.map((client) => (
                      <TableRow key={client.id}>
                        <TableCell className="font-medium">{client.name}</TableCell>
                        <TableCell>{client.email || '-'}</TableCell>
                        <TableCell>{client.phone || '-'}</TableCell>
                        <TableCell>
                            <div className="flex items-center gap-2">
                                <Award className="h-4 w-4 text-primary" />
                                {client.loyaltyPoints}
                            </div>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button aria-haspopup="true" size="icon" variant="ghost" disabled>
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Действия</DropdownMenuLabel>
                              <DropdownMenuItem disabled>Управление</DropdownMenuItem>
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
    </>
  );
}
