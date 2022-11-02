import { Flex, Image } from "@chakra-ui/react";
import Link from "next/link";

export default function Header() {
  return (
    <Flex
      justify="space-between"
      w="full"
      align="center"
      py="4"
      px="12"
      bgColor="#fff"
      pos="fixed"
      top="0"
      borderBottom="1px solid"
      borderColor="gray.300"
    >
      <Link href="/">
        <Image src="/assets/logo_full.svg" alt="CandyPay" w="36" />
      </Link>
    </Flex>
  );
}
