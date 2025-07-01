
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, LogOut, LayoutDashboard, Scissors, Package, BarChart2, Users, Calendar, Briefcase } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { signOut } from 'firebase/auth';

const adminNavItems = [
    { label: 'Табло', href: '/dashboard', icon: LayoutDashboard },
    { label: 'График', href: '/dashboard/schedule', icon: Calendar },
    { label: 'Клиенти', href: '/dashboard/clients', icon: Users },
    { label: 'Служители', href: '/dashboard/staff', icon: Briefcase },
    { label: 'Процедури', href: '/dashboard/services', icon: Scissors },
    { label: 'Промоции', href: '/dashboard/promotions', icon: Package },
    { label: 'Справки', href: '/dashboard/reports', icon: BarChart2 },
];

const userNavItems = [
    { label: 'Табло', href: '/dashboard', icon: LayoutDashboard },
    { label: 'График', href: '/dashboard/schedule', icon: Calendar },
];


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, auth, loading, isAdmin } = useAuth();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = isAdmin ? adminNavItems : userNavItems;

  const handleSignOut = () => {
    if (!auth) return;

    signOut(auth).then(() => {
        window.location.href = '/';
    }).catch(error => {
        console.error("Sign out error:", error);
        window.location.href = '/';
    });
  };

  if (loading || !user) {
    return <div className="flex min-h-screen w-full items-center justify-center">Зареждане...</div>;
  }

  const MobileNavLink = ({ href, children, ...props }: { href: string; children: React.ReactNode; [key: string]: any }) => (
    <Link
      href={href}
      onClick={() => setIsMobileMenuOpen(false)}
      {...props}
    >
      {children}
    </Link>
  );

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Image
                src="https://firebasestorage.googleapis.com/v0/b/artbeautyzonesalon.firebasestorage.app/o/firebase_icon_28x28.png?alt=media&token=567ced69-ffb1-4297-8e04-ef56db8843b9"
                alt="Art Beauty Zone Logo"
                width={36}
                height={36}
              />
              <span className="">Art Beauty Zone</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {navItems.map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="mt-auto p-4">
             <Button variant="ghost" onClick={handleSignOut} className="w-full justify-start">
                <LogOut className="mr-2 h-4 w-4" />
                Изход
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <MobileNavLink
                  href="/"
                  className="flex items-center gap-2 text-lg font-semibold mb-4"
                >
                  <Image
                    src="https://firebasestorage.googleapis.com/v0/b/artbeautyzonesalon.firebasestorage.app/o/firebase_icon_28x28.png?alt=media&token=567ced69-ffb1-4297-8e04-ef56db8843b9"
                    alt="Art Beauty Zone Logo"
                    width={36}
                    height={36}
                  />
                  <span>Art Beauty Zone</span>
                </MobileNavLink>
                {navItems.map(item => (
                    <MobileNavLink
                      key={item.href}
                      href={item.href}
                      className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                    >
                      <item.icon className="h-5 w-5" />
                      {item.label}
                    </MobileNavLink>
                ))}
              </nav>
              <div className="mt-auto">
                 <Button variant="ghost" onClick={handleSignOut} className="w-full justify-start">
                    <LogOut className="mr-2 h-4 w-4" />
                    Изход
                </Button>
              </div>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
          </div>
        </header>
        <main className="flex flex-1 flex-col p-4 lg:p-6 bg-background">
          {children}
        </main>
      </div>
    </div>
  );
}
