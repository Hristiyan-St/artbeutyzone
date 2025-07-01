'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Табло за управление</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Добре дошли!
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">Art Beauty Zone</div>
                    <p className="text-xs text-muted-foreground">
                        Това е вашият контролен панел.
                    </p>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
