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

export default function Page() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-between overflow-scroll p-6 py-9 md:max-w-6xl lg:px-8">
      <div className="scrollbar relative flex w-full flex-1 flex-col overflow-scroll rounded-3xl bg-zinc-50 p-6 shadow-inner sm:p-16">
        <h1 className="px-2 text-lg font-semibold">利用規約</h1>
        <div className="flex flex-col space-y-6 px-2 pt-6 text-base font-medium">
          <p>
            本ウェブサイト（以下、「当サイト」とします）の利用にあたっては、以下の利用規約に同意する必要があります。
          </p>
          <h2 className="text-lg font-semibold">1. 利用規約の適用</h2>
          <p>当サイトを利用することにより、利用者は本利用規約に同意したものとみなされます。</p>
          <h2 className="text-lg font-semibold">2. サービスの提供</h2>
          <p>当サイトは、利用者に対して以下のサービスを提供します：</p>
          <ul>
            <li>サービスの説明</li>
            <li>利用方法の案内</li>
            <li>利用規約の提供</li>
            {/* 他の提供するサービスをリストアップ */}
          </ul>
          <h2 className="text-lg font-semibold">3. 利用者の責任</h2>
          <p>利用者は、以下の事項について責任を負うものとします：</p>
          <ul>
            <li>正確な情報の提供</li>
            <li>他の利用者への配慮</li>
            <li>当サイトの利用規約の遵守</li>
            {/* 他の利用者の責任をリストアップ */}
          </ul>
          {/* 他のセクション（利用規約の変更、免責事項、準拠法など） */}
          <p>
            本利用規約の内容は、法令等の変更または当サイトの都合により、予告なく変更することがあります。変更後の利用規約は、当サイトに掲載したときから効力を生じます。
          </p>
        </div>
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
