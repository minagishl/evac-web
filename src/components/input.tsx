interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

interface AddressProps extends InputProps {
  onAddressChange: (address: string) => void;
}

interface MemberProps extends InputProps {
  onMemberChange: (member: Members) => void;
}

interface FixtureProps extends TextareaProps {
  onFixtureChange: (member: Fixtures) => void;
}

import { useEffect, useState } from 'react';
import Select from './select';
import { Fixtures, Members } from '@/app/types';

const options = [
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
  '長野県',
  '岐阜県',
  '静岡県',
  '愛知県',
  '三重県',
  '滋賀県',
  '京都府',
  '大阪府',
  '兵庫県',
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
];

export default function Input({ className, ...props }: InputProps) {
  return (
    <input
      type="text"
      className={`mt-2 h-10 rounded-md border-2 border-zinc-800 bg-neutral-50 pl-2 placeholder:text-zinc-400 focus-visible:outline-none ${className}`}
      {...props}
    />
  );
}

export function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      className={`mt-2 h-10 resize-none rounded-md border-2 border-zinc-800 bg-neutral-50 p-2 placeholder:text-zinc-400 focus-visible:outline-none ${className}`}
      {...props}
    />
  );
}

export function Address({ className, onAddressChange, ...props }: AddressProps) {
  const [pref, setPref] = useState<string | null>(null);
  const [address, setAddress] = useState<string>('');
  const [houseNumber, setHouseNumber] = useState('');
  const [buildingName, setbuildingName] = useState('');

  useEffect(() => {
    onAddressChange(
      `${pref ? pref : ''}${address ? address : ''}${houseNumber ? houseNumber : ''} ${
        buildingName ? buildingName : ''
      }`
    );
  }, [pref, address, houseNumber, buildingName, onAddressChange]);

  return (
    <>
      <span className="pt-3 text-xs text-zinc-500">都道府県</span>
      <Select
        required
        options={options}
        text="都道府県を選択してください"
        {...(pref ? { value: pref } : {})}
        onChange={(e) => {
          setPref(e.currentTarget.value);
        }}
      />
      <span className="pt-3 text-xs text-zinc-500">市区町村</span>
      <Input value={address} required onChange={(e) => setAddress(e.currentTarget.value)} />
      <span className="pt-3 text-xs text-zinc-500">番地</span>
      <Input required onChange={(e) => setHouseNumber(e.currentTarget.value)} />
      <span className="pt-3 text-xs text-zinc-500">建物名・部屋番号</span>
      <Input onChange={(e) => setbuildingName(e.currentTarget.value)} />
    </>
  );
}

export function Member({ className, onMemberChange, ...props }: MemberProps) {
  const [age0to15, setAge0to15] = useState(0);
  const [age16to59, setAge16to59] = useState(0);
  const [age60andAbove, setAge60andAbove] = useState(0);
  const [male, setMale] = useState(0);
  const [female, setFemale] = useState(0);

  const totalAge = age0to15 + age16to59 + age60andAbove;
  const totalGender = male + female;

  useEffect(() => {
    onMemberChange({
      ShelterPopulation0to15: age0to15,
      ShelterPopulation16to59: age16to59,
      ShelterPopulation60andAbove: age60andAbove,
      ShelterPopulationMale: male,
      ShelterPopulationFemale: female,
      match: totalAge === totalGender, // true if a match is found
    });
  }, [age0to15, age16to59, age60andAbove, female, male, onMemberChange, totalAge, totalGender]);

  return (
    <>
      <span className="pt-3 text-xs text-zinc-500">0歳から15歳</span>
      <Input
        required
        type="number"
        min="0"
        onChange={(e) => setAge0to15(Number(e.target.value))}
        {...props}
      />
      <span className="pt-3 text-xs text-zinc-500">16歳から59歳</span>
      <Input
        required
        type="number"
        min="0"
        onChange={(e) => setAge16to59(Number(e.target.value))}
        {...props}
      />
      <span className="pt-3 text-xs text-zinc-500">60歳以上</span>
      <Input
        required
        type="number"
        min="0"
        onChange={(e) => setAge60andAbove(Number(e.target.value))}
        {...props}
      />
      <span className="pt-3 text-xs text-zinc-500">男性</span>
      <Input required type="number" min="0" onChange={(e) => setMale(Number(e.target.value))} {...props} />
      <span className="pt-3 text-xs text-zinc-500">女性</span>
      <Input required type="number" min="0" onChange={(e) => setFemale(Number(e.target.value))} {...props} />
      <span className="pt-3 text-xs text-zinc-600">該当する人がいない場合は0または空白にしてください</span>
      {totalAge !== totalGender && (
        <span className="pt-2 text-xs text-red-600">年齢層の合計と性別の合計が一致しません。</span>
      )}
    </>
  );
}

export function Fixture({ className, onFixtureChange, ...props }: FixtureProps) {
  const [shelterSuppliesNotNeeded, setShelterSuppliesNotNeeded] = useState('');
  const [shelterSuppliesNeeded, setShelterSuppliesNeeded] = useState('');

  useEffect(() => {
    onFixtureChange({
      ShelterSuppliesNotNeeded: shelterSuppliesNotNeeded,
      ShelterSuppliesNeeded: shelterSuppliesNeeded,
    });
  }, [onFixtureChange, shelterSuppliesNeeded, shelterSuppliesNotNeeded]);

  return (
    <>
      <span className="pt-3 text-xs text-zinc-500">必要なし</span>
      <Textarea
        {...props}
        placeholder="例）食料品、衣服"
        className={className}
        onChange={(e) => setShelterSuppliesNotNeeded(e.currentTarget.value)}
      ></Textarea>
      <span className="pt-3 text-xs text-zinc-500">必要あり</span>
      <Textarea
        {...props}
        placeholder="例）子供用パンツ"
        className={className}
        onChange={(e) => setShelterSuppliesNeeded(e.currentTarget.value)}
      ></Textarea>
    </>
  );
}

export function Remarks({ className, ...props }: TextareaProps) {
  return (
    <>
      <Textarea {...props} placeholder="例）妊婦が一人" className={className}></Textarea>
    </>
  );
}
