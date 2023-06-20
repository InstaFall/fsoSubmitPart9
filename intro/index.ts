import express from 'express';
import { calculateBmi } from './calculateBmi';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const { height, weight } = req.query;
    if (!height || !weight) {
        res.status(400).json({ error: 'malformatted parameters' });
        return;
    }
    const n_Height = Number(height);
    const n_Weight = Number(weight);

    if (isNaN(n_Height) || isNaN(n_Weight)) {
        res.status(400).json({ error: 'Malformatted parameters' });
        return;
    }

    try {
        const bmi = calculateBmi(n_Height, n_Weight);
        res.json({ weight: n_Weight, height: n_Height, bmi });
    } catch (e) {
        res.status(500).json({ error: 'malformatted parameters' });
    }
});

app.post('/exercises', (req, res) => {
    const { daily_exercises, target } = req.body;

    if (!daily_exercises || !target) {
        return res.status(400).json({
            error: 'parameters missing'
        });
    }

    if (!Array.isArray(daily_exercises) || isNaN(target)) {
        return res.status(400).json({
            error: 'malformatted parameters'
        });
    }

    // check if daily_exercises array contains Numbers
    if (!daily_exercises.every((e) => typeof e === 'number' && isFinite(e))) {
        return res.status(400).json({
            error: 'malformatted parameters',
        });
    }

    try {
        const result = calculateExercises(daily_exercises, Number(target));
        return res.json(result);
    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
});

const PORT = 3003;
app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
});