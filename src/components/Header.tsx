import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <div className="mx-auto flex max-w-7xl items-center justify-between p-6 py-9 lg:px-8">
      <Link href="/">
        <Image src="logo.svg" width="250" height="29" alt="避難所ウェブサービス" priority />
      </Link>
      <Link
        href="/register"
        className="rounded-full bg-zinc-950 px-5 py-2 text-sm font-semibold text-zinc-50"
      >
        登録する
      </Link>
    </div>
  );
}
