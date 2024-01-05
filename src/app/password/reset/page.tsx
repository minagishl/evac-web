'use client';

import Head from 'next/head';
import supabase from '@/utils/supabase';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PasswordReset() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [passwordConf, setPasswordConf] = useState('');

  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const { error: passwordResetError } = await supabase.auth.updateUser({
        password,
      });
      if (passwordResetError) {
        throw passwordResetError;
      }
      await router.push('/top');
      alert('パスワード変更が完了しました');
    } catch (error) {
      alert('エラーが発生しました');
    }
  };

  return (
    <>
      <div>
        <Head>
          <title>パスワード再登録画面</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
          <div>
            <form onSubmit={onSubmit}>
              <div>
                <label>パスワード</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <label>パスワード（確認）</label>
                <input
                  type="password"
                  required
                  value={passwordConf}
                  onChange={(e) => setPasswordConf(e.target.value)}
                />
              </div>
              <div>
                <button type="submit">パスワード変更</button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </>
  );
}
