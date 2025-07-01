
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import GoogleIcon from '@/components/GoogleIcon';
import { useAuth } from '@/context/auth-context';
import { signInWithPopup, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';

const formSchema = z.object({
  email: z.string().email({ message: 'Моля, въведете валиден имейл.' }),
  password: z.string().min(1, { message: 'Моля, въведете парола.' }),
});

export default function LoginPage() {
  const { toast } = useToast();
  const { auth, googleProvider } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function handlePasswordReset() {
    const email = form.getValues('email');
    if (!email) {
      toast({
        variant: 'destructive',
        title: 'Имейлът е задължителен',
        description: 'Моля, въведете вашия имейл в полето, за да нулирате паролата си.',
      });
      return;
    }

    if (!auth) return;

    setIsLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      toast({
        title: 'Изпратен имейл за нулиране',
        description: 'Проверете пощата си за инструкции как да създадете нова парола.',
      });
    } catch (error: any) {
      console.error('Password Reset Error:', error);
      let errorMessage = 'Възникна грешка. Моля, опитайте отново.';
      if (error.code === 'auth/user-not-found') {
          errorMessage = 'Няма намерен потребител с този имейл.';
      }
      toast({
        variant: 'destructive',
        title: 'Грешка при нулиране на парола',
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  }


  async function handleGoogleSignIn() {
    setIsGoogleLoading(true);
    if (!auth || !googleProvider) {
      toast({
        variant: 'destructive',
        title: 'Грешка в конфигурацията',
        description: 'Вход с Google не е настроен правилно.',
      });
      setIsGoogleLoading(false);
      return;
    }
    try {
      await signInWithPopup(auth, googleProvider);
      // AuthProvider will handle the redirect on success
      toast({
        title: 'Успешен вход с Google!',
        description: 'Пренасочваме ви към административния панел.',
      });
    } catch (error: any) {
      console.error('Google Sign-In Error:', error);
      // Don't show an error if the user closes the popup
      if (error.code !== 'auth/popup-closed-by-user') {
          toast({
            variant: 'destructive',
            title: 'Грешка при вход с Google',
            description: 'Възникна грешка. Моля, опитайте отново.',
          });
      }
    } finally {
      setIsGoogleLoading(false);
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    if (!auth) {
      toast({
        variant: 'destructive',
        title: 'Грешка',
        description: 'Firebase не е инициализиран.',
      });
      setIsLoading(false);
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      toast({
        title: 'Успешен вход!',
        description: 'Пренасочваме ви към административния панел.',
      });
      // AuthProvider will handle the redirect.
    } catch (error: any)
     {
      console.error('Login Error:', error);
      let errorMessage = 'Възникна неочаквана грешка. Моля, опитайте отново.';
      // This single error code handles most cases of invalid credentials in the new SDK versions.
      if (error.code === 'auth/invalid-credential') {
        errorMessage = 'Грешен имейл или парола.';
      }
      toast({
        variant: 'destructive',
        title: 'Грешка при вход',
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Вход в Art Beauty Zone</CardTitle>
        <CardDescription>Изберете метод за вход в системата.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button variant="outline" className="w-full" onClick={handleGoogleSignIn} disabled={isLoading || isGoogleLoading}>
          {isGoogleLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <GoogleIcon className="mr-2 h-4 w-4 fill-current" />}
          Продължи с Google
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">
              Или продължи с имейл
            </span>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Имейл</FormLabel>
                  <FormControl>
                    <Input placeholder="email@example.com" {...field} disabled={isLoading || isGoogleLoading} autoComplete="email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                   <div className="flex items-center justify-between">
                    <FormLabel>Парола</FormLabel>
                    <Button
                        type="button"
                        variant="link"
                        onClick={handlePasswordReset}
                        className="p-0 h-auto text-sm"
                        disabled={isLoading || isGoogleLoading}
                    >
                        Забравена парола?
                    </Button>
                  </div>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} disabled={isLoading || isGoogleLoading} autoComplete="current-password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading || isGoogleLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Вход
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col items-center text-sm">
        <p>Нямате акаунт?</p>
        <Button variant="link" asChild className="p-0 h-auto">
          <Link href="/signup">
            Регистрирайте се тук
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
