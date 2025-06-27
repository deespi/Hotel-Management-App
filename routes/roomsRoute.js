const express = require("express");
const router = express.Router();
const Room = require("../models/room");
const mongoose = require("mongoose");
router.get("/getallrooms", async (req, res) => {
  try {
    const rooms = await Room.find();
    res.send(rooms);
  } catch (error) {
    return res.status(400).json({ message: "Coś poszło nie tak.." });
  }
});

router.post("/getroombyid", async (req, res) => {
  console.log(req.body);
  try {
    const room = await Room.findOne({ _id: req.body.roomid });
    res.send(room);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.get("/getallrooms", async (req, res) => {
  console.log(req.body);
  try {
    const rooms = await Room.find({});
    res.send(rooms);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/addroom", async (req, res) => {
  const {
    room,
    capacity,
    type,
    costperday,
    image1,
    image2,
    image3,
    description,
  } = req.body;

  const newRoom = new Room({
    name: room,
    capacity,
    type,
    costperday,
    imageurls: [image1, image2, image3],
    currentbookings: [],
    description,
  });
  try {
    await newRoom.save();
    res.send("Pomyślnie utworzono nowy pokój");
  } catch (error) {
    return res.status(400).json({ error });
  }
});

module.exports = router;
