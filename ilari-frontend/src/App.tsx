import React, { useEffect, useState } from "react";
import Diaries from "./components/Diaries";
import { Diary, NewDiary } from "./types";
import diaryServices from "./services/diaryServices";
import DiaryForm from "./components/DiaryForm";

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    diaryServices.getDiaries().then((diaries) => setDiaries(diaries));
  }, []);

  const addDiary = (diary: NewDiary) => {
    diaryServices
      .createDiary(diary)
      .then((returnedDiary) => {
        setDiaries(diaries.concat(returnedDiary));
        setError(null);
      })
      .catch((error) => {
        setError(`Failed to create diary: ${error.message}`);
        setTimeout(() => setError(null), 3000);
      });
  };

  return (
    <div>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <DiaryForm addDiary={addDiary} setError={setError} />
      <Diaries diaries={diaries} />
    </div>
  );
};

export default App;
