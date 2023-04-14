const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

const HttpError = require("../models/Error");
const getCoordsForAddress = require("../utils/location");
const Place = require("../models/place");
const User = require("../models/user");

let PLACES = [
  {
    id: "p1",
    title: "Yosemite National Park",
    description:
      "One of the most visited national parks in the United States, Yosemite National Park is prized for its jaw-dropping beauty that comprises magnificent granite cliffs, mountains, waterfalls and glaciers.",
    address: "California, USA",
    location: {
      lat: 37.865101,
      lng: -119.53833,
    },
    creator: "u1",
  },
  {
    id: "p2",
    title: "Yosemite National Park",
    description:
      "One of the most visited national parks in the United States, Yosemite National Park is prized for its jaw-dropping beauty that comprises magnificent granite cliffs, mountains, waterfalls and glaciers.",
    address: "California, USA",
    location: {
      lat: 37.865101,
      lng: -119.53833,
    },
    creator: "u1",
  },
];

const getAllPlaces = async (req, res, next) => {
  let places;
  try {
    places = await Place.find();
  } catch (err) {
    return next(new HttpError("could not find place", 500));
  }
  res.json(places);
};

const getPlaceById = async (req, res, next) => {
  const pid = req.params.pid;
  let place;
  try {
    place = await Place.findById(pid);
  } catch (err) {
    return next(new HttpError("could not find place", 500));
  }

  if (place) {
    return res.json(place);
  }
  next(new HttpError("No place found having id: " + pid, 404));
};

const getPlacesByUserId = async (req, res, next) => {
  const uid = req.params.uid;
  let userPlaces;
  try {
    userPlaces = await Place.find({ creator: uid });
  } catch (err) {
    return next(new HttpError("could not find places", 500));
  }
  if (userPlaces.length) {
    return res.json(userPlaces);
  }
  next(new HttpError("No places found having creator id: " + uid, 404));
};

const addNewPlace = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid inputs", 422));
  }

  const { title, description, address, creator } = req.body;
  let location;
  try {
    location = await getCoordsForAddress(address);
  } catch (error) {
    return next(error);
  }

  const newPlace = new Place({
    title,
    description,
    address,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI5AGdo0PGo7dzOGVmjMNYr75IAZKD50WTBIafj3lOig&s",
    location,
    creator,
  });

  let user;
  try {
    user = await User.findById(creator);
  } catch (error) {
    return next(new HttpError("creating place failed", 500));
  }

  console.log(user);

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await newPlace.save({ session: sess });
    user.places.push(newPlace);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    console.log(err);
    return next(new HttpError("Could not create, please try again ...", 500));
  }
  res.status(201).json(newPlace);
};

const updatePlace = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs", 422);
  }

  const { title, description } = req.body;
  const pid = req.params.pid;
  let place;
  try {
    place = await Place.findByIdAndUpdate(
      pid,
      { title, description },
      { new: true }
    );
  } catch (err) {
    return next(new HttpError("could not update place", 500));
  }

  res.status(200).json(place);
};

const deletePlace = async (req, res, next) => {
  const placeId = req.params.pid;

  let place;
  try {
    place = await Place.findById(placeId).populate("creator");
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete place.",
      500
    );
    return next(error);
  }

  if (!place) {
    const error = new HttpError("Could not find place for this id.", 404);
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await place.remove({ session: sess });
    place.creator.places.pull(place);
    await place.creator.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "Something went wrong, could not delete place.",
      500
    );
    return next(error);
  }

  res.status(200).json({ message: "Deleted place." });
};

exports.getAllPlaces = getAllPlaces;
exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.addNewPlace = addNewPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
