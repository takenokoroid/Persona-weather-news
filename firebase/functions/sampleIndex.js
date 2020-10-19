const functions = require("firebase-functions");
const fetch = require("node-fetch");
const admin = require("firebase-admin");
admin.initializeApp();

const _fetchGeoWeather = () => {
  const lat = "35.685973";
  const lon = "139.756597";
  const exclude = "current,minutely,hourly,alerts";
  const endpoint = "https://api.openweathermap.org/data/2.5/onecall";
  const appid = "YOUR API KEY";
  const url = `${endpoint}?lat=${lat}&lon=${lon}&exclude${exclude}&appid=${appid}`;

  fetch(url, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      const retval = {
        date: data.dt,
        weatherIcon: data.weather[0].icon,
      };
      return 0;
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.fetchGeoWeather = functions.pubsub
  .schedule("0 6 * * *")
  .timeZone(Asia / Tokyo)
  .onRun((content) => {
    _fetchGeoWeather;
    return null;
  });
