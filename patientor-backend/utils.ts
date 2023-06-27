import {
  Diagnosis,
  Discharge,
  EntryWithoutId,
  Gender,
  HealthCheckRating,
  OccupationalHealthcareEntry,
  SickLeave,
  newPatientEntry,
} from './src/types';

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
      entries: [],
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

const parseDescription = (param: unknown): string => {
  if (!isString(param)) {
    throw new Error('Incorrect or missing description');
  }
  return param;
};

const parseSpecialist = (param: unknown): string => {
  if (!isString(param)) {
    throw new Error('Incorrect or missing specialist');
  }
  return param;
};

const parseDate = (param: unknown): string => {
  if (!isString(param) || !isDate(param)) {
    throw new Error('Incorrect or missing date');
  }
  return param;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> => {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis['code']>;
  }

  return object.diagnosisCodes as Array<Diagnosis['code']>;
};

const parseString = (param: unknown): string => {
  if (!param || typeof param !== 'string') {
    throw new Error('Invalid or missing string: ' + param);
  }
  return param;
};

const parseDischarge = (param: unknown): Discharge => {
  if (
    !param ||
    typeof param !== 'object' ||
    !('date' in param) ||
    !('criteria' in param)
  ) {
    throw new Error('Invalid or missing discharge: ' + param);
  }

  return {
    date: parseDate(param.date),
    criteria: parseString(param.criteria),
  };
};

const parseEmployerName = (param: unknown): string => {
  if (!param || typeof param !== 'string') {
    throw new Error('Invalid or missing employerName: ' + param);
  }
  return param;
};

const parseSickLeave = (param: unknown): SickLeave => {
  if (
    !param ||
    typeof param !== 'object' ||
    !('startDate' in param) ||
    !('endDate' in param)
  ) {
    throw new Error('Invalid or missing sickLeave: ' + param);
  }

  return {
    startDate: parseDate(param.startDate),
    endDate: parseDate(param.endDate),
  };
};

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (param: unknown): HealthCheckRating => {
  if (
    param === undefined ||
    typeof param !== 'number' ||
    !isHealthCheckRating(param)
  ) {
    throw new Error('Invalid or missing HealthCheckRating: ' + param);
  }
  return param;
};

// toNewEntry
export const toNewEntry = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  const input = object as EntryWithoutId;

  if (
    'description' in input &&
    'date' in input &&
    'specialist' in input &&
    'type' in input
  ) {
    const newEntry = {
      description: parseDescription(input.description),
      date: parseDate(input.date),
      specialist: parseSpecialist(input.specialist),
      diagnosisCodes:
        'diagnosisCodes' in input ? parseDiagnosisCodes(input) : null,
    } as EntryWithoutId;

    switch (input.type) {
      case 'Hospital':
        return {
          ...newEntry,
          type: 'Hospital',
          discharge: parseDischarge(input.discharge),
        };
      case 'OccupationalHealthcare':
        const newOccupationalEntry = {
          ...newEntry,
          type: 'OccupationalHealthcare',
          employerName: parseEmployerName(input.employerName),
        } as OccupationalHealthcareEntry;
        if ('sickLeave' in input) {
          newOccupationalEntry.sickLeave = parseSickLeave(input.sickLeave);
        }
        return newOccupationalEntry;
      case 'HealthCheck':
        return {
          ...newEntry,
          type: 'HealthCheck',
          healthCheckRating: parseHealthCheckRating(input.healthCheckRating),
        };
      default:
        throw new Error('Invalid or missing type: ' + input);
    }
  }

  throw new Error('Invalid object: ' + object);
};
