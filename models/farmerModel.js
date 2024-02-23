const mongoose = require("mongoose");

const farmerSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
},
  phone_number: { 
    type: String, 
    required: true },
  village: { type: String, required: true },
  state: { type: String, required: true },
  land_size: { type: Number, required: true },
  crops_grown: { type: [String], required: true },
});

const Farmer = mongoose.model("Farmer", farmerSchema);

module.exports = Farmer;
