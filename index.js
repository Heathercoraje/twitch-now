(function goGetThem() {
  var users = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
  var base = 'https://wind-bow.gomix.me/twitch-api/';
  var jsonp ='?callback=?';

  function makeUrl(type, user) { //type is either channels or streams
    return base + type + '/' + user + jsonp;
  }
  users.forEach(function (user) {
    $.getJSON(makeUrl('streams', user), function (data) {
      let status;
      console.log(data);
      if (Boolean(data.stream === null)) {
        status = 'offline';
      } else {
        status = 'online';
      }
      $.getJSON(makeUrl('channels', user), function (data) {
        if (status === 'online') {
          addData('#online');
          //here I want to add class to change the color of icon(fa fa circle)

        } else {
          addData('#offline');
        }
        addData('#all');

        // function declaration
        function addData (selector, id) {
          let info = (status === 'online')? data.display_name + ' <br> ' + data.status : data.display_name;
          if (status === 'online' ) {
            $(selector).append(`<div class="item">
            <img class='logoImage rounded-circle' src=${data.logo}>
            <div><p class="detail">${info}</p>
            <a href=${data.url} target="_blank"><i class="fa fa-circle"></i></a></div>`);
          }
          else {
            $(selector).append(`<div class="item">
            <img class='logoImage rounded-circle' src=${data.logo}>
            <div><p class="detail">${info}</p>`);
          }
          return
        };
      });
    });
  });
})();
