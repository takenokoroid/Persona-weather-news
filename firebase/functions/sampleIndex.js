//process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8080'
//process.env.GCLOUD_PROJECT = 'MY_PROJECT'

const functions = require("firebase-functions");
const fetch = require("node-fetch");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

const db = admin.firestore();

const _setGeoWeather = (data) => {
  data.daily.forEach((elem, index) => {
    const docRef = db.collection("weather").doc(`${index}`);
    docRef.set({
      date: elem.dt,
      weatherIcon: elem.weather[0].icon,
    });
  });
};

const _fetchGeoWeather = async () => {
  const lat = "35.685973";
  const lon = "139.756597";
  const exclude = "current,minutely,hourly,alerts";
  const endpoint = "https://api.openweathermap.org/data/2.5/onecall";
  const appid = "YOUR API KEY";
  const url = `${endpoint}?lat=${lat}&lon=${lon}&exclude=${exclude}&appid=${appid}`;
  let weatherJSON = "ok";
  const response = await fetch(url, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      weatherJSON = data;
      return weatherJSON;
    })
    .catch((err) => {
      console.log(err);
    });
  return response;
};

exports.date = functions.https.onRequest((req, res) => {
  const val = _fetchGeoWeather().then((response) => {
    _setGeoWeather(response);
    return res.send("send");
  });
});

/*
exports.fetchGeoWeather = functions.pubsub
  .schedule("0 6 * * *")
  .timeZone("Asia/Tokyo")
  .onRun((content) => {
    return _fetchGeoWeather;
  });
*/
