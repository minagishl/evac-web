import { Button, Group, NavLink, Paper, Text } from "@mantine/core";
import Link from "next/link";

export default function Header() {
  return (
    <Paper shadow="sm" w="90%" mt="md" mx="auto" p="md" radius="md" withBorder>
      <Group>
        <Text size="xl" fw={600}>
          避難所Web
        </Text>
        <Text
          onClick={() => {
            location.href = "/";
          }}
          style={{ cursor: "pointer" }}
        >
          避難所一覧
        </Text>
        <Button
          ml={"auto"}
          onClick={() => {
            location.href = "/register";
          }}
        >
          避難所を登録
        </Button>
      </Group>
    </Paper>
  );
}
