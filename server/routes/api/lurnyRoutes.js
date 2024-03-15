/* eslint-disable no-undef */
const express = require("express");
const router = express.Router();
// const auth = require("../../middleware/auth");

const Lurny = require("../../models/Lurny");

router.get("/get", async (req, res) => {
  try {
    console.log("get lurnies");
    const lurnies = await Lurny.find();
    res.json(lurnies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/insert", async (req, res) => {
  try {
    const newLurny = new Lurny(req.body);
    console.log(newLurny);
    const savedLurny = await newLurny.save();
    console.log("savedLurny");
    res.status(201).json(savedLurny);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.patch("/lurnies/:id", async (req, res) => {
  try {
    const updatedLurny = await Lurny.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedLurny) {
      return res.status(404).json({ message: "Lurny not found" });
    }
    res.json(updatedLurny);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/lurnies/:id", async (req, res) => {
  try {
    const deletedLurny = await Lurny.findByIdAndDelete(req.params.id);
    if (!deletedLurny) {
      return res.status(404).json({ message: "Lurny not found" });
    }
    res.json({ message: "Lurny successfully deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
