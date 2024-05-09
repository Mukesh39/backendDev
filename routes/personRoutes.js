const express = require("express");
const router = express.Router();
const Person = require("./../Models/Person");

//above line is going to manage the various end points  /earlier it was like the so much complex things

// get for data fetching
// post for saving the data
//put for updating the data
//Now you can do the all the Crud Operations

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new Person(data);
    const response = await newPerson.save();

    console.log("data Saved");
    res.status(200).json(response);
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
