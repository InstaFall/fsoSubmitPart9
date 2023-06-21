import patients from "../../data/patients";
import { Patient, ssnExcludedPatient } from "../types";

const getPatients = (): Patient[] => {
  return patients;
};

const getExcludedPatients = (): ssnExcludedPatient[] => {
  return patients.map(({ ssn, ...rest }) => rest);
};

export default {
  getPatients,
  getExcludedPatients,
};
