const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const moment = require("moment");
const stripe = require("stripe")(
    "SECRET-STRIPE-KEY"
);
const Booking = require("../models/booking");
const Room = require("../models/room");
router.post("/bookroom", async (req, res) => {
  const { room, fromdate, todate, totalDays, totalAmount, user , token } = req.body;

  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const payment = await stripe.charges.create(
        {
          amount: totalAmount * 100,
          currency: "pln",
          customer: customer.id,
          receipt_email: token.email,
        },
        {
          idempotencyKey: uuidv4(),
        }
    );

    if (payment) {
      try {
        const newbooking = new Booking({
          userid: user._id,
          room: room.name,
          roomid: room._id,
          totalDays: totalDays,
          fromdate: moment(fromdate).format("DD-MM-YYYY"),
          todate: moment(todate).format("DD-MM-YYYY"),
          totalAmount: totalAmount,
          transactionId: "1234",
          status:'booked'
        });

        await newbooking.save(async (err, booking) => {
          const oldroom = await Room.findOne({ _id: room._id });

          oldroom.currentbookings.push({
            bookingid: booking._id,
            fromdate: moment(fromdate).format("DD-MM-YYYY"),
            todate: moment(todate).format("DD-MM-YYYY"),
            userid: user._id,
            status:'booked'
          });
          await oldroom.save();
        });

        res.send("Pomyślnie zarezerwowano pokój");
      } catch (error) {
        console.log(error);
        return res.status(400).json({ message: error });
      }
    } else {
      res.send("Wystąpił błąd podczas płatności..");
    }
  } catch (error) {
    return res.status(400).json({ message: "Coś poszło nie tak.." + error });
  }


});

router.post("/cancelbooking", async (req, res) => {
  const {bookingid,roomid } = req.body;


  try {

    const bookingitem = await Booking.findOne({_id: bookingid})
    bookingitem.status='cancelled'
    await bookingitem.save();
    const room = await Room.findOne({_id:roomid})
    const bookings = room.currentbookings
    const temp=bookings.filter(booking=>booking.bookingid.toString()!==bookingid)
    console.log(temp);
    room.currentbookings=temp;
    await room.save()

    res.send('Rezerwacja została usunięta')
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Coś poszło nie tak.." });
  }
});

router.post("/getuserbookings", async (req, res) => {
  const { userid } = req.body;
  try {
    const bookings = await Booking.find({ userid: userid }).sort({ _id: -1 });
    res.send(bookings);
  } catch (error) {
    return res.status(400).json({ message: "Coś poszło nie tak.." });
  }
});

router.get("/getallbookings", async (req, res) => {
  try {
    const bookings = await Booking.find({});
    res.send(bookings);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

module.exports = router;
