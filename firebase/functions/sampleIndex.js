const functions = require("firebase-functions");
const fetch = require("node-fetch");

const _geoweather = (req, res) => {
  const latlon = req.headers["x-appengine-citylatlong"];
  const lat = latlon.split(",")[0];
  const lon = latlon.split(",")[1];
  const endpoint = "https://api.openweathermap.org/data/2.5/weather";
  const appid = "ここにOpenWeahterAPIキーを入れる";
  const url = `${endpoint}?lat=${lat}&lon=${lon}&appid=${appid}`;
};
