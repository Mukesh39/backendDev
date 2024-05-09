const express = require("express");

const router = express.Router();

const Menu = require("../Models/Menu");

router.get("/", async (req, res) => {
  try {
    const data = await Menu.find();
    console.log("Data Fetched");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Inetrenal servere error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const menuItem = new Menu(data);
    const response = await menuItem.save();

    console.log("data Saved");
    res.status(200).json(response);
  } catch (err) {
    //if failed it will go to catch Block

    console.log(err);
    res.status(500).json({ error: "Inetrenal servere error" });
  }
});

//you can also do for update and Delete
//you can also do for delete

// router.put("/", async (req, res) => {
//   try {
//     const data = await Menu.find();
//     console.log("Data Fetched");
//     res.status(200).json(data);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: "Inetrenal servere error" });
//   }
// });

// router.delete("/", async (req, res) => {
//   try {
//     const data = await Menu.find();
//     console.log("Data Fetched");
//     res.status(200).json(data);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: "Inetrenal servere error" });
//   }
// });

module.exports = router;

//comment added for testing purpose

