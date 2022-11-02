import { CandyPay } from "@candypay/sdk";
import { keypairIdentity, Metaplex } from "@metaplex-foundation/js";
import * as anchor from "@project-serum/anchor";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import base58 from "bs58";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

const payer = anchor.web3.Keypair.fromSecretKey(
  base58.decode(process.env.PAYER_SECRET_KEY!)
);

const connection = new Connection(clusterApiUrl("devnet"));
const metaplex = new Metaplex(connection).use(keypairIdentity(payer));

const sdk = new CandyPay();

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { owner } = req.body;

  if (owner) {
    try {
      const { nft } = await metaplex.nfts().create({
        name: "My NFT",
        uri: "https://example.com/my-nft",
        sellerFeeBasisPoints: 250, // 2.5%
        tokenOwner: new PublicKey(owner),
      });

      return res.status(200).json({
        message: "NFT created",
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Error",
      });
    }
  } else {
    return res.status(400).json({
      message: "Missing Params",
    });
  }
};

export default handler;
