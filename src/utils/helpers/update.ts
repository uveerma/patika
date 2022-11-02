import axios from "axios";

const update = async (fields: any[]) => {
  const { data } = await axios.post("/api/updateData", {
    fields,
  });

  console.log(data);

  return data;
};

export { update };
