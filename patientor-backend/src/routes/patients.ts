import express from 'express';
import patientService from '../services/patientService';
import { toNewPatientEntry } from '../../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  //res.send(patientService.getPatients());
  res.send(patientService.getExcludedPatients());
});

router.get('/:id', (req, res) => {
  const patient = patientService
    .getPatients()
    .find((p) => p.id === req.params.id);

  if (patient) {
    res.send(patient);
  } else {
    res.status(404).send({ error: 'Unknown patient' });
  }
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatientEntry(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.send(addedPatient);
  } catch (e) {
    let message = 'Something went wrong! ';
    if (e instanceof Error) {
      message += e.message;
    }
    res.status(400).send(message);
  }
});

export default router;
