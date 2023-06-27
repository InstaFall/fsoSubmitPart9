import patients from '../../data/patients';
import {
  Entry,
  EntryWithoutId,
  Patient,
  newPatientEntry,
  ssnExcludedPatient,
} from '../types';
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

// New method to find a patient by id
const findById = (id: string): Patient | undefined => {
  return patients.find((patient) => patient.id === id);
};

// New method to add an entry to a patient's entries
const addEntry = (patient: Patient, entry: EntryWithoutId): Entry => {
  const newEntry = {
    id: uuid(),
    ...entry,
  };
  patient.entries.push(newEntry);
  return newEntry;
};

export default {
  getPatients,
  getExcludedPatients,
  addPatient,
  findById,
  addEntry,
};
