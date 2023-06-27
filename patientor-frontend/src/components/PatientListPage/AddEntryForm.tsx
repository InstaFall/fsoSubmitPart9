import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { EntryWithoutId, HealthCheckEntry } from "../../types";

// AddEntryForm Component
const AddEntryForm: React.FC<{
  onFormSubmit: (values: EntryWithoutId) => void;
}> = ({ onFormSubmit }) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [healthCheckRating, setHealthCheckRating] = useState(0);
  const [diagnosisCodes, setDiagnosisCodes] = useState("");

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const values: Omit<HealthCheckEntry, "id"> = {
      type: "HealthCheck",
      description,
      date,
      specialist,
      diagnosisCodes: diagnosisCodes.split(",").map((code) => code.trim()),
      healthCheckRating,
    };
    onFormSubmit(values);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap="1em"
      component="form"
      onSubmit={handleSubmit}
    >
      <Typography variant="h6">Add New Entry</Typography>
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
      />
      <TextField
        label="Date"
        type="date"
        value={date || ""}
        onChange={(e) => setDate(e.target.value)}
        fullWidth
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="Specialist"
        value={specialist}
        onChange={(e) => setSpecialist(e.target.value)}
        fullWidth
      />
      <TextField
        label="Health Check Rating"
        type="number"
        value={healthCheckRating}
        onChange={(e) => setHealthCheckRating(Number(e.target.value))}
        fullWidth
      />
      <TextField
        label="Diagnosis Codes"
        value={diagnosisCodes}
        onChange={(e) => setDiagnosisCodes(e.target.value)}
        fullWidth
        helperText="Use commas to separate multiple codes"
      />
      <Button type="submit" variant="contained" color="primary">
        Add
      </Button>
    </Box>
  );
};

export default AddEntryForm;
