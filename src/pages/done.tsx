import Header from '@/components/Header';
import { Container } from '@mantine/core';

export default function Done() {
  return (
    <>
      <Header />
      <Container maw={'90%'} style={{ textAlign: 'center' }} size="xs">
        <h1>登録が完了しました</h1>
      </Container>
    </>
  );
}
