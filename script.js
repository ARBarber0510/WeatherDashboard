var lat;
var lon;
var location;

function getWeatherData(location){
    $.ajax({
        url: "api.openweathermap.org/data/2.5/weather?q=" + location + "&appid=96598b0725a855977df1a03e8cab48c9",
        method: "GET"
      }).then(function(data){
        console.log(data)

        //Use UVIndex function here while you still have access to data,
        //else it is erased for being out of scope
        getUVIndex(data.coord.lat, data.coord.lon)
    })
   
}

function getUVIndex(lat, lon){
    $.ajax({
        url: "http://api.openweathermap.org/data/2.5/uvi?appid=" + "&appid=96598b0725a855977df1a03e8cab48c9" + "&lat=" + lat + "&lon=" + lon,
        method: "GET"
    }).then(function(data){
        console.log(data.value);
    });
}

getWeatherData();



// Want to create a weather dashboard.
// Left column is used to search for the weather in a specific city.
// Local storage saves previous searches and lists them below search bar.
// When a city is entered and search button clicked, the inputs current forecast appears on the right hand side.
// Current weather conditions reflects temp, humidity, wind speed, and UV index.
// UV index is color coded to reflect the severity of the conditions
// Below the current weather conditions is the future forecast for the next 5 days.





