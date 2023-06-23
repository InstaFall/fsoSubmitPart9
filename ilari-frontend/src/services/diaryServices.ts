import axios from "axios";
import { Diary, NewDiary } from "../types";

const baseUrl = "http://localhost:3000/api/diaries";

const getDiaries = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createDiary = async (newDiary: NewDiary) => {
  try {
    const response = await axios.post<Diary>(baseUrl, newDiary);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data || "Unknown Error");
    }
    throw error;
  }
};

export default { getDiaries, createDiary };
