const OPENWEATHER_APIKEY = '533576179dd64d9355eff2954198e13a';
const UNIT = 'imperial';

var backgrounds = {
  thunderstorm: "http://fairerplatform.com/wp-content/uploads/2014/05/wallpoper_storm.jpg",
  drizzle: "http://wallpoper.com/images/00/31/15/79/glass-raindrops_00311579.jpg",
  rain: "http://webneel.com/wallpaper/sites/default/files/images/04-2013/creative-rain_0.jpg",
  snow: "http://7-themes.com/data_images/out/71/7013393-snow-river-wallpaper.jpg",
  clouds: "http://cdnfiles.hdrcreme.com/49001/original/cloudy-day.jpg",
  mist: "http://www.zocalopublicsquare.org/wp-content/uploads/2010/05/mist.jpg",
  clear: "https://images.unsplash.com/photo-1467377791767-c929b5dc9a23"
};

$(document).ready(function() {
  $.getJSON("http://ipinfo.io", function(response) {
    $('#region-info').text(`${response.city}, ${response.region}`);
    let location = response.loc.split(',');
    const LATITUDE = location[0];
    const LONGITUDE = location[1];
    const OPENWEATHER_URL = `http://api.openweathermap.org/data/2.5/weather?lat=${LATITUDE}&lon=${LONGITUDE}&units=${UNIT}&appid=${OPENWEATHER_APIKEY}`;

    $.get(OPENWEATHER_URL, function(response) {
      $('#weather-description').text(response.weather[0].description);
      $('#wind').text(`${response.wind.speed} mph`);
      $('#weather-icon').attr('src', `http://openweathermap.org/img/w/${response.weather[0].icon}.png`);
      $('#temperature').append(Math.round(response.main.temp) + ' &deg;F');
      let weather = response.weather[0].main.toLowerCase();
      let backgroundImageLink = backgrounds[weather];
      $('body').css('background-image', 'url("' + backgroundImageLink + '")');
    }, "jsonp")
  });
});
