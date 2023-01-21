import { Flex, Image } from "@chakra-ui/react";
import Link from "next/link";
import { Tooltip, Button, ButtonGroup } from "@chakra-ui/react";
import { truncate } from "@/utils/helpers/truncate";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import { Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";

export default function Header() {
  const [balance, setBalance] = useState<number | null>(0);
  const wallet = "BLRfNX1M2hrhMm68x3GM2fUmxgeH8f3KfrdZB3JSANpK"
  const connection = new Connection(
    "https://solana-mainnet.rpc.extrnode.com",
    "confirmed"
  );

  useEffect(() => {
    const fetchData = async () => {
      const lamportBal =  await connection.getBalance(new PublicKey(wallet));
      const solBal = lamportBal/LAMPORTS_PER_SOL;
      console.log("Solana Balance", solBal)
      setBalance(solBal)
    }
    fetchData()  
    .catch(console.error);
  }, [])


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
      <Flex>
        <ButtonGroup gap='2'>
        <Tooltip label="Click to copy wallet address">
          <Button bgColor="purple.500"
            color="white"
            rounded="full"
            fontSize="sm"
            _hover={{
              bgColor: "purple.600",
            }}
            onClick={() => {
              navigator.clipboard.writeText(wallet);
              toast.success("Wallet address copied to clipboard");
            }}>
           Wallet- {" "} {truncate(wallet)}
          </Button>
          </Tooltip>
          <Tooltip label="Each NFT mint costs 0.012 SOL">
          <Button colorScheme='teal' rounded="full">Balance- {" "}  {balance.toFixed(4)}</Button>
          </Tooltip>
        </ButtonGroup>
      </Flex>
    </Flex>
  );
}
