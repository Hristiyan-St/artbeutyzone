import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Providers } from './providers';


const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'Art Beauty Zone: Laser & Body Care',
  description:
    'Art Beauty Zone - вашето студио за красота във Варна. Предлагаме лазерна епилация, LPG масаж, мадеротерапия, физиотерапия и други процедури за лице и тяло. Запазете час сега!',
  keywords: 'лазерна епилация Варна, LPG масаж Варна, физиотерапия Варна, мадеротерапия, радиочестотен лифтинг, козметично студио Варна, Art Beauty Zone',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
      </head>
      <body className={cn('min-h-screen bg-background font-body antialiased', poppins.variable)}>
        <Providers>
            {children}
        </Providers>
      </body>
    </html>
  );
}
