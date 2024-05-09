const mongoose = require("mongoose");

//define the Person schema

const PersonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  age: {
    type: Number,
  },
  work: {
    type: String,
    enum: ["chef", "waiter", "manager"],
    required: true,
  },

  mobile: {
    type: String,
    required: true,
  },
  email: {
    unique: true,
    type: String,
    required: true,
  },
  address: {
    type: String,
  },

  salary: {
    type: Number,
    required: true,
  },
});

//creating model after creating the schema  and then exporting this to server

const Person = mongoose.model("Person", PersonSchema);
module.exports = Person;
