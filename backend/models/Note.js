const mongoose = require("mongoose");
  const noteSchema = new mongoose.Schema({
   title: String,
   category: String,
   content: String,
   pinned: { type: Boolean, default: false }
});
module.exports = mongoose.model("Note", noteSchema);