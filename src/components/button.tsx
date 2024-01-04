import Link from 'next/link';
import * as React from 'react';

interface ButtonProps {
  text: string;
  href: string;
  className?: string;
}

export default function Button({ text, href, className }: ButtonProps): React.JSX.Element {
  return (
    <Link
      href={href}
      className={`rounded-full bg-zinc-950 px-4 py-1 text-sm font-semibold text-zinc-50 sm:px-5 sm:py-2 ${className}`}
    >
      {text}
    </Link>
  );
}
