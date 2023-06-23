import { Diary } from "../types";

type DiaryProps = {
  diaries: Diary[];
};

const Diaries = ({ diaries }: DiaryProps) => {
  return (
    <div>
      {diaries.map((diary) => (
        <div key={diary.id}>
          <h2>Date: {diary.date}</h2>
          <p>Weather: {diary.weather}</p>
          <p>Visibility: {diary.visibility}</p>
          <p>Comment: {diary.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default Diaries;
