import React, { useEffect, useState } from "react";
import Diaries from "./components/Diaries";
import { Diary } from "./types";
import diaryServices from "./services/diaryServices";

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);

  useEffect(() => {
    diaryServices.getDiaries().then((diaries) => setDiaries(diaries));
  }, []);

  return (
    <div>
      <Diaries diaries={diaries} />
    </div>
  );
};

export default App;
