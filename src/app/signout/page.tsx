'use client';

import Head from 'next/head';
import supabase from '@/utils/supabase';
import { useRouter } from 'next/navigation';

export default function Top() {
  const router = useRouter();

  const Logout = async (e: any) => {
    e.preventDefault();
    try {
      const { error: logoutError } = await supabase.auth.signOut();
      if (logoutError) {
        throw logoutError;
      }
      await router.push('/');
    } catch {
      alert('エラーが発生しました');
    }
  };
  return (
    <>
      <div>
        <Head>
          <title>トップページ</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
          <div>
            <form onSubmit={Logout}>
              <button type="submit">ログアウトする</button>
            </form>
          </div>
        </main>
        <footer></footer>
      </div>
    </>
  );
}
