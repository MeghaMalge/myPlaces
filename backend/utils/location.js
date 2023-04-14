// const axios = require("axios");
// const HttpError = require("../models/Error");
// const API_KEY = "google api key here";

const getCoordsForAddress = async (address) => {
  return {
    lat: 37.865101,
    lng: -119.53833,
  };

  //   const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${API_KEY}`);

  //   const data = response.data;

  //   if( !data || data.status === "ZERO_RESULTS") {
  //     const error = new HttpError("could not find location for specified address", 422);
  //     throw error;
  //   }
  //   const coordinates = data.results[0].geometry.location;
  //   return coordinates;
};

module.exports = getCoordsForAddress;
