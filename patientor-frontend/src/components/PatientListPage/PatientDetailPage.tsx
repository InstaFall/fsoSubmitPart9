import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios, { isAxiosError } from "axios";
import { apiBaseUrl } from "../../constants";
import { Patient, Diagnosis, EntryWithoutId, Entry } from "../../types";
import { Container, Typography, Box, Divider } from "@mui/material";
import EntryDetails from "./EntryDetails";
import AddEntryForm from "./AddEntryForm";
import patientService from "../../services/patients";

const PatientDetailPage: React.FC<{ diagnoses: Diagnosis[] }> = ({
  diagnoses,
}) => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [error, setError] = useState<string | null>(null);

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

  const addNewEntry = async (values: EntryWithoutId) => {
    try {
      const newEntry = await patientService.addNewEntry(values, id);
      setPatient((oldPatient) =>
        oldPatient
          ? { ...oldPatient, entries: [...oldPatient.entries, newEntry] }
          : null
      );
    } catch (e) {
      let message = "Error: ";
      console.log(e);
      if (isAxiosError(e)) message += e.response?.data;
      setError(message);
    }
  };

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

      {error && (
        <Typography variant="body2" color="error">
          {error}
        </Typography>
      )}
      <Divider style={{ marginBottom: "1em" }} />
      <AddEntryForm onFormSubmit={addNewEntry} diagnoses={diagnoses} />
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
