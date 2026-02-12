import type { Metadata } from 'next';
import { Sora } from 'next/font/google';
import './globals.css';
import Providers from './providers';

const sora = Sora({
  variable: '--font-sora',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Trip Ready',
  description: 'Smart Packing Lists for Every Trip',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${sora.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
