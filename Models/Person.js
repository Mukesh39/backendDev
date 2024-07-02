const mongoose = require("mongoose");

const bcrypt = require("bcrypt");

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

  username: {
    required: true,
    type: String,
  },

  password: {
    required: true,
    type: String,
  },
});



PersonSchema.pre("save", async function (next) {
  const person = this;

  // Only hash the password if it is modified or new
  if (!person.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(person.password, salt);

    person.password = hashedPassword;
    // Password is now hashed
    next();
  } catch (err) {
    return next(err);
  }
});

// personSchema.methods.comparePassword this explains the methdos avaiable to person instances than applying the method called comapreMethod 

PersonSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);

    //compare(enteredpassword, storedpassword);

    return isMatch;
  } catch (error) {
    throw error;
  }
};

//creating model after creating the schema  and then exporting this to server

const Person = mongoose.model("Person", PersonSchema);
module.exports = Person;
