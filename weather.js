const DARKSKY_APIKEY = 'd8044f3e42338203b270b3e6f2d4f83b';
const GOOGLEMAPS_APIKEY = 'AIzaSyAFAUXNpi2NLxkF0WgExSxlIyCuLk1PFJs';
const UNIT = 'imperial';

var backgrounds = {
  thunderstorm: "http://fairerplatform.com/wp-content/uploads/2014/05/wallpoper_storm.jpg",
  drizzle: "http://wallpoper.com/images/00/31/15/79/glass-raindrops_00311579.jpg",
  rain: "http://webneel.com/wallpaper/sites/default/files/images/04-2013/creative-rain_0.jpg",
  snow: "http://7-themes.com/data_images/out/71/7013393-snow-river-wallpaper.jpg",
  clouds: "http://cdnfiles.hdrcreme.com/49001/original/cloudy-day.jpg",
  mist: "http://www.zocalopublicsquare.org/wp-content/uploads/2010/05/mist.jpg",
  "clear-day": "https://images.unsplash.com/photo-1467377791767-c929b5dc9a23"
};

$(document).ready(function() {
  navigator.geolocation.getCurrentPosition(function (position) {
    const LATITUDE = position.coords.latitude;
    const LONGITUDE = position.coords.longitude;
    $.getJSON(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${LATITUDE},${LONGITUDE}&key=${GOOGLEMAPS_APIKEY}`, function(addresses) {
      let city = addresses.results[0].address_components[3].long_name;
      let state_abbr = addresses.results[0].address_components[6].short_name;
      $('#region-info').text(`${city}, ${state_abbr}`);
    });

    const DARKSKY_URL = `https://api.forecast.io/forecast/${DARKSKY_APIKEY}/${LATITUDE},${LONGITUDE}`;
    $.get(DARKSKY_URL, function(response) {
      let icon = response.currently.icon;
      let backgroundImageLink = backgrounds[icon];
      $('body').css('background-image', 'url("' + backgroundImageLink + '")');
      skycons.add("weather-icon", icon);
      skycons.play();
      
      $('#weather-description').text(response.currently.summary);
      $('#wind').text(`${response.currently.windSpeed} mph`);
      $('#temperature').append(Math.round(response.currently.temperature) + ' &deg;F');
    }, "jsonp")
  });
});
