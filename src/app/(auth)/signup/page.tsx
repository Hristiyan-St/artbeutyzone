
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
import { signInWithPopup, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { createUserDocumentFromSignup } from '@/services/usersService';


const formSchema = z.object({
  name: z.string().min(2, { message: 'Името трябва да е поне 2 символа.' }),
  email: z.string().email({ message: 'Моля, въведете валиден имейл.' }),
  phone: z.string().min(10, { message: 'Телефонният номер трябва да е поне 10 цифри.' }),
  password: z.string().min(6, { message: 'Паролата трябва да е поне 6 символа.' }),
});

export default function SignupPage() {
  const { toast } = useToast();
  const { auth, googleProvider } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
    },
  });
  
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
      // AuthProvider will handle the redirect
      toast({
        title: 'Успешна регистрация с Google!',
        description: 'Пренасочваме ви към административния панел.',
      });
    } catch (error: any) {
      console.error('Google Sign-In Error:', error);
       // Don't show an error if the user closes the popup
       if (error.code !== 'auth/popup-closed-by-user') {
          toast({
            variant: 'destructive',
            title: 'Грешка при регистрация с Google',
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
      const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
      const { user } = userCredential;

      // Update the user's profile in Firebase Auth and create their document in Firestore
      await Promise.all([
        updateProfile(user, { displayName: values.name }),
        createUserDocumentFromSignup(user, { name: values.name, phone: values.phone })
      ]);

      toast({
        title: 'Успешна регистрация!',
        description: 'Пренасочваме ви към административния панел.',
      });
      // AuthProvider will handle the redirect.
    } catch (error: any) {
      console.error('Signup Error:', error);
      let errorMessage = 'Възникна неочаквана грешка. Моля, опитайте отново.';
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'Този имейл вече е регистриран.';
      }
      toast({
        variant: 'destructive',
        title: 'Грешка при регистрация',
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Създаване на профил</CardTitle>
        <CardDescription>Изберете метод за регистрация в системата.</CardDescription>
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
              Или се регистрирай с имейл
            </span>
          </div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Име</FormLabel>
                  <FormControl>
                    <Input placeholder="Иван Иванов" {...field} disabled={isLoading || isGoogleLoading} autoComplete="name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Телефонен номер</FormLabel>
                  <FormControl>
                    <Input placeholder="0888123456" {...field} disabled={isLoading || isGoogleLoading} autoComplete="tel" />
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
                  <FormLabel>Парола</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} disabled={isLoading || isGoogleLoading} autoComplete="new-password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading || isGoogleLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Регистрация
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col items-center text-sm">
        <p>Вече имате акаунт?</p>
        <Button variant="link" asChild className="p-0 h-auto">
          <Link href="/login">
            Влезте от тук
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
