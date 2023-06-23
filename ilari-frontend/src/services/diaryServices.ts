import axios from "axios";
import { Diary, NewDiary } from "../types";

const baseUrl = "http://localhost:3000/api/diaries";

const getDiaries = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createDiary = async (newDiary: NewDiary) => {
  const response = await axios.post<Diary>(baseUrl, newDiary);
  return response.data;
};

export default { getDiaries, createDiary };
