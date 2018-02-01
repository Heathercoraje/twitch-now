(function allInOne() {
  var users = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
  var base = 'https://wind-bow.gomix.me/twitch-api/';
  var jsonp ='?callback=?';
  var $online = $( '#online');
  var $offline = $( '#offline');
  var $search = $( '#search');
  var $all = $( '#all');
  var $searchForm = $('#searchForm');
  var $suggestion = $('#suggestion');

  // $searchForm.keydown(function() {
  //   var key = $searchForm.val();
  //   var filtered = users.filter(user => user.indexOf(key) !== -1);
  //   suggestion.innerHTML= '';
  //   filtered.forEach(function (user) {
  //     var option = document.createElement('option');
  //     option.value = user;
  //     suggestion.appendChild(option);
  //   });
  // });


  function makeUrl(type, user) { //type is either channels or streams
    return base + type + '/' + user + jsonp;
  }

  function getAllDataForUser (user) {
    return new Promise( function (resolve, reject) { // promise takes 2 function arguments
      $.getJSON(makeUrl('streams', user), function (data) {
        // add meta info to return object(data)
        data.status = (data.stream === null) ? 'offline' : 'online';
        $.getJSON(makeUrl('channels', user), function (response) {
          data.channels = response;
          resolve(data); // return data
        });
      });
    })
  }

  // apply this function to all users then this will return 8 promises
  var allData = users.map(getAllDataForUser);


  // Promise.all(iterable) will wait 8 promises to be completed and pass it pending to allResponse
  Promise.all(allData).then(function(allResponses) {

    var onlineRes = allResponses.filter(r => r.status === 'online').map(r => getMarkupForUser(r, 'online'));
    $online.append(onlineRes);

    var offlineRes = allResponses.filter(r => r.status === 'offline').map(r => getMarkupForUser(r, 'offline'));
    $offline.append(offlineRes);

    var allRes = allResponses.map(r => getMarkupForUser(r, r.status));
    $all.append(allRes);
  });

  function getMarkupForUser (user, isOnline) {
    // here user is each user data object
    // now user.channels has channels now, create elements that I want to append to browswer
    var $div = $('<div/>', {
      class :'item'
    });

    var $img = $('<img/>', {
      class : 'logoImage rounded-circle',
      src : user.channels.logo
    });

    var $p = $('<p/>', {
      class : `detail name ${isOnline} ? 'online' : 'offline'`,
      text  : user.channels.display_name + user.channels.status
    });

    var $a =$('<a/>', {
      href : user.channels.url,
      target : '_blank'
    });

    var $i = $('<i/>', {
      class : 'fa fa-circle'
    });

    var $result = $div.append($img).append($p);
    if (isOnline === 'online') {
      $a.append($i),
      $result.append($a)
    }
    return $result;
  }


}
)()
