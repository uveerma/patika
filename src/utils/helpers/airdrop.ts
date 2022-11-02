import axios from "axios";

const airdrop = async (owner: string) => {
  const { data } = await axios.post("/api/airdrop", {
    data: {
      owner: owner,
    },
  });

  return data;
};

export { airdrop };
