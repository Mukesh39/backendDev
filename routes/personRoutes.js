const express = require("express");
const router = express.Router();
const Person = require("./../Models/Person");
const { jwtAuthMiddleware, generateToken } = require("./../jwt");

//above line is going to manage the various end points  /earlier it was like the so much complex things

// get for data fetching
// post for saving the data
//put for updating the data
//Now you can do the all the Crud Operations

router.post("/signup", async (req, res) => {
  try {
    const data = req.body;

    const newPerson = new Person(data);
    const response = await newPerson.save();
    console.log("data Saved");
    const token = generateToken(response.username);
    console.log("Token is", token);
    res.status(200).json({ response: response, token: token });

    // you will see the response in json format with token in postman , with username and  and token there
  } catch (err) {
    //if failed it will go to catch Block

    console.log(err);
    res.status(500).json({ error: "Inetrenal servere error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // find the user by username
    const user = await Person.findOne({ username: username });

    //if user doesnot exist and password doesn't match
    if (!user || !(await user.comparePassword(password))) {
      res.status(401).json({ error: "invalid username and password" });
    }

    //generate Token

    const payload = {
      id: user.id,
      username: user.username,
    };

    const token = generateToken(payload);
    res.json({ token });
  } catch (err) {
    //if failed it will go to catch Block
    console.log(err);
    res.status(500).json({ error: "Inetrenal servere error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await Person.find();
    console.log("Data Fetched");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Inetrenal servere error" });
  }
});

// GET /profile - access user profile with token
router.get("/profile", jwtAuthMiddleware, async (req, res) => {
  try {
    const userData = req.user;
    //req.user will get from the jwt file
    // Extract user ID from the JWT payload
    console.log("User data ", userData);

    const userId = req.user.id; // Extract user ID from the JWT payload

    // Find the user by ID
    const user = await Person.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Return the user's profile data
    res.status(200).json({ user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

//read the Data
router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType; // extract the work type from  the url
    if (workType == "chef" || workType == "manager" || workType == "waiter") {
      const response = await Person.find({ work: workType });
      console.log(response);
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid work Type" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Inetrenal servere error" });
  }
});

//update the data
router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id; //extract the person id from url parameter
    const updatePersonData = req.body; /// Here you will the entire person Data in updated form with exact Id example name:Mukesh kumar Gehlot

    console.log(updatePersonData);
    const response = await Person.findByIdAndUpdate(
      personId,
      updatePersonData,
      {
        new: true, //update the document
        runValidators: true, //Run the mongoose validation (like required:true)
      }
    );

    if (!response) {
      return res.status(404).json({ error: "Person not found" });
    }

    console.log("Data updates");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Inetrenal servere error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const response = await Person.findByIdAndDelete(personId);

    if (!response) {
      return res.status(404).json({ message: "Person not found" });
    }

    console.log("Data Deleted");
    res.status(200).json({ message: "Person data delete Success" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Inetrenal servere error" });
  }
});

module.exports = router;
