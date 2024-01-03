import Header from '@/components/Header';
import {
  Button,
  Container,
  FileInput,
  Input,
  MultiSelect,
  Select,
  Stack,
  Text,
  TextInput,
  Textarea,
} from '@mantine/core';
import { useState } from 'react';
import { Credentials, RepoDesignation, uploadFiles } from '@huggingface/hub';
import { createClient } from '@supabase/supabase-js';
//uuid4
import { nanoid } from 'nanoid';

export default function Register() {
  const [shelterName, setShelterName] = useState<string | null>('');
  const [representativeName, setRepresentativeName] = useState<string | null>('');
  const [shelterType, setShelterType] = useState<string | null>('');
  const [prefecture, setPrefecture] = useState<string | null>('');
  const [city, setCity] = useState<string | null>('');
  const [streetAddress, setStreetAddress] = useState<string | null>('');
  const [address, setAddress] = useState<string | null>('');
  const [phoneNumber, setPhoneNumber] = useState<string | null>('');
  const [numberOfyouth, setNumberOfyouth] = useState<string | null>('');
  const [numberOfAdult, setNumberOfAdult] = useState<string | null>('');
  const [numberOfElderly, setNumberOfElderly] = useState<string | null>('');
  const [numberOfMale, setNumberOfMale] = useState<string | null>('');
  const [numberOfFemale, setNumberOfFemale] = useState<string | null>('');
  const [enoughSupplies, setEnoughSupplies] = useState<string | null>('');
  const [notEnoughSupplies, setNotEnoughSupplies] = useState<string | null>('');
  const [note, setNote] = useState<string | null>('');
  const [files, setFiles] = useState<File[]>([]);
  const [fileLinks, setFileLinks] = useState('');
  const repo: RepoDesignation = {
    type: 'dataset',
    name: 'yasakoko/shelter-web',
  };
  const credentials: Credentials = {
    accessToken: process.env.NEXT_PUBLIC_HF_TOKEN || '',
  };
  const handler = async () => {
    // file object list: [{path: string, file: blob}]
    //create file id list
    console.log('clicked');
    const fileLinks = files.map((file) => {
      return `${nanoid()}.${file.name.split('.')[1]}`;
    });
    const fileObjectList = files.map((file) => ({
      path: `${fileLinks[files.indexOf(file)]}`,
      content: new Blob([file]),
    }));
    console.log('created file object list');
    await uploadFiles({
      repo,
      credentials,
      files: [...fileObjectList],
    });
    console.log('uploaded files');
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
    );
    console.log('created supabase client with env : ', {
      url: process.env.NEXT_PUBLIC_SUPABASE_URL,
      anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    });
    const { error } = await supabase.from('shelters').insert({
      shelter_name: shelterName,
      representitive: representativeName,
      shelterType: shelterType,
      adress: (prefecture || '') + (city || '') + (streetAddress || '') + (address || ''),
      phoneNumber: phoneNumber,
      numberOfYouth: numberOfyouth,
      numberOfAdult: numberOfAdult,
      numberOfElderly: numberOfElderly,
      numberOfMale: numberOfMale,
      numberOfFemale: numberOfFemale,
      enoughSupplies: enoughSupplies,
      notEnoughSupplies: notEnoughSupplies,
      note: note,
      files: fileLinks,
    });
    if (error) {
      console.log(error);
      return;
    }
    console.log('inserted data to supabase');
    location.href = '/done';
  };

  return (
    <div>
      <Header />
      <main className="mx-auto max-w-7xl p-6 py-9 lg:px-8">
        <h2 className="text-lg font-semibold text-zinc-950">避難所登録</h2>
        <Stack>
          <Input.Wrapper label="避難所名" withAsterisk description="避難所の名前を入力">
            <Input
              placeholder="例）〇〇小学校／〇〇家住宅"
              onChange={(e) => {
                setShelterName(e.currentTarget.value);
              }}
            />
          </Input.Wrapper>
          <Input.Wrapper label="代表者氏名" withAsterisk description="避難所の代表者氏名を入力">
            <Input
              placeholder="例）田中太郎"
              onChange={(e) => {
                setRepresentativeName(e.currentTarget.value);
              }}
            />
          </Input.Wrapper>

          <Input.Wrapper label="避難所の種類" withAsterisk description="避難所の種類を選択">
            <Select
              placeholder="避難所の種類を選択"
              data={['指定避難所', '一時避難所', '一般家屋', 'その他']}
              onChange={setShelterType}
            />
          </Input.Wrapper>
          <Input.Wrapper label="住所" withAsterisk description="避難所の住所を入力">
            <Select
              placeholder="都道府県"
              data={[
                '北海道',
                '青森県',
                '岩手県',
                '宮城県',
                '秋田県',
                '山形県',
                '福島県',
                '茨城県',
                '栃木県',
                '群馬県',
                '埼玉県',
                '千葉県',
                '東京都',
                '神奈川県',
                '新潟県',
                '富山県',
                '石川県',
                '福井県',
                '山梨県',
                '長野',
                '奈良県',
                '和歌山県',
                '鳥取県',
                '島根県',
                '岡山県',
                '広島県',
                '山口県',
                '徳島県',
                '香川県',
                '愛媛県',
                '高知県',
                '福岡県',
                '佐賀県',
                '長崎県',
                '熊本県',
                '大分県',
                '宮崎県',
                '鹿児島県',
                '沖縄県',
              ]}
              onChange={setPrefecture}
            />
            <Input
              placeholder="市区町村"
              onChange={(e) => {
                setCity(e.currentTarget.value);
              }}
            />
            <Input
              placeholder="番地"
              onChange={(e) => {
                setStreetAddress(e.currentTarget.value);
              }}
            />
            <Input
              placeholder="その他"
              onChange={(e) => {
                setAddress(e.currentTarget.value);
              }}
            />
          </Input.Wrapper>
          <Input.Wrapper label="電話番号" description="避難所の電話番号を入力">
            <Input
              placeholder="例）000-0000-0000"
              onChange={(e) => {
                setPhoneNumber(e.currentTarget.value);
              }}
            />
          </Input.Wrapper>
          <Input.Wrapper label="避難所の人数" withAsterisk description="避難所の人数を入力">
            <Text>0歳〜15歳</Text>
            <Input
              placeholder="例）3"
              type="number"
              onChange={(e) => {
                setNumberOfyouth(e.currentTarget.value);
              }}
            />
            <Text>16歳〜59歳</Text>
            <Input
              placeholder="例）3"
              type="number"
              onChange={(e) => {
                setNumberOfAdult(e.currentTarget.value);
              }}
            />
            <Text>60歳〜</Text>
            <Input
              placeholder="例）3"
              type="number"
              onChange={(e) => {
                setNumberOfElderly(e.currentTarget.value);
              }}
            />
            <Text>男性</Text>
            <Input
              placeholder="例）3"
              type="number"
              onChange={(e) => {
                setNumberOfMale(e.currentTarget.value);
              }}
            />
            <Text>女性</Text>
            <Input
              placeholder="例）3"
              type="number"
              onChange={(e) => {
                setNumberOfFemale(e.currentTarget.value);
              }}
            />
          </Input.Wrapper>
          <Input.Wrapper label="避難所の備品" withAsterisk description="避難所の備品を記入">
            <Text>必要なし</Text>
            <Textarea
              placeholder="例）食料、水、毛布"
              onChange={(e) => {
                setEnoughSupplies(e.currentTarget.value);
              }}
            />
            <Text>必要あり</Text>
            <Textarea
              placeholder="例）食料、水、毛布"
              onChange={(e) => {
                setNotEnoughSupplies(e.currentTarget.value);
              }}
            />
          </Input.Wrapper>
          <Input.Wrapper label="備考" description="避難所の備考を記入">
            <Textarea
              placeholder="例）妊婦一人。"
              onChange={(e) => {
                setNote(e.currentTarget.value);
              }}
            />
          </Input.Wrapper>
          <Input.Wrapper label="写真" description="避難所の写真を添付">
            <FileInput multiple onChange={setFiles} />
          </Input.Wrapper>
        </Stack>
        <Button
          mt={'sm'}
          disabled={
            shelterName === '' ||
            representativeName === '' ||
            shelterType === '' ||
            prefecture === '' ||
            city === '' ||
            streetAddress === '' ||
            numberOfyouth === '' ||
            numberOfAdult === '' ||
            numberOfElderly === '' ||
            numberOfMale === '' ||
            numberOfFemale === '' ||
            enoughSupplies === '' ||
            notEnoughSupplies === ''
          }
          onClick={(e) => {
            e.currentTarget.value = '登録中';
            e.currentTarget.disabled = true;
            handler();
          }}
        >
          登録
        </Button>
      </main>
    </div>
  );
}
