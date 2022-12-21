import Header from "@/components/Header";
import { NFTCard } from "@/components/stuff";
import { elementHelper } from "@/utils/helpers/element";
import { fetchData } from "@/utils/helpers/fetchData";
import { truncate } from "@/utils/helpers/truncate";
import { update } from "@/utils/helpers/update";
import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  GridItem,
  Link,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { NextPage } from "next";
import { useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";

const Home: NextPage = () => {
  const [pending, setPending] = useState<any[]>([]);
  const [done, setDone] = useState<any[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [id, setId] = useState<string>("1");
  const ref = useRef(null);

  const { refetch } = useQuery(["metadata"], fetchData, {
    onSuccess: (data) => {
      setDone([]);
      setPending([]);
      data.data.forEach((item: any) => {
        if (item.fields.Status === "Pending") {
          setPending((prev) => [
            ...prev,
            {
              id: item.id,
              fields: {
                Email: item.fields.Email,
                Name: item.fields.Name,
                Status: item.fields.Status,
                Wallet: item.fields.Wallet,
                Number: item.fields.Number,
              },
            },
          ]);
        } else {
          setDone((prev) => [
            ...prev,
            {
              id: item.id,
              fields: {
                Email: item.fields.Email,
                Name: item.fields.Name,
                Status: item.fields.Status,
                Wallet: item.fields.Wallet,
                Number: item.fields.Number,
              },
            },
          ]);
        }
      });
    },
  });

  const sortedData = useMemo(() => {
    return {
      pending: pending,
      done: done,
    };
  }, [done, pending]);

  const pendingArray = sortedData.pending.map((d) => {
    return {
      id: d.fields.Number,
      owner: d.fields.Wallet,
    };
  });

  const { mutate: updateMut } = useMutation(["update"], update, {
    onSuccess: (data) => {
      setLoading(false);
      refetch();
      toast.success("Successfully airdropped NFTs");
    },
  });

  const { mutateAsync } = useMutation(
    ["airdrop"],
    async ({ owner, id }: { owner: string; id: string | number }) => {
      const file = await elementHelper(ref, id);

      const { data } = await axios.post("/api/airdrop", {
        owner: owner,
        uri: file,
      });

      updateMut([
        {
          id: id,
          fields: {
            Status: "Done",
          },
        },
      ]);

      return data;
    }
  );

  return (
    <Box minH="100vh" w="full" display="flex" bg="#fafafa" flexDir="column">
      <Header />

      <Flex flexDir="column" w="full" fontWeight="500" px="24" py="32">
        <Grid
          bg="gray.100"
          roundedTop="lg"
          color="gray.700"
          py="3"
          w="full"
          templateColumns="repeat(2, 1fr)"
        >
          <GridItem justifySelf="center" alignItems="center">
            AIRDROP PENDING
            <Button
              fontWeight="500"
              rounded="full"
              h="8"
              px="6"
              mx="3"
              bgColor="purple.500"
              color="white"
              fontSize="sm"
              _hover={{
                bgColor: "purple.600",
              }}
              onClick={async () => {
                setLoading(true);

                pendingArray.forEach(async (d) => {
                  setId(d.id);
                  await mutateAsync({
                    owner: d.owner,
                    id: d.id,
                  });
                });

                setLoading(false);
              }}
              isLoading={isLoading}
              isDisabled={pendingArray.length === 0}
            >
              AIRDROP
            </Button>
          </GridItem>
          <GridItem justifySelf="center">AIRDROP DONE</GridItem>
        </Grid>
        <Flex
          w="full"
          justifyContent="space-between"
          mt="4"
          color="gray.600"
          gap="3"
          px="6"
        >
          <Flex w="50%" direction="column" gap="2">
            {sortedData.pending.map((d) => (
              <>
                <Flex key={d.id} w="full" gap="10" justifyContent="center">
                  <Text>{d.fields.Name}</Text>
                  <Tooltip label="Click to Copy">
                    <Text
                      cursor="pointer"
                      onClick={() => {
                        navigator.clipboard.writeText(d.fields.Wallet);
                      }}
                    >
                      {truncate(d.fields.Wallet)}
                    </Text>
                  </Tooltip>
                </Flex>
                <Divider />
              </>
            ))}
          </Flex>
          <Divider orientation="vertical" />
          <Flex w="50%" direction="column" gap="2">
            {sortedData.done.map((d) => (
              <>
                <Flex key={d.id} w="full" gap="10" justifyContent="center">
                  <Text>{d.fields.Name}</Text>
                  <Link
                    href={`https://solana.fm/address/${d.fields.Wallet}?cluster=devnet`}
                    isExternal
                  >
                    {truncate(d.fields.Wallet)}
                  </Link>
                </Flex>
                <Divider />
              </>
            ))}
          </Flex>
        </Flex>
      </Flex>

      <Box opacity="0%">
        <NFTCard id={id} reference={ref} />
      </Box>
    </Box>
  );
};

export default Home;
