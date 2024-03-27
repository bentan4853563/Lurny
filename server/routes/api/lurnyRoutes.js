/* eslint-disable no-undef */
const express = require("express");
const router = express.Router();
// const auth = require("../../middleware/auth");

const Lurny = require("../../models/Lurny");

router.get("/get", async (req, res) => {
  try {
    const lurnies = await Lurny.find({ shared: true }).sort({ date: -1 });
    res.json(lurnies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/my-lurnies", async (req, res) => {
  try {
    const lurnies = await Lurny.find({ user: req.body.user }).sort({
      date: -1,
      shared: 1,
    });
    res.json(lurnies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/insert", async (req, res) => {
  try {
    const newLurny = new Lurny(req.body);
    const savedLurny = await newLurny.save();
    res.status(201).json(savedLurny);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.patch("/share/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Lurny.findByIdAndUpdate(
      id,
      { shared: true }, // Set sharedField to true
      { new: true }
    );

    if (!result) {
      return res.status(404).send("Document shared.");
    }

    res.send(result);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await Lurny.findByIdAndDelete(id);

    res.send("Successfully deleted");
  } catch (error) {
    res.status(500).send("Internal Server Error");
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
