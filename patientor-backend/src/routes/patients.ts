import express from "express";
import patientService from "../services/patientService";

const router = express.Router();

router.get("/", (_req, res) => {
  //res.send(patientService.getPatients());
  res.send(patientService.getExcludedPatients());
});

router.post("/", (req, res) => {
  const newPatient = req.body;
  res.send(patientService.addPatient(newPatient));
});

export default router;
