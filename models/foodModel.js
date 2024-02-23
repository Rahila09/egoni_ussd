const mongoose = require("mongoose");

// Define the schema for food commodities
const foodCommoditySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, }, // Name of the commodity, e.g., Garri
    prices: [
      {
        quantity: { type: String, required: true }, // Quantity of the commodity, e.g., 1KG, 10KG
        price: { type: Number, required: true }, // Price of the commodity for the given quantity
      },
    ],
  },
  { timestamps: true }
);

// Create a model for food commodities using the schema
const FoodCommodity = mongoose.model("FoodCommodity", foodCommoditySchema);

module.exports = FoodCommodity;
