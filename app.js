const request = require('request');

// users below are frequent users streaming their tv.
// check if user is online or offline. that is it :p


const users =["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

const options = {
  url:'https://wind-bow.gomix.me/twitch-api/streams/OgamingSC2',
  method:'GET'
};

request(options, function (error, response, body) {
  var data = JSON.parse(body);
  console.log(data.stream);
})
