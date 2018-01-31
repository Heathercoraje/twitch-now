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


(function goGetThem() {
  // load all the data before hand
  // then simply append them to list
  // click event does not have to handled thanks to bootstrap nav-tab
  var users = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
  var base = 'https://wind-bow.gomix.me/twitch-api/';
  var jsonp ='?callback=?';

  function makeUrl(type, user) { //type is either channels or streams
    return base + type + '/' + user + jsonp;
  }

  users.forEach(function (user) {
    $.getJSON(makeUrl('streams', user), function(data) {
      var status;
      if (data.stream === null) {
        status = 'offline';
      } else { // if it is streaming
        status = 'online'
        var display = JSON.stringify(data.stream.game);
        $( '#online').append(`<div>${display}</div>`)
      }

    });
  });
})();

$( '#all' ).on( 'click', function() {
  users.forEach(function (user) {
    fetchData(makeUrl(user), function(data) {
      var online;
      console.log(data);
      $( '#allList').append(`<li>${data.game}</li>`);
    });
  });
});

// users.forEach(function(user) {
//   fetchData(makeUrl(user));
// });
//
