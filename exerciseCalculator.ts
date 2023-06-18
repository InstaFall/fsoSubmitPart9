interface ExerciseResult {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
  }
  
  const calculateExercises = (dailyExercises: number[], target: number): ExerciseResult => {
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
  
  const dailyExercises = [3, 0, 2, 4.5, 0, 3, 1];
  const target = 2;
  
  console.log(calculateExercises(dailyExercises, target));