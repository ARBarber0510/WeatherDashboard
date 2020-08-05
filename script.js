$(button).on("click", function() {
    var cityName = $("#searchInput").val();

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=96598b0725a855977df1a03e8cab48c9";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
})



