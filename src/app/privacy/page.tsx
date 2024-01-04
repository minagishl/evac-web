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
        <h1 className="px-2 text-lg font-semibold">プライバシーポリシー</h1>
        <div className="flex flex-col space-y-6 px-2 pt-6 text-base font-medium">
          <p>
            本ウェブサイト（以下、「当サイト」とします）は、ユーザーの個人情報を尊重し、その保護に努めます。このプライバシーポリシーでは、当サイトがユーザーの個人情報をどのように取り扱うかを説明します。
          </p>
          <h2 className="text-lg font-semibold">1. 収集する情報</h2>
          <p>当サイトでは、ユーザーが当サイトを利用する際に、以下の情報を収集することがあります：</p>
          <ul>
            <li>名前</li>
            <li>メールアドレス</li>
            <li>IPアドレス</li>
            {/* 他の収集する情報をリストアップ */}
          </ul>
          <h2 className="text-lg font-semibold">2. 情報の使用方法</h2>
          <p>当サイトが収集する情報は、以下の目的で使用されます：</p>
          <ul>
            <li>サービスの提供</li>
            <li>ユーザーサポート</li>
            <li>サービスの改善</li>
            {/* 他の使用方法をリストアップ */}
          </ul>
          {/* 他のセクション（情報の共有・開示、クッキーの使用、ユーザーの権利など） */}
          <p>
            本プライバシーポリシーの内容は、法令等の変更または当サイトの都合により、予告なく変更することがあります。変更後のプライバシーポリシーは、当サイトに掲載したときから効力を生じます。
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
