'use client';

import Head from 'next/head';
import supabase from '@/utils/supabase';
import { useState } from 'react';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConf, setPasswordConf] = useState('');

  const onSubmit = async (e: any) => {
    e.preventDefault();

    supabase.auth
      .signUp({
        email: email,
        password: password,
      })
      .then(({ data, error }) => {
        if (error) {
          throw error;
        }
        const identities = data.user?.identities;
        if (identities?.length === 0) {
          console.log('既に登録済みのユーザーです。');
          alert('既に登録済みのユーザーです。');
        } else {
          alert('登録完了メールを確認してください');
        }
      })
      .catch((error) => {
        alert('エラーが発生しました');
      });
  };

  return (
    <>
      <div>
        <Head>
          <title>新規登録画面</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
          <div>
            <form onSubmit={onSubmit}>
              <div>
                <label>メールアドレス</label>
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
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
                <button type="submit">サインアップ</button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </>
  );
}
