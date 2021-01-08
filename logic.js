$(document).ready(function () {
    //googlePlaces();
    weatherAPICall();
    gMapsAPI();
    //tidesAPI();



    function googlePlaces() {
        var placesAPIKey = "AIzaSyAYn8qXNqQRfZTxiAqDSsg_V7cjybZ4eXY";
        var placesAPI = "https://cors-proxy.htmldriven.com/?url=https://www.google.com/maps/embed/v1/MODE?key="+ placesAPIKey +"&parameters";
        $.ajax({
            type: "GET",
            url: placesAPI,
            dataType: "json",
            success: function (response) {
                console.log(response);


            }
        })
    }

    //working
    function weatherAPICall() {

        var apiKey = "58ceaad44652a8be4772292ae8aa41bc";
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=london&appid=" + apiKey;

        $.ajax({
            type: "GET",
            url: queryURL,
            dataType: "json",
            success: function (response) {
                console.log(response, "weather api");
                foreCastAPI(response.coord.lat,response.coord.lon);
            }
        })
    }

    //Working
    function foreCastAPI(lat, lon){
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
    function gMapsAPI(){
        let queryURL = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=burgers%20NewSmyrnaBeach&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=AIzaSyBpsko6mY2gC8yhiv3pQsX0X2axGTXKrE0"

        $.ajax({  
            url: 'https://api.allorigins.win/get?url=' + encodeURIComponent(queryURL),
            method: 'GET',
        }).then(function(response){
            console.log(response, ":WORKING");
            console.log(JSON.parse(response.contents), "reference");
            var data = JSON.parse(response.contents);
            console.log(data.candidates[0].photos[0].html_attributions[0], "trying to find map data");
        });

    }

    //working
    function tidesAPI(){
        tideAPIKey = "dd23eb25-240d-4165-bc96-550bf270ff79";
        tideAPI = "https://www.worldtides.info/api/v2?heights&plot&date=2021-01-07&lat=33.768321&lon=-118.195617&key=" + tideAPIKey;

        $.ajax({
            type: "GET",
            url: tideAPI,
            dataType: "json",
            success: function (response) {
                console.log(response, "tides");
                
            }
        })
    }


});