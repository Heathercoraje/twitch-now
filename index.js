
// Script and JSONP requests are not subject to the same origin policy restrictions.
var url = 'https://wind-bow.gomix.me/twitch-api/streams/freecodecamp?callback=?';
$.getJSON(url, function (data) {
  console.log(data.stream);
  console.log('data has been loaded');
})
