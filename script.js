$(button).on("click", function() {
    var cityName = $("#searchInput").val();

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=96598b0725a855977df1a03e8cab48c9";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function(response) {
        console.log(response)
    })
})

// Want to create a weather dashboard.
// Left column is used to search for the weather in a specific city.
// Local storage saves previous searches and lists them below search bar.
// When a city is entered and search button clicked, the inputs current forecast appears on the right hand side.
// Current weather conditions reflects temp, humidity, wind speed, and UV index.
// UV index is color coded to reflect the severity of the conditions
// Below the current weather conditions is the future forecast for the next 5 days.





