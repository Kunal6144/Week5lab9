const connectDB = require("./config/db");
const express = require("express");

// express app
const app = express();
connectDB();

// Import the controllers
const {
  getPets,
  createPet,
  getPet,
  deletePet,
  patchPet,
  putPet,
} = require("./controllers/petController");

// middleware
app.use(express.json());

// Routes
app.get("/", (req, res) => res.send("API Running!"));
// GET a single pet
app.get("/api/pets/:id", getPet);
// DELETE a pet
app.delete("/api/pets/:id", deletePet);
// Update pet using PATCH
app.patch("/api/pets/:id",  patchPet);
// Update pet using PUT
app.put("/api/pets/:id", putPet);
// Add a new pet
app.post("/api/pets", createPet);
// GET all pets
app.get("/api/pets", getPets);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});