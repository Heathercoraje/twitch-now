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
      var status, displayName, desc;
      if (data.stream === null) {
        status = 'offline';
      } else { // if it is streaming
        status = 'online'
        displayName = data.stream.channel.display_name;
        desc = data.stream.channel.status;
        logo = data.stream.channel.logo; //src
        $( '#online').append(`<div><p>${displayName}</p><p>${desc}</p></div><img src=${logo} style="width:50px; height:50px">`);
      }

    });
  });
})();
