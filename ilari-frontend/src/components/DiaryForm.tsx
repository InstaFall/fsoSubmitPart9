import React, { useState } from "react";
import { NewDiary } from "../types";

type DiaryFormProps = {
  addDiary: (diary: NewDiary) => void;
};

const DiaryForm = ({ addDiary }: DiaryFormProps) => {
  const [newDiary, setNewDiary] = useState<NewDiary>({
    date: "",
    weather: "",
    visibility: "",
    comment: "",
  });

  const handleDiaryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewDiary({ ...newDiary, [name]: value });
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    addDiary(newDiary);
    setNewDiary({
      date: "",
      weather: "",
      visibility: "",
      comment: "",
    });
  };

  return (
    <>
      <h1>add new entry </h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Date:
            <input
              name="date"
              value={newDiary.date}
              onChange={handleDiaryChange}
            />
          </label>
        </div>
        <div>
          <label>
            Weather:
            <input
              name="weather"
              value={newDiary.weather}
              onChange={handleDiaryChange}
            />
          </label>
        </div>
        <div>
          <label>
            Visibility:
            <input
              name="visibility"
              value={newDiary.visibility}
              onChange={handleDiaryChange}
            />
          </label>
        </div>
        <div>
          <label>
            Comment:
            <input
              name="comment"
              value={newDiary.comment}
              onChange={handleDiaryChange}
            />
          </label>
        </div>
        <button type="submit">save</button>
      </form>
    </>
  );
};

export default DiaryForm;
