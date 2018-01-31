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
    var status, displayName, desc;
    $.getJSON(makeUrl('streams', user), function (data) {
      if (data.stream === null) {
        status = 'offline';
      } else { // if it is streaming
        status = 'online'
      }
      $.getJSON(makeUrl('channels', user), function (data) {
        console.log(data);
        $( '#all').append(`<div><p>${data.display_name}</p><p>${data.status}</p></div><img src=${data.logo} style="width:50px; height:50px">`);

        if (status === 'online') {
          $( '#online').append(`<div><p>${data.display_name}</p><p>${data.status}</p></div><img src=${data.logo} style="width:50px; height:50px">`);
        }
        else { // status === 'offline'
        $( '#offline').append(`<div><p>${data.display_name}</p><p>${data.status}</p></div><img src=${data.logo} style="width:50px; height:50px">`);
        }
      });
    });
  });
})();
