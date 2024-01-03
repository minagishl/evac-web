import Header from "@/components/Header";
import { Container, Text } from "@mantine/core";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export default function Shelter() {
  const [shelter, setshelter] = useState({} as any);

  useEffect(() => {
    const id = location.pathname.split("/")[2];
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL as string,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
    );
    supabase
      .from("shelter?s")
      .select("*")
      .eq("id", id)
      .then(({ data, error }) => {
        if (error) {
          console.log(error);
          return;
        }
        setshelter(data[0]);
      });
  }, []);
  return (
    <>
      <Header />
      <Container maw={"90%"}>
        <Text size="xl" fw={600} mt={"md"}>
          避難所詳細
        </Text>
        <Text size="xl" fw={400} mt={"md"}>
          避難所名
        </Text>
        <Text size="xl" mt={"md"}>
          {shelter?.shelter_name}
        </Text>
        <Text size="xl" fw={400} mt={"md"}>
          住所
        </Text>
        <Text size="sm" mt={"md"}>
          {shelter?.adress}
        </Text>
        <Text size="xl" fw={400} mt={"md"}>
          電話番号
        </Text>
        <Text size="sm" mt={"md"}>
          {shelter?.phone_number}
        </Text>
        <Text size="xl" fw={400} mt={"md"}>
          代表者
        </Text>
        <Text size="sm" mt={"md"}>
          {shelter?.representitive}
        </Text>

        <Text size="xl" fw={400} mt={"md"}>
          避難者数
        </Text>
        <Text size="md" mt={"md"}>
          0-15歳
        </Text>
        <Text size="sm" mt={"md"}>
          {shelter?.numberOfYouth}人
        </Text>
        <Text size="md" mt={"md"}>
          16-59歳
        </Text>
        <Text size="sm" mt={"md"}>
          {shelter?.numberOfAdult}人
        </Text>
        <Text size="md" mt={"md"}>
          60歳以上
        </Text>
        <Text size="sm" mt={"md"}>
          {shelter?.numberOfElderly}人
        </Text>
        <Text size="md" mt={"md"}>
          男性
        </Text>
        <Text size="sm" mt={"md"}>
          {shelter?.numberOfMale}人
        </Text>
        <Text size="md" mt={"md"}>
          女性
        </Text>
        <Text size="sm" mt={"md"}>
          {shelter?.numberOfFemale}人
        </Text>
        <Text size="xl" fw={400} mt={"md"}>
          合計
        </Text>
        <Text size="sm" mt={"md"}>
          {parseInt(shelter?.numberOfMale) + parseInt(shelter?.numberOfFemale)}
          人
        </Text>
        <Text size="xl" fw={400} mt={"md"}>
          避難所タイプ
        </Text>
        <Text size="sm" mt={"md"}>
          {shelter?.shelter_type}
        </Text>
        <Text size="xl" fw={400} mt={"md"}>
          避難所の状況
        </Text>

        <Text size="sm" mt={"md"}>
          充分にある物資
        </Text>
        <Text size="sm" mt={"md"}>
          {shelter?.enoughSupplies}
        </Text>
        <Text size="sm" mt={"md"}>
          不足している物資
        </Text>
        <Text size="sm" mt={"md"}>
          {shelter?.notEnoughSupplies}
        </Text>
        <Text size="sm" mt={"md"}>
          その他
        </Text>
        <Text size="sm" mt={"md"}>
          {shelter?.note}
        </Text>
        <Text size="xl" fw={400} mt={"md"}>
          避難所の写真
        </Text>
        {shelter?.files &&
          JSON.parse(shelter?.files).map((file: string) => (
            <img
              src={`https://huggingface.co/datasets/yasakoko/shelter-web/resolve/main/${file}`}
              style={{ width: "300px", height: "300px" }}
              key={file}
            />
          ))}
      </Container>
    </>
  );
}
