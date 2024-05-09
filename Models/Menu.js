const mongoose = require("mongoose");

//define the menuItemSchema schema

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  type: {
    type: String,
    enum: ["sweet", "spicy", "sour"],
    required: true,
  },
  is_drink: {
    type: Boolean,
    default: false,
  },

  ingredients: {
    type: [String],
    default: [],
  },

  num_sales: {
    type: Number,
    default: 0,
  },
});

//creating model after creating the schema  and then exporting this to server

const MenuItem = mongoose.model("MenuItem", menuItemSchema);
module.exports = MenuItem;
