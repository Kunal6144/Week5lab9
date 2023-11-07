const Pet = require("../models/petModel");

// Create a new pet
const createPet = async (req, res) => {
  try {
    const { name, species, age, color, weight } = req.body;
    if (!name || !species || !age || !color || !weight) {
      return res
        .status(400)
        .json({ error: "All fields (name, species, age, color, weight) are required" });
    }

    const newPet = new Pet({ name, species, age, color, weight });
    const savedPet = await newPet.save();

    res.status(201).json(savedPet);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// GET all pets
const getPets = async (req, res) => {
  try {
    const pets = await Pet.find();
    res.json(pets);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// GET a single pet by ID
const getPet = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) {
      return res.status(404).json({ error: "Pet not found" });
    }
    res.json(pet);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// DELETE a pet by ID
const deletePet = async (req, res) => {
  try {
    const pet = await Pet.findByIdAndDelete(req.params.id);
    if (!pet) {
      return res.status(404).json({ error: "Pet not found" });
    }
    res.json({ message: "Pet deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update (Patch) a single pet by ID
const patchPet = async (req, res) => {
  try {
    const pet = await Pet.findOneAndReplace(
      { _id: req.params.id },
      req.body,
      { new: true }
    );

    if (!pet) {
      return res.status(404).json({ error: "Pet not found" });
    }

    res.json(pet);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Replace (Put) a single pet by ID
const putPet = async (req, res) => {
  try {
    const pet = await Pet.findOneAndReplace(
      { _id: req.params.id },
      req.body,
      { new: true }
    );

    if (!pet) {
      return res.status(404).json({ error: "Pet not found" });
    }

    res.json(pet);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createPet,
  getPets,
  getPet,
  deletePet,
  patchPet,
  putPet,
};