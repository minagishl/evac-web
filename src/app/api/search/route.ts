import { LRUCache } from 'lru-cache';
import { createClient } from '@supabase/supabase-js';

const cache = new LRUCache({
  max: 500, // The maximum size of the cache
  ttl: 1000 * 60 * 60 * 24 * 7, // how long to live in ms
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = String(searchParams.get('code'));

  // Check if the cache has the data
  const replaced = code.replace(/\-/g, '');
  let data = cache.get(replaced);

  if (data) {
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } else {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL as string,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
    );

    const { data, error } = await supabase
      .from('postal')
      .select('*')
      .eq('Postal Code', replaced)
      .order('Postal Code', { ascending: true });

    if (error && data === null) {
      console.log(error);
      return new Response('An error has occurred.', {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    const formattedData = {
      message: null,
      results: data.map((item) => ({
        address1: item.Prefecture,
        address2: item.City,
        address3: item.Area,
        kana1: item['Prefecture Kana'],
        kana2: item['City Kana'],
        kana3: item['Area Kana'],
        prefcode: item['Area Codes'].toString().slice(0, 2),
        zipcode: item['Postal Code'].toString(),
      })),
      status: 200,
    };

    cache.set(replaced, formattedData);
    return new Response(JSON.stringify(formattedData), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
