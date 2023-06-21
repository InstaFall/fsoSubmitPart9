import express from "express";
import patientService from "../services/patientService";

const router = express.Router();

router.get("/", (_req, res) => {
  console.log("all patients sent!\n");
  //res.send(patientService.getPatients());
  res.send(patientService.getExcludedPatients());
});

export default router;
