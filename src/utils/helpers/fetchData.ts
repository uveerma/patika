import axios from "axios";

const fetchData = async () => {
  const { data } = await axios.get("/api/fetchData");

  return data;
};

export { fetchData };
