const API_KEY = "ad55b2b3f85b3f4596864f676b22dd38";
const Base_URL = "http://api.weatherstack.com";
const Map_BOX_TOKEN =
  "pk.eyJ1IjoicmFnaGF2LWpvZCIsImEiOiJjbGp0b2piNDYwOWRtM2pwbm03cXA5NWJiIn0.uWCJvtTPDykzyPwCtUtYRw";
const Base_URL_MAP_BOX = "https://api.mapbox.com";

const map_box_url = `${Base_URL_MAP_BOX}/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=${Map_BOX_TOKEN}`;

const request = require("request");
let URL = `${Base_URL}/current?access_key=${API_KEY}&query=New York`;

request({ url: URL, json: true }, (err, res) => {
  const data = res.body.current;
  console.log("DATA", data);
  console.log(
    `It is ${data.temperature} degrees out. There is ${data.precip}% chance of rain.`
  );
});

request({ url: map_box_url, json: true }, (err, res) => {
  if (err) {
    console.log("Unable to connect to location service");
  } else if (res.body.features.length == 0) {
    console.log("No location Found");
  } else {
    const latittude = res.body.features[0].center[1];
    const longitude = res.body.features[0].center[0];

    console.log("LAT : ", latittude, "LONg: ", longitude);
  }
});
