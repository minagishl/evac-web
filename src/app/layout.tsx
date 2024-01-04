import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/header';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '避難所ウェブサービス',
  description: '避難所ウェブサービスは、災害時に避難所の情報を提供するウェブサービスです。',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body
        className={`bg-background flex max-h-screen min-h-screen flex-col bg-zinc-100 font-sans antialiased ${inter.className}`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
