import Link from 'next/link';
import Image from 'next/image';
import Button from './button';
import Search from './search';

export default function Header() {
  return (
    <header>
      <div className="mx-auto flex max-w-5xl items-center justify-between p-6 py-9 lg:px-8">
        <Link href="/">
          <Image
            src="/logo.svg"
            width="250"
            height="29"
            alt="避難所ウェブサービス"
            priority
            className=" w-52 sm:w-60"
          />
        </Link>
        <div className="flex">
          <Link href="/search">
            <Search className="mr-5 mt-0.5 h-6 sm:h-9" />
          </Link>
          <Button text="登録する" href="/register" />
        </div>
      </div>
    </header>
  );
}
