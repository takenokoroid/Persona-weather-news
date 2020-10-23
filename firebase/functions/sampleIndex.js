//process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8080'
//process.env.GCLOUD_PROJECT = 'MY_PROJECT'

const functions = require("firebase-functions");
const fetch = require("node-fetch");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

const db = admin.firestore();


const _setGeoWeather = (data) => {
  const docRef = db.collection("weather").doc("one");
  docRef.set({
    date: data.daily[0].dt,
    weatherIcon: data.daily[0].weather[0].icon,
  });
};

const _fetchGeoWeather = () => {
  const lat = "35.685973";
  const lon = "139.756597";
  const exclude = "current,minutely,hourly,alerts";
  const endpoint = "https://api.openweathermap.org/data/2.5/onecall";
  const appid = "YOUR_API_KEY";
  const url = `${endpoint}?lat=${lat}&lon=${lon}&exclude${exclude}&appid=${appid}`;
  let weatherJSON="ok"
  fetch(url, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      weatherJSON=data
      return data;
    })
    .catch((err) => {
      console.log(err);
    });

    return weatherJSON
};

exports.fetchGeoWeather = functions.pubsub
  .schedule("0 6 * * *")
  .timeZone("Asia/Tokyo")
  .onRun((content) => {
    return _fetchGeoWeather;
  });

exports.date = functions.https.onRequest((req, res) => {
  const val =_fetchGeoWeather();
  res.send("send"+val)
});

exports.setGeoWeather = functions.https.onRequest((req, res) => {
  const sampleData={daily:[
    {
      dt:1900,
      weather:[{icon : "10d"}
      ],
    }
    ]
  }
  _setGeoWeather(sampleData);
  res.send("send")
});
exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});


exports.addMessage = functions.https.onRequest((req, res) => {
  // Grab the text parameter.
  
  // Push the new message into Cloud Firestore using the Firebase Admin SDK.
  const writeResult = admin.firestore().collection('messages').add({original: "test"});
  // Send back a message that we've succesfully written the message
  res.json({result: `Message with ID: ${writeResult.id} added.`});
});
