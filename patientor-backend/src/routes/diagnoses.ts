import express from "express";
import diagnoseService from "../services/diagnoseService";

const router = express.Router();

router.get("/", (_req, res) => {
  console.log("diagnoses sent!\n");
  res.send(diagnoseService.getDiagnoses());
});

export default router;
