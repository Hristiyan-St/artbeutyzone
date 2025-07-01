
'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu } from 'lucide-react';
import { useAuth } from '@/context/auth-context';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import type { NavLink } from '@/lib/types';

interface MobileNavProps {
    navLinks: NavLink[];
}

export function MobileNav({ navLinks }: MobileNavProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { user, loading } = useAuth();
    
    // In a real app, you would use a library like 'next-intl' for translations.
    const t = {
        dashboard: 'Табло за управление',
        login: 'Вход',
        signup: 'Регистрация',
    }

    return (
        <>
            <div className="hidden md:flex items-center gap-2">
                {!loading && (
                    <>
                    {user ? (
                        <Button asChild>
                            <Link href="/dashboard">{t.dashboard}</Link>
                        </Button>
                    ) : (
                        <>
                        <Button variant="ghost" asChild>
                            <Link href="/login">{t.login}</Link>
                        </Button>
                        <Button asChild>
                            <Link href="/signup">{t.signup}</Link>
                        </Button>
                        </>
                    )}
                    </>
                )}
            </div>
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col">
                <div className="border-b pb-4">
                    <Link href="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                    <Image
                        src="https://firebasestorage.googleapis.com/v0/b/artbeautyzonesalon.firebasestorage.app/o/firebase_icon_28x28.png?alt=media&token=567ced69-ffb1-4297-8e04-ef56db8843b9"
                        alt="Art Beauty Zone Logo"
                        width={36}
                        height={36}
                        className="h-9 w-9"
                    />
                    <span className="text-xl font-bold">Art Beauty Zone</span>
                    </Link>
                    <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
                </div>
                
                <nav className="flex flex-col gap-4 py-4">
                {navLinks.map((link: NavLink) => (
                    <Link
                    key={link.href}
                    href={link.href}
                    className="text-lg font-medium text-muted-foreground transition-colors hover:text-primary"
                    onClick={() => setIsMobileMenuOpen(false)}
                    >
                    {link.label}
                    </Link>
                ))}
                </nav>
                <div className="mt-auto border-t pt-4">
                {!loading && (
                    <>
                    {user ? (
                        <Button asChild className="w-full">
                            <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>{t.dashboard}</Link>
                        </Button>
                    ) : (
                        <div className="flex flex-col gap-2">
                        <Button variant="outline" asChild className="w-full">
                            <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>{t.login}</Link>
                        </Button>
                        <Button asChild className="w-full">
                            <Link href="/signup" onClick={() => setIsMobileMenuOpen(false)}>{t.signup}</Link>
                        </Button>
                        </div>
                    )}
                    </>
                )}
                </div>
            </SheetContent>
            </Sheet>
        </>
    );
}
