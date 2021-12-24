const mongoose = require("mongoose");
const { Schema } = mongoose;

const PhotoSchema = new Schema({
  title: String,
  description: String,
  image: String,
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

const Photo = mongoose.model("Photo", PhotoSchema);

console.log("Photo.js dosyam calisti");

module.exports = Photo;
