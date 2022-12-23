import { client } from "@/lib/clients/web3Storage";
import axios from "axios";
import html2canvas from "html2canvas";
import { MutableRefObject } from "react";

const elementHelper = async (
  ref: MutableRefObject<any>,
  id: number | string,
  discord: string
) => {
  const url = (await html2canvas(ref.current)).toDataURL("image/png");
  const blob = await fetch(url).then((r) => r.blob());
  const data = new FormData();
  data.append("image", blob);
  const imgBB = await axios.post(
    "https://api.imgbb.com/1/upload?key=822079d074dfd089764b99744dadefc4",
    data
  );
  const img_url = imgBB.data.data.url;

  const metadata = {
    name: `Patika NFT #${id}`,
    symbol: "PATI",
    description: "Course completion NFT",
    seller_fee_basis_points: 0,
    "Discord ID": discord,
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
