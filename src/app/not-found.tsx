'use client';

import Button from '@/components/button';

export default function CustomErrorPage() {
  return (
    <div className="absolute top-0 z-50 flex h-screen w-screen flex-col items-center justify-center bg-zinc-100">
      <h1 className="text-lg font-semibold">お探しのページが見つかりませんでした</h1>
      <Button text="トップに戻る" href="/" className="mt-3" />
    </div>
  );
}
