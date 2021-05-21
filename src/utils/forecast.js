const request = require("postman-request");

const forecast = ({ lat, long }, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=7babd40e398f94726581478f3bc0a99e&query=" +
    lat +
    "," +
    long +
    "&units=f";
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service", undefined);
    } else if (body.error) {
      callback(body.error.info, undefined);
    } else {
      const { temperature, feelslike } = body.current;
      callback(undefined, {
        temperature,
        feelslike,
      });
    }
  });
};

module.exports = forecast;
