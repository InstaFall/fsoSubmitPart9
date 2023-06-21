import { Gender, newPatientEntry } from './src/types';

export const toNewPatientEntry = (object: unknown): newPatientEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }
  if (
    'name' in object &&
    'dateOfBirth' in object &&
    'ssn' in object &&
    'gender' in object &&
    'occupation' in object
  ) {
    const newEntry: newPatientEntry = {
      name: parseName(object.name),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
    };
    return newEntry;
  }

  throw new Error('Incorrect data: some fields are missing');
};

const isString = (param: unknown): param is string => {
  return typeof param === 'string' || param instanceof String;
};

const isDate = (param: string): boolean => {
  return Boolean(Date.parse(param));
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};

const parseName = (param: unknown): string => {
  if (!isString(param)) {
    throw new Error('Invalid string. Parameter name: ' + param);
  }
  return param;
};

const parseDateOfBirth = (param: unknown): string => {
  if (!isString(param) || !isDate(param)) {
    throw new Error('Invalid date: ' + param);
  }
  return param;
};

const parseSsn = (param: unknown): string => {
  if (!isString(param)) {
    throw new Error('Invalid string. Parameter ssn: ' + param);
  }
  return param;
};

const parseGender = (param: unknown): Gender => {
  if (!isString(param) || !isGender(param)) {
    throw new Error('Invalid gender: ' + param);
  }
  return param;
};

const parseOccupation = (param: unknown): string => {
  if (!isString(param)) {
    throw new Error('Invalid string. Parameter occupation: ' + param);
  }
  return param;
};
