import express from 'express';
import { calculateBmi } from './calculateBmi';

const app = express();

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const { height, weight } = req.query
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

const PORT = 3003;
app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
})