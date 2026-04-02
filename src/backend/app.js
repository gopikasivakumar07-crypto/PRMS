
const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("PRMS Backend Running Successfully");
});

let patients = [];

// GET all patients
app.get("/patients", (req, res) => {
  res.json(patients);
});

// ADD patient
app.post("/patients", (req, res) => {
  const patient = {
    id: Date.now(),
    name: req.body.name,
    age: req.body.age,
    createdAt: new Date()
  };

  patients.push(patient);
  res.json(patient);
});

// SEARCH patient
app.get("/patients/search", (req, res) => {
  const name = req.query.name || "";

  const result = patients.filter(p =>
    p.name.toLowerCase().includes(name.toLowerCase())
  );

  res.json(result);
});

// UPDATE patient
app.put("/patients/:id", (req, res) => {
  const id = Number(req.params.id);
  const { name, age } = req.body;

  const patient = patients.find(p => p.id === id);

  if (patient) {
    patient.name = name;
    patient.age = age;
    res.json(patient);
  } else {
    res.status(404).json({ message: "Patient not found" });
  }
});

// DELETE patient
app.delete("/patients/:id", (req, res) => {
  const id = Number(req.params.id);

  patients = patients.filter(p => p.id !== id);

  res.json({ message: "Deleted successfully" });
});

// SERVER
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});