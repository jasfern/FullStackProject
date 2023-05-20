const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const geocacheSchema = new Schema({
    name: String,
    gcode: String,
    cachetype: {
        type: String,
        enum: ["traditional", "mystery", "multi"],
        default: "traditional"
    },
    latitude: Number,
    longitude: Number,
    hint: String,
    found: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model("Geocache", geocacheSchema);
