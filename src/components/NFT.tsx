import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { FC } from "react";

interface IProps {
  id: number;
}

const NFTCard: FC<IProps> = ({ id }) => {
  return (
    <Box p="10">
      <Box
        h="36rem"
        w="36rem"
        bgImage="url(/assets/bg.svg)"
        bgPos="center"
        bgSize="cover"
        display="flex"
        flexDir="column"
        alignItems="center"
        justifyContent="center"
        gap="4"
      >
        <Flex
          bgGradient="linear-gradient(180deg, #1C1E26 0%, #0D0D10 100%)"
          rounded="md"
          w="54%"
          justifyContent="center"
          alignItems="center"
          direction="column"
          fontFamily="clash"
          color="white"
        >
          <Box
            fontWeight="bold"
            fontSize="5xl"
            w="85%"
            bgImage="url(/assets/bg2.svg)"
            bgPos="center"
            bgSize="cover"
            display="grid"
            placeItems="center"
            rounded="2xl"
            marginTop="6"
            height="48"
          >
            #22
          </Box>

          <Text
            color="#2F333A"
            fontWeight="semibold"
            fontSize="3xl"
            marginTop="4"
          >
            #BuildYourPath
          </Text>

          <Flex
            alignItems="center"
            justifyContent="space-between"
            px="8"
            w="full"
            borderTop="1px solid"
            borderColor="#FFFFFF1A"
            h="20"
            marginTop="8"
          >
            <Image src="/assets/icons/solana.svg" h="24" w="24" alt="solana" />
            <Image src="/assets/icons/cross.svg" w="6" h="6" alt="cross" />
            <Image src="/assets/icons/patika.svg" w="24" h="20" alt="patika" />
          </Flex>
        </Flex>
        <Box
          bgColor="#00000021"
          h="8"
          w="40"
          rounded="full"
          fontWeight="medium"
          color="white"
          display="grid"
          placeItems="center"
          fontSize="14px"
        >
          #BuildYourPath
        </Box>
      </Box>
    </Box>
  );
};

export { NFTCard };
