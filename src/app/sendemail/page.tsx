'use client';

import Head from 'next/head';
import supabase from '@/utils/supabase';
import { useState } from 'react';

let siteUrl: URL;
try {
  siteUrl = new URL(process.env.NEXT_PUBLIC_VERCEL_URL as string);
} catch (_) {
  siteUrl = new URL('http://localhost:3000');
}

export default function Sendemail() {
  const [email, setEmail] = useState('');

  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const { error: sendEmailError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${siteUrl}/password/reset`,
      });
      if (sendEmailError) {
        throw sendEmailError;
      }
      alert('パスワード設定メールを確認してください');
    } catch (error) {
      alert('エラーが発生しました');
    }
  };

  return (
    <>
      <div>
        <Head>
          <title>パスワードリセット送信画面</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
          <div>
            <form onSubmit={onSubmit}>
              <div>
                <label>登録メールアドレス</label>
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div>
                <button type="submit">メールを送信</button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </>
  );
}
