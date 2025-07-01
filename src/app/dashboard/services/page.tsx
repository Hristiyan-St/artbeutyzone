
'use client';

import { useState, useEffect } from 'react';
import { MoreHorizontal, Eye, EyeOff, PlusCircle } from 'lucide-react';
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
import type { Procedure } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { getProcedures } from '@/services/proceduresService';


export default function ServicesPage() {
  const [procedures, setProcedures] = useState<Procedure[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();


  useEffect(() => {
    const fetchProcedures = async () => {
      setIsLoading(true);
      setError(null);
      try {
          const procedureList = await getProcedures();
          setProcedures(procedureList);
      } catch(err: any) {
          console.error("Error fetching procedures:", err);
          setError('Неуспешно зареждане на процедурите. Показани са примерни данни.');
          toast({
            variant: 'destructive',
            title: 'Грешка при зареждане',
            description: 'Неуспешно зареждане на процедурите.',
          });
      } finally {
          setIsLoading(false);
      }
    };

    fetchProcedures();
  }, [toast]);
  
  const renderContent = () => {
    if (isLoading) {
        return [...Array(5)].map((_, i) => (
            <TableRow key={i}>
                <TableCell><Skeleton className="h-5 w-5" /></TableCell>
                <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                <TableCell><Skeleton className="h-5 w-40" /></TableCell>
                <TableCell><Skeleton className="h-5 w-16" /></TableCell>
                <TableCell><Skeleton className="h-5 w-16" /></TableCell>
                <TableCell><Skeleton className="h-8 w-8" /></TableCell>
            </TableRow>
        ));
    }
    
    if (procedures.length === 0) {
      return (
        <TableRow>
            <TableCell colSpan={6} className="text-center h-48">
                <p className="text-lg font-medium">Няма намерени процедури.</p>
                 {error && <p className="text-sm text-destructive">{error}</p>}
            </TableCell>
        </TableRow>
      );
    }
    
    return procedures.map((procedure) => (
      <TableRow key={procedure.id} className={cn(!procedure.visible && 'text-muted-foreground opacity-50')}>
        <TableCell>
           {procedure.visible ? <Eye className="h-4 w-4 text-green-500" /> : <EyeOff className="h-4 w-4 text-muted-foreground" />}
        </TableCell>
        <TableCell>
          <Badge variant={procedure.visible ? "outline" : "secondary"}>{procedure.category}</Badge>
          {procedure.subCategory && <span className="ml-2 text-muted-foreground text-xs">({procedure.subCategory})</span>}
        </TableCell>
        <TableCell className="font-medium">{procedure.name}</TableCell>
        <TableCell>{procedure.price} лв.</TableCell>
        <TableCell>{procedure.duration} мин.</TableCell>
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
              <DropdownMenuItem disabled>Редактирай</DropdownMenuItem>
              <DropdownMenuItem disabled className="text-destructive">
                Изтрий
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>
    ));
  };


  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Процедури</h1>
            <Button disabled>
              <PlusCircle className="mr-2 h-4 w-4" />
              Добави процедура
            </Button>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Списък с процедури</CardTitle>
            <CardDescription>Преглед и управление на процедурите в салона.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Видимост</TableHead>
                  <TableHead>Категория</TableHead>
                  <TableHead>Име</TableHead>
                  <TableHead>Цена</TableHead>
                  <TableHead>Продължителност</TableHead>
                  <TableHead>
                    <span className="sr-only">Действия</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {renderContent()}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
