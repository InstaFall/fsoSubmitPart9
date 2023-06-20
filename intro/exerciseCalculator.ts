interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

/* interface parseExerciseResult {
  target: number,
  dailyExercises: number[]
}

const parseExerciseArguments = (args: Array<string>): parseExerciseResult => {
  if (args.length < 4) throw new Error('Not enough arguments');

  if (args.slice(2).every(arg => !isNaN(Number(arg)))) {
    return {
      target: Number(args[2]),
      dailyExercises: args.slice(3).map(arg => Number(arg)),
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
}; */

export const calculateExercises = (dailyExercises: number[], target: number): ExerciseResult => {
  const periodLength = dailyExercises.length;
  const trainingDays = dailyExercises.filter(hours => hours > 0).length;

  const totalHours = dailyExercises.reduce((a, b) => a + b, 0);
  const average = totalHours / periodLength;
  const success = average >= target;

  let rating;
  let ratingDescription;

  if (average >= target * 1.5) {
    rating = 3;
    ratingDescription = 'great job, keep it up!';
  } else if (average >= target) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  } else {
    rating = 1;
    ratingDescription = 'you need to work harder!';
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

/* try {
  const { target, dailyExercises } = parseExerciseArguments(process.argv);
  console.log(calculateExercises(dailyExercises, target));
} catch (e) {
  let message = 'Something went wrong! ';
  if (e instanceof Error) message += e.message;
  console.log(message);
} */

/* // Hardcoded
const dailyExercises = [3, 0, 2, 4.5, 0, 3, 1];
const target = 2;
 
console.log(calculateExercises(dailyExercises, target)); */