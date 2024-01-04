'use client';

import Link from 'next/link';
import Input, { Address, Member, Fixture, Remarks } from '@/components/input';
import { Fixtures, FooterContent, Shelter, Members } from '@/app/types';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import Select from '@/components/select';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

const footerContent: FooterContent[] = [
  {
    name: 'プライバシーポリシー',
    href: '/privacy',
  },
  {
    name: 'サイトご利用にあたって',
    href: '/terms',
  },
];

export default function Page() {
  const [shelters, setShelters] = useState([] as Shelter[]);

  // Content to be sent to Supabase
  const [shelterName, setShelterName] = useState('');
  const [representativeName, setRepresentativeName] = useState('');
  const [shelterType, setShelterType] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [shelterPopulation0to15, setShelterPopulation0to15] = useState(0);
  const [shelterPopulation16to59, setShelterPopulation16to59] = useState(0);
  const [shelterPopulation60andAbove, setShelterPopulation60andAbove] = useState(0);
  const [male, setMale] = useState(0);
  const [female, setFemale] = useState(0);
  const [memberMatch, setMemberMatch] = useState(false);
  const [shelterSuppliesNotNeeded, setShelterSuppliesNotNeeded] = useState('');
  const [shelterSuppliesNeeded, setShelterSuppliesNeeded] = useState('');
  const [remarks, setRemarks] = useState('');
  // const [photo, setPhoto] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL as string,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
    );

    supabase
      .from('shelters')
      .select('*')
      .order('Id', { ascending: true })
      .then(({ data, error }) => {
        if (error) {
          console.log(error);
          return;
        }
        setShelters(data);
      });

    if (process.env.NODE_ENV === 'development') {
      console.log(shelters);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const requiredFields = () => {
    return (
      shelterName &&
      representativeName &&
      shelterType &&
      address &&
      phoneNumber &&
      memberMatch &&
      shelterSuppliesNotNeeded &&
      shelterSuppliesNeeded
    );
  };

  const handleMemberChange = (member: Members) => {
    setShelterPopulation0to15(member.ShelterPopulation0to15);
    setShelterPopulation16to59(member.ShelterPopulation16to59);
    setShelterPopulation60andAbove(member.ShelterPopulation60andAbove);
    setMale(member.ShelterPopulationMale);
    setFemale(member.ShelterPopulationFemale);
    setMemberMatch(member.match);
  };

  const handleFixtureChange = (fixture: Fixtures) => {
    setShelterSuppliesNotNeeded(fixture.ShelterSuppliesNotNeeded);
    setShelterSuppliesNeeded(fixture.ShelterSuppliesNeeded);
  };

  const handler = async () => {
    console.log('clicked');

    if (requiredFields() === false) return;

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
    );

    console.log('created supabase client with env : ', {
      url: process.env.NEXT_PUBLIC_SUPABASE_URL,
      anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    });

    const { error } = await supabase.from('shelters').insert({
      id: uuidv4(),
      shelter_name: shelterName,
      representative_name: representativeName,
      shelter_type: shelterType,
      address: address,
      phone_number: phoneNumber,
      population_age_0_15: shelterPopulation0to15,
      population_age_16_59: shelterPopulation16to59,
      population_age_60_above: shelterPopulation60andAbove,
      male_population: male,
      female_population: female,
      supplies_not_needed: shelterSuppliesNotNeeded,
      supplies_needed: shelterSuppliesNeeded,
      remarks: remarks,
      photo_url: null,
      is_emergency: false,
    });

    if (error) {
      console.log(error);
      return;
    }

    console.log('inserted data to supabase');
    router.push('/register/complete');
  };

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-between overflow-scroll p-6 py-9 md:max-w-6xl lg:px-8">
      <div className="scrollbar relative flex w-full flex-1 flex-col overflow-scroll rounded-3xl bg-zinc-50 p-6 shadow-inner sm:p-16">
        <h1 className="px-2 text-lg font-semibold">避難所の登録</h1>
        {/* Form */}
        <div className="flex flex-col space-y-6 px-2 pt-6">
          <div className="flex flex-col">
            <div className="flex space-x-1">
              <span>避難所名</span> <span className="text-base text-red-600">*</span>
            </div>
            <Input
              placeholder="例）〇〇小学校 / 〇〇家住宅"
              required
              onChange={(e) => setShelterName(e.currentTarget.value)}
            />
          </div>
          <div className="flex flex-col">
            <div className="flex space-x-1">
              <span>代表者のお名前</span> <span className="text-base text-red-600">*</span>
            </div>
            <Input
              placeholder="例）山田 太郎"
              required
              onChange={(e) => setRepresentativeName(e.currentTarget.value)}
            />
          </div>
          <div className="flex flex-col">
            <div className="flex space-x-1">
              <span>避難所の種類</span> <span className="text-base text-red-600">*</span>
            </div>
            <Select
              required
              text="避難所を選択してください"
              options={['指定避難所', '一時避難所', '一般家屋', 'その他']}
              onChange={(e) => setShelterType(e.currentTarget.value)}
            />
          </div>
          <div className="flex flex-col">
            <div className="flex space-x-1">
              <span>住所</span> <span className="text-base text-red-600">*</span>
            </div>
            <Address placeholder="例）000-0000" onAddressChange={(e) => setAddress(e)} />
          </div>
          <div className="flex flex-col">
            <div className="flex space-x-1">
              <span>電話番号</span> <span className="text-base text-red-600">*</span>
            </div>
            <Input
              placeholder="例）090-0123-4567"
              required
              onChange={(e) => setPhoneNumber(e.currentTarget.value)}
            />
            {/* 固定電話・携帯電話のMAX文字数を制限する*/}
            {phoneNumber.length > 13 && (
              <span className="pt-2 text-xs text-red-600">正しい電話番号を入力してください</span>
            )}
          </div>
          <div className="flex flex-col">
            <div className="flex space-x-1">
              <span>避難所の人数</span> <span className="text-base text-red-600">*</span>
            </div>
            <Member onMemberChange={(e) => handleMemberChange(e)} />
          </div>
          <div className="flex flex-col">
            <div className="flex space-x-1">
              <span>避難所の備品</span> <span className="text-base text-red-600">*</span>
            </div>
            <Fixture className="h-24" onFixtureChange={(e) => handleFixtureChange(e)} />
          </div>
          <div className="flex flex-col">
            <div className="flex space-x-1">
              <span>備考</span>
            </div>
            <Remarks className=" h-20" onChange={(e) => setRemarks(e.currentTarget.value)} />
          </div>
          <div className="flex flex-col">
            <button
              className="mt-2 h-10 rounded-md border-2 border-zinc-800 bg-zinc-800 px-2 text-sm font-semibold text-zinc-50 disabled:opacity-75"
              onClick={handler}
              disabled={!requiredFields()}
            >
              この内容で登録する
            </button>
          </div>
        </div>
      </div>
      <div className="py-7" />
      <div className="flex w-full max-w-5xl flex-wrap justify-between overflow-visible">
        <div className="flex flex-wrap">
          {footerContent.map((item, index) => (
            <Link key={index} href={item.href} className="mr-7 text-sm font-semibold leading-6">
              {item.name}
            </Link>
          ))}
        </div>
        <h1 className="whitespace-nowrap text-sm font-semibold leading-6">
          © {new Date().getFullYear()} Hinanjo Web Service
        </h1>
      </div>
    </main>
  );
}
