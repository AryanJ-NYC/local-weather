const DARKSKY_APIKEY = 'd8044f3e42338203b270b3e6f2d4f83b';
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
    console.log(position);
    // $('#region-info').text(`${response.city}, ${response.region}`);
    const LATITUDE = position.coords.latitude;
    const LONGITUDE = position.coords.longitude;
    const DARKSKY_URL = `https://api.forecast.io/forecast/${DARKSKY_APIKEY}/${LATITUDE},${LONGITUDE}`;

    $.get(DARKSKY_URL, function(response) {
      let icon = response.currently.icon;
      $('#weather-description').text(response.currently.summary);
      $('#wind').text(`${response.currently.windSpeed} mph`);
      skycons.add("weather-icon", icon);
      $('#temperature').append(Math.round(response.currently.temperature) + ' &deg;F');
      
      let backgroundImageLink = backgrounds[icon];
      $('body').css('background-image', 'url("' + backgroundImageLink + '")');
    }, "jsonp")
  });
});
