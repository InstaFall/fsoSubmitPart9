import axios from "axios";

const baseUrl = "http://localhost:3000/api/diaries";

const getDiaries = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

export default { getDiaries };
