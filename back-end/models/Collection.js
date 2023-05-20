const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const collectionSchema = new Schema({
    name: String,
    caches: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Geocache"
    }
  ]
})

module.exports = mongoose.model("Collection", collectionSchema);
