import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  SelectChangeEvent,
} from "@mui/material";
import { Diagnosis, EntryWithoutId } from "../../types";

// AddEntryForm Component
const AddEntryForm: React.FC<{
  onFormSubmit: (values: EntryWithoutId) => void;
  diagnoses: Diagnosis[];
}> = ({ onFormSubmit, diagnoses }) => {
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [healthCheckRating, setHealthCheckRating] = useState(0);
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [employerName, setEmployerName] = useState("");
  const [discharge, setDischarge] = useState({ date: "", criteria: "" });

  const handleDischargeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDischarge({ ...discharge, [e.target.name]: e.target.value });
  };

  const handleDiagnosisChange = (event: SelectChangeEvent<string[]>) => {
    setDiagnosisCodes(event.target.value as string[]);
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    let values: EntryWithoutId;
    switch (type) {
      case "HealthCheck":
        values = {
          type: "HealthCheck",
          description,
          date,
          specialist,
          diagnosisCodes: diagnosisCodes,
          healthCheckRating,
        };
        break;
      case "Hospital":
        values = {
          type: "Hospital",
          description,
          date,
          specialist,
          diagnosisCodes: diagnosisCodes,
          discharge,
        };
        break;
      case "OccupationalHealthcare":
        values = {
          type: "OccupationalHealthcare",
          description,
          date,
          specialist,
          diagnosisCodes: diagnosisCodes,
          employerName,
        };
        break;
      default:
        values = {
          type: "HealthCheck",
          description,
          date,
          specialist,
          diagnosisCodes: diagnosisCodes,
          healthCheckRating,
        };
        break;
    }

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
      <Box>
        <FormControl component="fieldset" fullWidth>
          <Typography component="legend">Entry Type</Typography>
          <RadioGroup
            style={{ display: "flex", flexDirection: "row" }}
            aria-label="entry type"
            name="entry-type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <FormControlLabel
              value={"HealthCheck"}
              control={<Radio />}
              label="Health Check"
            />
            <FormControlLabel
              value={"Hospital"}
              control={<Radio />}
              label="Hospital"
            />
            <FormControlLabel
              value={"OccupationalHealthcare"}
              control={<Radio />}
              label="Occupational Healthcare"
            />
          </RadioGroup>
        </FormControl>
      </Box>
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
      <FormControl fullWidth>
        <InputLabel id="diagnosis-label">Diagnosis Codes</InputLabel>
        <Select
          labelId="diagnosis-label"
          multiple
          value={diagnosisCodes}
          onChange={handleDiagnosisChange}
        >
          {diagnoses.map((diagnosis) => (
            <MenuItem key={diagnosis.code} value={diagnosis.code}>
              {diagnosis.code}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {type === "Hospital" && (
        <>
          <TextField
            label="Discharge Date"
            type="date"
            value={discharge.date}
            onChange={handleDischargeChange}
            name="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Discharge Criteria"
            value={discharge.criteria}
            onChange={handleDischargeChange}
            name="criteria"
            fullWidth
          />
        </>
      )}
      {type === "OccupationalHealthcare" && (
        <TextField
          label="Employer Name"
          value={employerName}
          onChange={(e) => setEmployerName(e.target.value)}
          fullWidth
        />
      )}
      {type === "HealthCheck" && (
        <TextField
          label="Health Check Rating"
          type="number"
          value={healthCheckRating}
          onChange={(e) => setHealthCheckRating(Number(e.target.value))}
          fullWidth
        />
      )}
      <Button type="submit" variant="contained" color="primary">
        Add
      </Button>
    </Box>
  );
};

export default AddEntryForm;
