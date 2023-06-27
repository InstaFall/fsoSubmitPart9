import { Box, Typography } from "@mui/material";
import {
  Diagnosis,
  Entry,
  HealthCheckEntry,
  HospitalEntry,
  OccupationalHealthcareEntry,
} from "../../types";
import { Favorite, LocalHospital, Work } from "@mui/icons-material";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

// HospitalEntryDetails Component
const HospitalEntryDetails: React.FC<{
  entry: HospitalEntry;
  diagnoses: Diagnosis[];
}> = ({ entry, diagnoses }) => {
  return (
    <Box border={1} borderRadius={2} p={2} mb={2}>
      <Typography variant="h6">
        <LocalHospital /> Hospital Entry
      </Typography>
      <Typography variant="body1">
        {entry.date} {entry.description}
      </Typography>
      {entry.diagnosisCodes?.map((code) => (
        <Typography key={code} variant="body2">
          • {code}{" "}
          {diagnoses.find((diagnosis) => diagnosis.code === code)?.name}
        </Typography>
      ))}
      {entry.diagnosisCodes && (
        <Typography variant="body2">diagnose by {entry.specialist}</Typography>
      )}
      {entry.discharge && (
        <Typography variant="body2">
          Discharged on: {entry.discharge.date}
          <br />
          Criteria: {entry.discharge.criteria}
        </Typography>
      )}
    </Box>
  );
};

// OccupationalHealthcareEntryDetails Component
const OccupationalHealthcareEntryDetails: React.FC<{
  entry: OccupationalHealthcareEntry;
  diagnoses: Diagnosis[];
}> = ({ entry, diagnoses }) => {
  return (
    <Box border={1} borderRadius={2} p={2} mb={2}>
      <Typography variant="h6">
        <Typography variant="h6">
          <Work /> {entry.employerName}
        </Typography>
      </Typography>
      <Typography variant="body1">
        {entry.date} {entry.description}
      </Typography>
      {entry.diagnosisCodes?.map((code) => (
        <Typography key={code} variant="body2">
          • {code}{" "}
          {diagnoses.find((diagnosis) => diagnosis.code === code)?.name}
        </Typography>
      ))}
      {entry.diagnosisCodes && (
        <Typography variant="body2">diagnose by {entry.specialist}</Typography>
      )}
      {entry.sickLeave && (
        <Typography variant="body1">
          Sick leave from {entry.sickLeave.startDate} to{" "}
          {entry.sickLeave.endDate}
        </Typography>
      )}
    </Box>
  );
};

const HealthCheckEntryDetails: React.FC<{
  entry: HealthCheckEntry;
  diagnoses: Diagnosis[];
}> = ({ entry, diagnoses }) => {
  const getIconColor = (rating: number): "green" | "yellow" | "red" => {
    switch (rating) {
      case 0:
        return "green"; // green
      case 1:
        return "yellow"; // yellow
      case 2:
        return "red"; // red
      default:
        return "red";
    }
  };

  return (
    <Box border={1} borderRadius={2} p={2} mb={2}>
      <Typography variant="h6">Health Check Entry</Typography>
      <Typography variant="body1">
        {entry.date} {entry.description}
      </Typography>
      {entry.diagnosisCodes?.map((code) => (
        <Typography key={code} variant="body2">
          • {code}{" "}
          {diagnoses.find((diagnosis) => diagnosis.code === code)?.name}
        </Typography>
      ))}
      {entry.diagnosisCodes && (
        <Typography variant="body2">diagnose by {entry.specialist}</Typography>
      )}
      <Box display="flex" alignItems="center">
        <Typography variant="body2">
          Health Check Rating: {entry.healthCheckRating}
        </Typography>
        <Favorite
          style={{
            color: getIconColor(entry.healthCheckRating),
            marginLeft: "10px",
          }}
        />
      </Box>
    </Box>
  );
};

type EntryDetailsProps = {
  entry: Entry;
  diagnoses: Diagnosis[];
};

const EntryDetails = ({ entry, diagnoses }: EntryDetailsProps) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntryDetails entry={entry} diagnoses={diagnoses} />;
    case "OccupationalHealthcare":
      return (
        <OccupationalHealthcareEntryDetails
          entry={entry}
          diagnoses={diagnoses}
        />
      );
    case "HealthCheck":
      return <HealthCheckEntryDetails entry={entry} diagnoses={diagnoses} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
