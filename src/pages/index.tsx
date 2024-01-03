import Header from '@/components/Header';
import { Card, Container, SimpleGrid, Text } from '@mantine/core';
import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

export default function Home() {
  const [shelters, setShelters] = useState([] as any[]);
  useEffect(() => {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL as string,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
    );
    supabase
      .from('shelters')
      .select('*')
      .order('id', { ascending: true })
      .then(({ data, error }) => {
        if (error) {
          console.log(error);
          return;
        }
        setShelters(data);
      });
    console.log(shelters);
  }, []);
  return (
    <div>
      <Header />
      <main className="mx-auto max-w-7xl p-6 py-9 lg:px-8">
        <div className="w-full rounded-xl bg-zinc-100 shadow-lg">
          <div className="px-5 py-6">
            <h2 className="text-lg font-semibold text-zinc-950">避難所一覧 (全{shelters.length}件)</h2>
            {shelters.length === 0 && (
              <p className="pt-2 text-sm font-medium text-zinc-900">
                現在避難所が登録されていません。画面右上の登録ボタンから登録してください
              </p>
            )}
          </div>
        </div>
      </main>
      <Container>
        <SimpleGrid cols={3}>
          {shelters.map((shelter) => (
            <Card
              shadow="sm"
              w="90%"
              mt="md"
              mx="auto"
              p="md"
              radius="md"
              withBorder
              onClick={() => {
                location.href = `/shelter/${shelter.id}`;
              }}
              style={{ cursor: 'pointer' }}
              key={shelter.id}
            >
              <Card.Section maw={'200px'} mah={'200px'}>
                <img
                  src={`https://huggingface.co/datasets/yasakoko/shelter-web/resolve/main/${
                    JSON.parse(shelter.files)[0]
                  }`}
                  style={{ width: '100%', height: '100%' }}
                />
              </Card.Section>
              <Text size="lg" fw={600} mt={'md'}>
                {shelter.shelter_name}
              </Text>
              <Text size="sm" mt={'md'}>
                {shelter.adress}
              </Text>
              <Text size="sm" mt={'md'}>
                {shelter.shelter_type}
              </Text>
            </Card>
          ))}
        </SimpleGrid>
      </Container>
    </div>
  );
}
