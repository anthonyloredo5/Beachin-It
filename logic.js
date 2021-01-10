$(document).ready(function () {
    //make a static img tag
    //selector.attr("src", )
    var pFriendly=false;
    var hRated=false;
    var nActivities=false;
    var nRestaurant=false;

    //store seacrh value
    $("#sButton").on("click", function () {
        $("#current-weather").html("");
        var searchValue = $("#location").val();
        console.log(searchValue, "search Value");

        //calls for API 
        weatherAPICall(searchValue);
        gMapsAPI();
        tidesAPI();

        //checks which boxes are slected and whether to include that dat in result.
        if ($(".box1").is(
            ":checked")) {
                pFriendly = true;
            console.log(pFriendly);
        }
        if ($(".box2").is(
            ":checked")) {
                hRated = true;
            console.log(hRated);
        }
        if ($(".box3").is(
            ":checked")) {
                nActivities = true;
            console.log(nActivities);
        }
        if ($(".box4").is(
            ":checked")) {
                nRestaurant = true;
            console.log(nRestaurant);
        }
    })

    //working
    function weatherAPICall(searchValue) {
        var apiKey = "58ceaad44652a8be4772292ae8aa41bc";
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&appid=" + apiKey;
        $.ajax({
            type: "GET",
            url: queryURL,
            dataType: "json",
            success: function (response) {
                console.log(response, "weather api");
                foreCastAPI(response.coord.lat, response.coord.lon);

                //converts to f
                var t = response.main.temp;
                var KtoF = t * 9/5 - 459.67;
                var fKtoF = KtoF.toFixed(1);

                //converting unix time
                let unix_timestamp_sunrise = response.sys.sunrise;
                let unix_timestamp_sunset = response.sys.sunset;
                var date = new Date(unix_timestamp_sunrise * 1000);
                var date2 = new Date(unix_timestamp_sunset * 1000);
                var hours = date.getHours();
                var hours2 = date2.getHours();
                var minutes = "0" + date.getMinutes();

                //changes from 24 hour time
                hours2 = hours2 - 12;

                var formattedTime = hours +  ":" + minutes.substr(-2) + "am";
                var formattedTime2 = hours2 +  ":" + minutes.substr(-2) + "pm";
                
                
                

            
            var currentTemperature = $("<p></p>").text("Temperature: " + fKtoF + "F");
            var humidity = $("<p></p").text("Humidity: " + response.main.humidity + "%");
            var sun = $("<p></p>").text("Sunrise: " + formattedTime + ", " + "Sunset: " + formattedTime2);
            var weather = $("<p></p>").text("Current Weather Forecast: " +  response.weather[0].description);
            $("#current-weather").append(currentTemperature,humidity,sun,weather);
            
            
            



            }
        })
    }
    //Working
    function foreCastAPI(lat, lon) {
        var apiKey = "58ceaad44652a8be4772292ae8aa41bc";
        var queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=alerts&appid=" + apiKey;
        $.ajax({
            type: "GET",
            url: queryURL,
            dataType: "json",
            success: function (response) {
                console.log(response, "forecast");
            }
        })
    }
    //google maps api
    function gMapsAPI() {
        let queryURL = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=burgers%20NewSmyrnaBeach&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=AIzaSyBpsko6mY2gC8yhiv3pQsX0X2axGTXKrE0"
        $.ajax({
            url: 'https://api.allorigins.win/get?url=' + encodeURIComponent(queryURL),
            method: 'GET',
        }).then(function (response) {
            console.log(response, ":WORKING");
            console.log(JSON.parse(response.contents), "reference");
            var data = JSON.parse(response.contents);
            console.log(data.candidates[0].photos[0].html_attributions[0], "trying to find map data");
        });
    }
    //working
    function tidesAPI() {
        const settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://tides.p.rapidapi.com/tides?latitude=44.414&longitude=-2.097&interval=60&duration=1440",
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "860bd8267cmsh0224dc5b15d78d9p1bf78fjsnf179cb3c0ad2",
                "x-rapidapi-host": "tides.p.rapidapi.com"
            }
        };

        $.ajax(settings).done(function (response) {
            console.log(response, "TIDES");
        });
    }
    // var yBusinessSearchAPI = "https://api.yelp.com/v3/businesses/search";
    // $(".button").on("click", function () {
    //     $.ajax({
    //         type: "GET",
    //         url: yBusinessSearchAPI,
    //         dataType: "json",
    //         success: function (response) {
    //             console.log(response);
    //         }
    //     })
    // })

});

