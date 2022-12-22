import { keypairIdentity, Metaplex } from "@metaplex-foundation/js";
import * as anchor from "@project-serum/anchor";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import base58 from "bs58";
import { NextApiHandler } from "next";

const payer = anchor.web3.Keypair.fromSecretKey(
  base58.decode(process.env.PAYER_SECRET_KEY!)
);

const connection = new Connection(clusterApiUrl("devnet"));
const metaplex = new Metaplex(connection).use(keypairIdentity(payer));

const handler: NextApiHandler = async (req, res) => {
  const { owner, uri } = req.body;

  try {
    const { nft } = await metaplex.nfts().create({
      name: "My NFT",
      uri: uri,
      sellerFeeBasisPoints: 250,
      tokenOwner: new PublicKey(owner),
    });

    return res.status(200).json({
      message: "NFT created",
      ...nft,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Error",
    });
  }
};

export default handler;
