import React, { useState } from "react";
import { NewDiary } from "../types";

type DiaryFormProps = {
  addDiary: (diary: NewDiary) => void;
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
};

const DiaryForm = ({ error, addDiary, setError }: DiaryFormProps) => {
  const [newDiary, setNewDiary] = useState<NewDiary>({
    date: "",
    weather: "sunny",
    visibility: "great",
    comment: "",
  });

  const weatherOptions = ["sunny", "rainy", "cloudy", "stormy", "windy"];
  const visibilityOptions = ["great", "good", "ok", "poor"];

  const handleDiaryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewDiary({ ...newDiary, [name]: value });
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const date = new Date(newDiary.date);
    const year = date.getFullYear();
    if (isNaN(date.getTime()) || year < 1900 || year > 2100) {
      setError("Please enter a valid date.");
      setTimeout(() => {
        setNewDiary({
          date: "",
          weather: "sunny",
          visibility: "great",
          comment: "",
        });
        setError(null);
      }, 1000);
      return;
    }
    addDiary(newDiary);
    setNewDiary({
      date: "",
      weather: "sunny",
      visibility: "great",
      comment: "",
    });
  };

  return (
    <>
      <h1>add new entry </h1>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Date:
            <input
              type="date"
              name="date"
              value={newDiary.date}
              onChange={handleDiaryChange}
            />
          </label>
        </div>
        <div>
          Weather:
          {weatherOptions.map((weather) => (
            <label key={weather}>
              <input
                type="radio"
                name="weather"
                value={weather}
                checked={newDiary.weather === weather}
                onChange={handleDiaryChange}
              />
              {weather}
            </label>
          ))}
        </div>
        <div>
          Visibility:
          {visibilityOptions.map((visibility) => (
            <label key={visibility}>
              <input
                type="radio"
                name="visibility"
                value={visibility}
                checked={newDiary.visibility === visibility}
                onChange={handleDiaryChange}
              />
              {visibility}
            </label>
          ))}
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
