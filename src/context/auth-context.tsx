
'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import type { AuthContextType } from '@/lib/types';
import type { User } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, googleProvider, isFirebaseConfigured } from '@/lib/firebase';
import { isUserAdmin, findOrCreateUser } from '@/services/usersService';

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isAdmin: false,
  auth: null,
  googleProvider: null,
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isFirebaseConfigured) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        try {
            // This function will create a user doc if it doesn't exist
            await findOrCreateUser(currentUser);
            const adminStatus = await isUserAdmin(currentUser);
            setIsAdmin(adminStatus);
        } catch (error) {
             console.warn('Error in findOrCreateUser (now muted):', error);
             setIsAdmin(false); // Default to false on error
        }
      } else {
        setIsAdmin(false);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);


  // Effect for route protection
  useEffect(() => {
    if (loading) {
      return;
    }

    const isAuthPage = pathname === '/login' || pathname === '/signup';

    if (user && isAuthPage) {
      router.push('/dashboard');
    }

    if (!user && pathname.startsWith('/dashboard')) {
      router.push('/login');
    }
  }, [user, loading, pathname, router]);

  if (!isFirebaseConfigured) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-4 text-foreground">
        <div className="w-full max-w-2xl rounded-lg border border-destructive bg-card p-8 text-center shadow-xl">
          <h1 className="text-2xl font-bold text-destructive">Грешка в конфигурацията на Firebase</h1>
          <p className="mt-4 text-muted-foreground">
            Изглежда, че конфигурационните променливи за Firebase не са зададени правилно. За да работи системата за вход и регистрация, моля, направете следното:
          </p>
          <div className="mt-6 text-left bg-muted p-4 rounded-md text-sm">
            <p>1. В главната директория на проекта създайте файл с име <code className="font-mono rounded-md bg-background px-2 py-1 text-primary">.env</code></p>
            <p className="mt-2">2. Копирайте следните редове във файла и поставете вашите ключове от Firebase конзолата:</p>
            <pre className="mt-2 p-2 bg-background rounded-md overflow-x-auto text-xs">
                <code>
                    {`NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...`}
                </code>
            </pre>
          </div>
           <p className="mt-4 text-sm text-muted-foreground">
            Това е еднократна настройка. След като добавите ключовете, презаредете страницата.
          </p>
        </div>
      </div>
    );
  }

  // This global loader prevents flashing content before redirection logic kicks in.
  if (loading && (pathname.startsWith('/dashboard') || pathname.startsWith('/login') || pathname.startsWith('/signup'))) {
    return <div className="flex min-h-screen items-center justify-center">Зареждане на потребителски данни...</div>;
  }

  const value = { user, loading, isAdmin, auth, googleProvider };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

    