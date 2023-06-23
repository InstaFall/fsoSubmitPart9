import React, { useEffect, useState } from "react";
import Diaries from "./components/Diaries";
import { Diary, NewDiary } from "./types";
import diaryServices from "./services/diaryServices";
import DiaryForm from "./components/DiaryForm";

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);

  useEffect(() => {
    diaryServices.getDiaries().then((diaries) => setDiaries(diaries));
  }, []);

  const addDiary = (diary: NewDiary) => {
    diaryServices.createDiary(diary).then((returnedDiary) => {
      setDiaries(diaries.concat(returnedDiary));
    });
  };

  return (
    <div>
      <DiaryForm addDiary={addDiary} />
      <Diaries diaries={diaries} />
    </div>
  );
};

export default App;
