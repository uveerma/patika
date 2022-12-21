import { NFTCard as Stuff } from "@/components/stuff";
import { Box, Button } from "@chakra-ui/react";
import html2canvas from "html2canvas";
import type { NextPage } from "next";
import { useRef, useState } from "react";

const Test: NextPage = () => {
  const ref = useRef(null);
  const [url, setUrl] = useState<string | null>(null);

  const stuff = async () => {
    const url = (await html2canvas(ref.current)).toDataURL();
    console.log(url);
    setUrl(url);
  };

  return (
    <Box p="10">
      {/* <NFTCard id={22} /> */}
      <Stuff id={22} reference={ref} />

      <Button onClick={stuff}>Download</Button>
    </Box>
  );
};

export default Test;
