const express = require("express");
const mongoose = require("mongoose");
const { Schema } = mongoose;

var remarksSchema = new Schema({
  title: { type: String }, // Corrected: use 'type' instead of 'Type'
  author: { type: String }, // Corrected: use 'type' instead of 'Type'
  likes: { type: Number }, // Corrected: use 'type' instead of 'Type'
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: "events" }, // Corrected: use 'type' instead of 'Type'
});

var Remark = mongoose.model("Remark", remarksSchema);

module.exports = Remark;
