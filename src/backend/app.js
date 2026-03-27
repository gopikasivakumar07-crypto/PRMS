
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
// Middleware to read JSON data
app.use(express.json());

// In-memory patient data
let patients = [
  { id: 1, name: "John Doe", age: 30 },
  { id: 2, name: "Alice", age: 25 }
];

// Home route
app.get("/", (req, res) => {
  res.send("PRMS Backend Running Successfully");
});

// Get single patient
app.get("/patient", (req, res) => {
  res.json({
    id: 1,
    name: "John Doe",
    age: 30,
    condition: "Healthy"
  });
});

// Get all patients
app.get("/patients", (req, res) => {
  res.json(patients);
});

// Add new patient (POST)
app.post("/add-patient", (req, res) => {
  const newPatient = req.body;

  patients.push(newPatient);

  res.json({
    message: "Patient added successfully",
    data: newPatient
  });
});

// Delete patient (BONUS - extra marks)
app.delete("/delete-patient/:id", (req, res) => {
  const id = parseInt(req.params.id);

  patients = patients.filter(p => p.id !== id);

  res.json({
    message: "Patient deleted successfully"
  });
});

// Start server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});