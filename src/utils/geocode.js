const request = require("postman-request");

const geoCode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoibWFuaXNyaW5pdmFzYSIsImEiOiJja290ZHlhdTYwYWZ4MnlxdnFucjlmZGFrIn0.MAGHjOK-PpKm2mWneysLFA&limit=1";
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location services", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find location. Try with another search", undefined);
    } else {
      const lat = body.features[0].center[1];
      const long = body.features[0].center[0];
      const location = body.features[0].place_name;
      callback(undefined, { lat, long, location });
    }
  });
};

module.exports = geoCode;
