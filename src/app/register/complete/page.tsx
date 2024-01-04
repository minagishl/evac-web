'use client';

import Link from 'next/link';
import { FooterContent } from '@/app/types';

const footerContent: FooterContent[] = [
  {
    name: 'プライバシーポリシー',
    href: '/privacy',
  },
  {
    name: 'サイトご利用にあたって',
    href: '/terms',
  },
];

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-between overflow-scroll p-6 py-9 md:max-w-6xl lg:px-8">
      <div className="scrollbar relative flex w-full flex-1 flex-col overflow-scroll rounded-3xl bg-zinc-50 p-6 shadow-inner sm:p-16">
        <h1 className="px-2 text-lg font-semibold">ご登録完了いたしました。</h1>
      </div>
      <div className="py-7" />
      <div className="flex w-full max-w-5xl flex-wrap justify-between overflow-visible">
        <div className="flex flex-wrap">
          {footerContent.map((item, index) => (
            <Link key={index} href={item.href} className="mr-7 text-sm font-semibold leading-6">
              {item.name}
            </Link>
          ))}
        </div>
        <h1 className="whitespace-nowrap text-sm font-semibold leading-6">
          © {new Date().getFullYear()} Hinanjo Web Service
        </h1>
      </div>
    </main>
  );
}
