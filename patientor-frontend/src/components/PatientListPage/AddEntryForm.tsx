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
} from "@mui/material";
import { EntryWithoutId } from "../../types";

// AddEntryForm Component
const AddEntryForm: React.FC<{
  onFormSubmit: (values: EntryWithoutId) => void;
}> = ({ onFormSubmit }) => {
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [healthCheckRating, setHealthCheckRating] = useState(0);
  const [diagnosisCodes, setDiagnosisCodes] = useState("");
  const [employerName, setEmployerName] = useState("");
  const [discharge, setDischarge] = useState({ date: "", criteria: "" });

  const handleDischargeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDischarge({ ...discharge, [e.target.name]: e.target.value });
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
          diagnosisCodes: diagnosisCodes.split(",").map((code) => code.trim()),
          healthCheckRating,
        };
        break;
      case "Hospital":
        values = {
          type: "Hospital",
          description,
          date,
          specialist,
          diagnosisCodes: diagnosisCodes.split(",").map((code) => code.trim()),
          discharge,
        };
        break;
      case "OccupationalHealthcare":
        values = {
          type: "OccupationalHealthcare",
          description,
          date,
          specialist,
          diagnosisCodes: diagnosisCodes.split(",").map((code) => code.trim()),
          employerName,
        };
        break;
      default:
        values = {
          type: "HealthCheck",
          description,
          date,
          specialist,
          diagnosisCodes: diagnosisCodes.split(",").map((code) => code.trim()),
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
      <TextField
        label="Diagnosis Codes"
        value={diagnosisCodes}
        onChange={(e) => setDiagnosisCodes(e.target.value)}
        fullWidth
        helperText="Use commas to separate multiple codes"
      />
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
