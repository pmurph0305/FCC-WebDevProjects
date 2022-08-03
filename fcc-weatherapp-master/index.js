// switch between C and F
let inDegC = true;
let originalTemp = 0;

$('document').ready(function() {
  // use html5 geolocation
  navigator.geolocation.getCurrentPosition(parseLocation);

  function parseLocation(location) {
    getWeather(location.coords.latitude, location.coords.longitude);
  }

  //User Story: I can push a button to toggle between Fahrenheit and Celsius.
  $("#temp-deg").click(function() {
    $("#temp-container").slideToggle('fast', function() {
      let temp = originalTemp;
      if (inDegC) {
        //(0°C × 9/5) + 32 = 32°F
        temp = (temp * (9/5) + 32).toFixed(2);
        $("#temp-deg").html("&#176F");
      } else {
        $("#temp-deg").html("&#176C");
      }
      inDegC = !inDegC;
      $("#temp").html(temp);
      $("#temp-container").slideToggle();
    })
  })

  function getWeather(lat, long) {
    console.log(lat, long);
    //User Story: I can see the weather in my current location.
    $.get('https://fcc-weather-api.glitch.me/api/current?lon='+long+'&lat='+long)
    .done(function(data) {
      console.log(data);
      originalTemp = data.main.temp;
      $("#temp").html(originalTemp);
      $("#humid").html(data.main.humidity);
      if (data.weather && data.weather[0].description) {
        let desc = data.weather[0].description.split(' ');
        desc = desc.map(el => {
          return el.charAt(0).toUpperCase() + el.slice(1);
        })
        $("#weather-desc").html(desc.join(' '));
      } else {
        $("#weather-desc").html('Cloudy');
      }
      //User Story: I can see a different icon or background image (e.g. snowy mountain, hot desert) depending on the weather.
      if (data.weather && data.weather[0].icon) {
        $("#weather-icon").attr('src', data.weather[0].icon);
      } else {
        $("#weather-icon").attr('src', "https://cdn.glitch.com/6e8889e5-7a72-48f0-a061-863548450de5%2F04d.png?1499366020964"); 
      }
      // Style temp/humidiy %/C based on values
      if (originalTemp > 25) {
        $("#temp-deg").addClass("value-high");
      } else {
        $("#temp-deg").addClass("value-low");
      }
      if (data.main.humidity > 50) {
        $("#humid-p").addClass("value-high");
      } else {
        $("#humid-p").addClass("value-low");
      }

    })
    .fail(function() {
      $("#temp").html(20);
      $("#humid").html(40);
      $("#humid-p").addClass("value-low");
      $("#temp-deg").addClass("value-low");
      $("#weather-desc").html('Cloudy');
      $("#weather-icon").attr('src', "https://cdn.glitch.com/6e8889e5-7a72-48f0-a061-863548450de5%2F04d.png?1499366020964");
    })
  }
});