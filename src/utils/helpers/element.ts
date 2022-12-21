import { client } from "@/lib/clients/web3Storage";
import html2canvas from "html2canvas";
import { MutableRefObject } from "react";

const elementHelper = async (
  ref: MutableRefObject<any>,
  id: number | string
) => {
  const url = (await html2canvas(ref.current)).toDataURL("image/png");
  const blob = await fetch(url).then((r) => r.blob());
  const file = new File([blob], "image.png", { type: "image/png" });

  const cid = await client.put([file]);
  const img_url = `https://cloudflare-ipfs.com/ipfs/${cid}/image.png`;

  const metadata = {
    name: `Patika NFT #${id}`,
    symbol: "PATI",
    description: "Course completion NFT",
    seller_fee_basis_points: 0,
    image: img_url,
    attributes: [
      {
        trait_type: "artist",
        value: "@aintweallgods",
      },
    ],
    properties: {
      files: [],
      category: "image",
      creators: [],
    },
  };

  const metadataFile = new File([JSON.stringify(metadata)], "metadata.json", {
    type: "application/json",
  });

  const metadata_cid = await client.put([metadataFile]);
  const metadata_url = `https://cloudflare-ipfs.com/ipfs/${metadata_cid}/metadata.json`;
  return metadata_url;
};

export { elementHelper };
