const { Rental } = require("../models/rental");
const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();
const moment = require("moment");
const { Movie } = require("../models/movie");
const Joi = require("joi");
const validate = require("../middleware/validate");

function validateReturn(req) {
  const schema = Joi.object({
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required(),
  });

  return schema.validate(req);
}
router.post("/", [auth, validate(validateReturn)], async (req, res) => {
  const rental = await Rental.lookup(req.body.customerId, req.body.movieId);

  if (!rental) {
    return res.status(404).send("Rental not found!");
  }

  if (rental.dateReturned) {
    return res.status(400).send("Rental already processed");
  }

  rental.dateReturned = Date.now();
  const rentalDays = moment().diff(rental.dateOut, "days");
  rental.rentalFee = rentalDays * rental.movie.dailyRentalRate;

  await rental.save();
  await Movie.updateOne(
    { _id: rental.movie._id },
    {
      $inc: { numberInStock: 1 },
    }
  );

  return res.status(200).send(rental);
});

module.exports = router;
