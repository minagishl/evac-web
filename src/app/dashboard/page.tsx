'use client';

import Link from 'next/link';
import Arrow from '@/components/arrow';
import { FooterContent, Shelter } from '@/app/types';
import { useEffect, useState } from 'react';
import supabase from '@/utils/supabase';
import UseWindowSize from '@/hooks/useWindowSize';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

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

  const router = useRouter();

  useEffect(() => {
    checkUser();

    async function checkUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      console.log(user);

      if (!user) {
        router.push('/');
      }
    }
  }, [router]);

  useEffect(() => {
    supabase
      .from('shelters')
      .select('*')
      .order('id', { ascending: true })
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
            <Link key={shelter.id} href={`/view/${shelter.id}`}>
              <div className="h-full px-2 pt-6">
                <div className="relative flex h-full overflow-hidden rounded-lg p-5 shadow-[rgba(17,_17,_26,_0.1)_0px_1px_7px] transition-opacity duration-200 ease-in-out hover:opacity-75 md:min-w-64 md:flex-col">
                  {width > 768 && (
                    <div className="relative mb-5 aspect-video overflow-hidden rounded-lg">
                      <Image
                        height="100"
                        width="100"
                        src={shelter.photo_url === '[]' ? shelter.photo_url : '/placeholder.svg'}
                        alt={shelter.id}
                        className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2"
                      />
                    </div>
                  )}
                  <div>
                    <h2 className="text-lg font-semibold">{shelter.shelter_name}</h2>
                    <div className="mt-1">
                      <p className="text-sm font-semibold">{shelter.address}</p>
                      <p className="text-sm font-semibold">連絡先：{shelter.phone_number}</p>
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
