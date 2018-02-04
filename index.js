(function allInOne() {
  var users = ["ESL_SC2", "OgamingSC2", "Cretetion", "Freecodecamp", "Storbeck", "Habathcx", "RobotCaleb", "Noobs2ninjas"];
  var base = 'https://wind-bow.gomix.me/twitch-api/';
  var jsonp ='?callback=?';
  var $online = $( '#online');
  var $offline = $( '#offline');
  var $search = $( '#search');
  var $all = $( '#all');
  var $searchForm = $('#searchForm');


  // this invokes whenever input changes 
  $searchForm.on('input', function() {
    var key = $searchForm.val().toLowerCase();
    var usersLow = users.map(u => u.toLowerCase());
    var real = usersLow.filter(user => user.indexOf(key) !== -1);
    console.log('halla');

  });

  function filterChannel(key) {
    // input: key value from input field
    // output matched users
    // then pass this to makeup function
  }

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
      class : 'logoImage rounded-circle leftMargin align-self-center',
      src : user.channels.logo
    });

    var $p = $('<p/>', {
      class : 'name',
      text  : user.channels.display_name
    });

    var $span = $('<span/>', {
      class : 'status',
      text : user.channels.status
    })

    var $a =$('<a/>', {
      class: 'align-self-center leftMargin',
      href : user.channels.url,
      target : '_blank'
    });

    var $i = $('<i/>', {
      class : 'fa fa-circle'
    });

    var $result;

    if (isOnline === 'online') {
      $result = $div.append($img).append($(('<div class="namePlus leftMargin"></div>')).append($p).append($span));
      $a.append($i);
      $result.append($a);
    }
    else {
      $result = $div.append($img).append($('<div class="namePlus leftMargin"></div>').append($p));
    }
    return $result;
  }
}
)()
