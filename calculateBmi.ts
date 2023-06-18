const calculateBmi = (height: number, weight:number):string => {
    const heightInMeters = height/100;
    const bmi = weight / (heightInMeters * heightInMeters);
    console.log(bmi)
    let message = ''
    
    if(!isNaN(Number(height)) && !isNaN(Number(weight))) {
    if (bmi < 0) throw new Error('Negative BMI Value!')
    if (bmi >= 0 && bmi < 18.5) message += 'Underweight (unhealthy)'
    if (bmi >= 18.5 && bmi < 25) message += 'Normal (healthy)'
    if (bmi >= 25 && bmi < 30) message += 'Overweight (close to being unhealthy)'
    if (bmi >= 30 && bmi < 35) message += 'Obese Class I (unhealthy)'
    if (bmi >= 35 && bmi < 40) message += 'Obese Class II (very unhealthy)'
    if (bmi >= 40) message += 'Obese Class III (extremely unhealthy)'
    } else {
        throw new Error('Invalid input, Enter valid numbers!')
    }
    return message;
}

try {
console.log(calculateBmi(180,74))
} catch(error) {
    if(error instanceof Error)
    console.log('Something went wrong!',error.message)
}