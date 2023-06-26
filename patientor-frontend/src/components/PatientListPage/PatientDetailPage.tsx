import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { apiBaseUrl } from "../../constants";
import {
  Patient,
  Entry,
  Diagnosis,
  HospitalEntry,
  HealthCheckEntry,
  OccupationalHealthcareEntry,
} from "../../types";
import { Container, Typography, Box } from "@mui/material";
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
        <Typography key={code} variant="body1">
          • {code}{" "}
          {diagnoses.find((diagnosis) => diagnosis.code === code)?.name}
        </Typography>
      )) && (
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
        <Typography key={code} variant="body1">
          • {code}{" "}
          {diagnoses.find((diagnosis) => diagnosis.code === code)?.name}
        </Typography>
      )) && (
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
        <Typography key={code} variant="body1">
          • {code}{" "}
          {diagnoses.find((diagnosis) => diagnosis.code === code)?.name}
        </Typography>
      )) && (
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

const PatientDetailPage: React.FC<{ diagnoses: Diagnosis[] }> = ({
  diagnoses,
}) => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        setPatient(data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchPatient();
  }, [id]);

  if (!patient) {
    return null;
  }

  return (
    <Container style={{ paddingLeft: 0, marginTop: "1em" }}>
      <Typography variant="h4" style={{ marginBottom: "0.5em" }}>
        {patient.name}
      </Typography>
      <Typography variant="body1">
        <strong>Date of birth:</strong> {patient.dateOfBirth}
      </Typography>
      <Typography variant="body1">
        <strong>SSN:</strong> {patient.ssn}
      </Typography>
      <Typography variant="body1">
        <strong>Gender:</strong> {patient.gender}
      </Typography>
      <Typography variant="body1">
        <strong>Occupation:</strong> {patient.occupation}
      </Typography>
      <Typography variant="h6" style={{ marginTop: "1em" }}>
        Entries
      </Typography>
      {patient.entries.map((entry) => (
        <EntryDetails key={entry.id} entry={entry} diagnoses={diagnoses} />
      ))}
    </Container>
  );
};

export default PatientDetailPage;
