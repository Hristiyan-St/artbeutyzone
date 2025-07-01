
'use client';

import { useState, useEffect } from 'react';
import { MoreHorizontal, Gift, Droplets, ShieldCheck, Award, Package as PackageIcon, Sparkles, Eye, EyeOff, PlusCircle } from 'lucide-react';
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

import type { Promotion } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { getPromotions } from '@/services/promotionsService';


const iconComponents: { [key: string]: React.ElementType } = {
    Gift,
    Droplets,
    ShieldCheck,
    Award,
    Package: PackageIcon,
    Sparkles,
};

export default function PromotionsPage() {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchPromotions = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const promoList = await getPromotions();
        setPromotions(promoList);
      } catch (err: any) {
        console.error("Error fetching promotions:", err);
        setError('Неуспешно зареждане на промоциите.');
        toast({
          variant: 'destructive',
          title: 'Грешка при зареждане',
          description: 'Неуспешно зареждане на промоциите.',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchPromotions();
  }, [toast]);

  const renderContent = () => {
    if (isLoading) {
       return (
            [...Array(5)].map((_, i) => (
                <TableRow key={i}>
                    <TableCell><Skeleton className="h-5 w-5" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-5" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                    <TableCell className="hidden md:table-cell"><Skeleton className="h-5 w-full" /></TableCell>
                    <TableCell><Skeleton className="h-8 w-8" /></TableCell>
                </TableRow>
            ))
       );
    }
    
    if (promotions.length === 0) {
        return (
            <TableRow>
                <TableCell colSpan={5} className="text-center h-48">
                    <p className="text-lg font-medium">Няма намерени промоции.</p>
                     {error && <p className="text-sm text-destructive">{error}</p>}
                </TableCell>
            </TableRow>
        );
    }

    return promotions.map((promotion) => {
        const Icon = iconComponents[promotion.icon];
        return (
            <TableRow key={promotion.id} className={cn(!promotion.visible && "text-muted-foreground opacity-50")}>
                <TableCell>
                    {promotion.visible ? <Eye className="h-4 w-4 text-green-500" /> : <EyeOff className="h-4 w-4 text-muted-foreground" />}
                </TableCell>
                <TableCell>
                    {Icon && <Icon className="h-5 w-5" />}
                </TableCell>
                <TableCell className="font-medium">{promotion.title}</TableCell>
                <TableCell className="hidden md:table-cell">{promotion.description}</TableCell>
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
        );
    });
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Промоции</h1>
            <Button disabled>
              <PlusCircle className="mr-2 h-4 w-4" />
              Добави промоция
            </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Списък с промоции</CardTitle>
            <CardDescription>Преглед и управление на промоционалните пакети.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Видимост</TableHead>
                  <TableHead>Икона</TableHead>
                  <TableHead>Заглавие</TableHead>
                  <TableHead className="hidden md:table-cell">Описание</TableHead>
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
