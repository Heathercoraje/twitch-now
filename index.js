(function goGetThem() {
  var users = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
  var base = 'https://wind-bow.gomix.me/twitch-api/';
  var jsonp ='?callback=?';

  function makeUrl(type, user) { //type is either channels or streams
    return base + type + '/' + user + jsonp;
  }

  users.forEach(function (user) {
    let status;
    $.getJSON(makeUrl('streams', user), function (data) {
      if (data.stream === null) {
        status = 'offline';
      } else {
        status = 'online'
      }
      $.getJSON(makeUrl('channels', user), function (data) {
        function addData(selector) {
          let info = (status === 'online')? data.display_name + ' <br> ' + data.status : data.display_name;
          $(selector).append(`<div class="item">
          <img class='logoImage rounded-circle' src=${data.logo}>
          <div><p class="detail">${info}</p></div>`);
        }
        addData('#all');
        if (status === 'online') {
          addData('#online');
        }
        else {
          addData('#offline');
        }
      });
    });
  });
})();
