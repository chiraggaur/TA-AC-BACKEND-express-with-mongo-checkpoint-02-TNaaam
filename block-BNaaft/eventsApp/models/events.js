const express = require("express");
const mongoose = require("mongoose");
const { Schema } = mongoose;

var eventsSchema = new Schema(
  {
    title: { type: String },
    duration: {
      startDate: { type: Number },
      endDate: { type: Number },
    },
    location: { type: String },
    category: [{ type: String }],
    remarks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Remark" }],
    summary: { type: String },
    hostName: { type: String },
    likes: { type: Number, default: 0 },
  },
  { timestamps: true }
);

var Event = mongoose.model("Event", eventsSchema);

module.exports = Event;
