import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { apiBaseUrl } from "../../constants";
import { Patient, Entry } from "../../types";
import { Container, Typography, Box } from "@mui/material";

type EntryDetailsProps = {
  entry: Entry;
};

const EntryDetails = ({entry}:EntryDetailsProps) => {
  return (
    <Box border={1} borderRadius={2} p={2} mb={2}>
      <Typography variant="body1">{entry.date} {entry.description}</Typography>
      {entry.diagnosisCodes?.map((code) => (
        <Typography key={code} variant="body1">• {code}</Typography>
      ))}
    </Box>
  );
};

const PatientDetailPage = () => {
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
      {patient.entries.map(entry => (
        <EntryDetails key={entry.id} entry={entry} />
      ))}
    </Container>
  );
};

export default PatientDetailPage;
