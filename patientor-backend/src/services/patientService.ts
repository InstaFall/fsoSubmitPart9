import patients from '../../data/patients';
import { Patient, newPatientEntry, ssnExcludedPatient } from '../types';
import { v1 as uuid } from 'uuid';

const getPatients = (): Patient[] => {
  return patients;
};

const getExcludedPatients = (): ssnExcludedPatient[] => {
  return patients.map(({ ssn, ...rest }) => rest);
};

const addPatient = (object: newPatientEntry): Patient => {
  const newPatient = {
    id: uuid(),
    ...object,
  };
  patients.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  getExcludedPatients,
  addPatient,
};
