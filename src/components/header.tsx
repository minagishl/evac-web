import Link from 'next/link';
import Image from 'next/image';
import Button from './button';
import Search from './icons/search';

export default function Header() {
  return (
    <header>
      <div className="mx-auto flex max-w-5xl select-none items-center justify-between p-6 py-9 lg:px-8">
        <Link href="/">
          <Image src="/logo.svg" width="250" height="29" alt="避難所WEB" priority className="w-32 sm:w-36" />
        </Link>
        <div className="flex space-x-5 sm:space-x-4">
          <Link href="/search" className="flex">
            <span className="py-1 text-sm font-semibold sm:px-5 sm:py-2">検索</span>
          </Link>
          <Button text="登録する" href="/register" />
        </div>
      </div>
    </header>
  );
}
