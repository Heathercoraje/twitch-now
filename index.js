
var base = 'https://wind-bow.gomix.me/twitch-api/channels/';
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
      var data = data;
      console.log(data);
      // console.log(data.stream);
      // console.log(data.stream.game);
      // $( '#allList').append(`<li>${data.streams.game}</li>`);
    });
  });
});

// users.forEach(function(user) {
//   fetchData(makeUrl(user));
// });
//
