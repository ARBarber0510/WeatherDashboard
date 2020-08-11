var city = $("#searchInput").val();
var apiKey = "&appid=96598b0725a855977df1a03e8cab48c9";
var cities;
var lat = "latitude";
var lon = "longitude";
var UVIndex = (lat + lon);


var date = new Date();

    if (localStorage.getItem("search-list")) {
        citiesArray = JSON.parse(localStorage.getItem("search-list"));
        showSearchHistory(cities);
    }
    else {
        cities = [];
    };


    $("#searchButton").on("click", function() {

        $('#forecast5D').addClass('show');
  
        // Get value from input
        city = $("#searchInput").val();
    
        $("#searchInput").val("");  
  
        // Call API
        var weatherQueryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + apiKey;

        $.ajax({
            url: weatherQueryUrl,
            method: "GET"
          })
          .then(function (response){
        
            let tempF = (response.main.temp - 273.15) * 1.80 + 32;
            console.log(Math.floor(tempF))
        
            getWeatherData(response);
            getCurrentForecast(response);
            // getUVIndex();
            makeList();
        
            });
        });

        function makeList() {
            let listItem = $("<li>").addClass("list-group-item").text(city);
            $(".list").append(listItem);
        }
        
        function getWeatherData (response) {
        
            // Convert temp to Farenheit
            var tempF = (response.main.temp - 273.15) * 1.80 + 32;
            tempF = Math.floor(tempF);
        
            $('#currentCity').empty();
        
            // Format  weather data content
            var card = $("<div>").addClass("card");
            var cardBody = $("<div>").addClass("card-body");
            var city = $("<h4>").addClass("card-title").text(response.name);
            var cityDate = $("<h4>").addClass("card-title").text(date.toLocaleDateString('en-US'));
            var temperature = $("<p>").addClass("card-text current-temp").text("Temperature: " + tempF + " °F");
            var humidity = $("<p>").addClass("card-text current-humidity").text("Humidity: " + response.main.humidity + "%");
            var wind = $("<p>").addClass("card-text current-wind").text("Wind Speed: " + response.wind.speed + " MPH");
            var image = $("<img>").attr("src", "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png")
        
            // Append to page
            city.append(cityDate, image)
            cardBody.append(city, temperature, humidity, wind);
            card.append(cardBody);
            $("#currentCity").append(card)
           
        }

        // Attempted to call UV Index
        // function getUVIndex(coordinates){
        //     var UVQueryURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + coordinates.lat + "&lon=" + coordinates.lon + apiKey;
        //     var lat = response.data.coord.lat;
        //     var lon = response.data.coord.lon; 
        //     $.ajax({
        //         url: UVQueryURL,
        //         method: "GET"
        //     }).then(function(data){
        //         console.log(data.value);
        //     });
        // }

        function getCurrentForecast () {
          
            $.ajax({
            url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + apiKey,
            method: "GET"
            }).then(function (response){
        
            console.log(response)
            console.log(response.dt)
            $('#forecast').empty();
        

            var results = response.list;
            console.log(results)
        
            for (let i = 0; i < results.length; i++) {
        
                let day = Number(results[i].dt_txt.split('-')[2].split(' ')[0]);
                let hour = results[i].dt_txt.split('-')[2].split(' ')[1];
                console.log(day);
                console.log(hour);
        
                if(results[i].dt_txt.indexOf("12:00:00") !== -1){
                
                // Convert temp to Farenheit
                let temp = (results[i].main.temp - 273.15) * 1.80 + 32;
                let tempF = Math.floor(temp);
        
                // Format 5 day forecast content
                var card = $("<div>").addClass("card col-md-2 ml-4 bg-primary text-white");
                var cardBody = $("<div>").addClass("card-body p-3 forecastBody")
                var cityDate = $("<h4>").addClass("card-title").text(date.toLocaleDateString('en-US'));
                var temperature = $("<p>").addClass("card-text forecastTemp").text("Temperature: " + tempF + " °F");
                var humidity = $("<p>").addClass("card-text forecastHumidity").text("Humidity: " + results[i].main.humidity + "%");
        
                var image = $("<img>").attr("src", "https://openweathermap.org/img/w/" + results[i].weather[0].icon + ".png")
        
                cardBody.append(cityDate, image, temperature, humidity);
                card.append(cardBody);
                $("#forecast").append(card);
        
            }
        }
    });
}

// Want to create a weather dashboard.
// Left column is used to search for the weather in a specific city.
// Local storage saves previous searches and lists them below search bar.
// When a city is entered and search button clicked, the inputs current forecast appears on the right hand side.
// Current weather conditions reflects temp, humidity, wind speed, and UV index.
// UV index is color coded to reflect the severity of the conditions
// Below the current weather conditions is the future forecast for the next 5 days.

