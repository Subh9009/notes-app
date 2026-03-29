const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
 
  router.get("/", async (req, res) => {
  const notes = await Note.find().sort({ pinned: -1 });
  res.json(notes);
});

// ADD
router.post("/", async (req, res) => {
  const note = new Note(req.body);
  await note.save();
  res.json(note);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
});

// PIN
router.put("/pin/:id", async (req, res) => {
  const note = await Note.findById(req.params.id);
  note.pinned = !note.pinned;
  await note.save();
  res.json(note);
});

module.exports = router;