'use client';

import Link from 'next/link';
import Arrow from '@/components/arrow';
import { FooterContent, Shelter } from './types';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import UseWindowSize from '@/hooks/useWindowSize';
import Image from 'next/image';
import { Members } from '@/app/types';

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
  const [shelters, setShelters] = useState([] as Shelter[]);
  const { height, width } = UseWindowSize();

  useEffect(() => {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL as string,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
    );

    supabase
      .from('shelters')
      .select('*')
      .order('Id', { ascending: true })
      .then(({ data, error }) => {
        if (error) {
          console.log(error);
          return;
        }
        setShelters(data);
      });

    if (process.env.NODE_ENV === 'development') {
      console.log(shelters);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-between overflow-scroll p-6 py-9 md:max-w-6xl lg:px-8">
      <div className="scrollbar relative flex w-full flex-1 flex-col overflow-scroll rounded-3xl bg-zinc-50 p-6 shadow-inner sm:p-16">
        <h1 className="px-2 text-lg font-semibold">
          現在登録されている避難所（全{shelters.length.toLocaleString()}件）
        </h1>
        {/* User Content */}
        <div className="scrollbar flex flex-1 flex-col overflow-scroll pb-2 md:flex-row">
          {shelters.map((shelter) => (
            <Link key={shelter.Id} href={`/view/${shelter.Id}`}>
              <div className="h-full px-2 pt-6">
                <div className="relative flex h-full overflow-hidden rounded-lg p-5 shadow-[rgba(17,_17,_26,_0.1)_0px_1px_7px] transition-opacity duration-200 ease-in-out hover:opacity-75 md:min-w-64 md:flex-col">
                  {width > 768 && (
                    <div className="relative mb-5 aspect-video overflow-hidden rounded-lg">
                      <Image
                        height="100"
                        width="100"
                        src={shelter.Photo === '[]' ? shelter.Photo : '/placeholder.svg'}
                        alt={shelter.Id}
                        className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 transform"
                      />
                    </div>
                  )}
                  <div>
                    <h2 className="text-lg font-semibold">{shelter.ShelterName}</h2>
                    <div className="mt-1">
                      <p className="text-sm font-semibold">{shelter.Address}</p>
                      <p className="text-sm font-semibold">連絡先：{shelter.PhoneNumber}</p>
                    </div>
                  </div>
                  {width < 768 && (
                    <div className="absolute right-5 top-1/2 -translate-y-1/2">
                      <Arrow />
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
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
