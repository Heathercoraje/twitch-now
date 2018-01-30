
var base = 'https://wind-bow.gomix.me/twitch-api/streams/';
var jsonp ='?callback=?';
var users = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

function makeUrl(user) {
  var url = base + user + jsonp;
  console.log(url);
  return url
}



// Script and JSONP requests are not subject to the same origin policy restrictions.
function fetchData(url, callback) {
  $.getJSON(url, function (data) {
    callback(data);
  });
}


$( '#all' ).on( 'click', function() {
  users.forEach(function (user) {
    fetchData(makeUrl(user), function(data) {
      var info = JSON.stringify(data);
      $( '#list').append(`<div>${info}</div>`);
    });
  });
});

// users.forEach(function(user) {
//   fetchData(makeUrl(user));
// });
//
