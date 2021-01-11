$(document).ready(function () {
    //make a static img tag
    //selector.attr("src", )
    var pFriendly = false;
    var hRated = false;
    var nActivities = false;
    var nRestaurant = false;




    //store seacrh value
    $("#sButton").on("click", function () {
        $("#current-weather").html("");
        $("#beachResults").html("");

        var searchValue = $("#location").val();
        console.log(searchValue, "search Value");

        //calls for API 
        weatherAPICall(searchValue);
        gMapsAPI(searchValue);
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

    //Beaches data appended here






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
                var KtoF = t * 9 / 5 - 459.67;
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

                var formattedTime = hours + ":" + minutes.substr(-2) + "am";
                var formattedTime2 = hours2 + ":" + minutes.substr(-2) + "pm";




                //Weather appended here
                var currentTemperature = $("<p></p>").text("Temperature: " + fKtoF + "F");
                var humidity = $("<p></p").text("Humidity: " + response.main.humidity + "%");
                var sun = $("<p></p>").text("Sunrise: " + formattedTime + ", " + "Sunset: " + formattedTime2);
                var weather = $("<p></p>").text("Current Weather Forecast: " + response.weather[0].description);
                $("#current-weather").append(currentTemperature, humidity, sun, weather);

                //places attempt
                // service = new google.maps.places.PlacesService(map);
                // service.textSearch(request, callback);
                // console.log(service, "service");



                //nearbySearch() map attempt
                var map;
                var service;
                var infowindow;
                initialize();

                function initialize() {
                    var pyrmont = new google.maps.LatLng(response.coord.lat, response.coord.lon);

                    map = new google.maps.Map(document.getElementById('map'), {
                        center: pyrmont,
                        zoom: 15
                    });

                    var request = {
                        location: pyrmont,
                        radius: '500',
                        type: ['restaurant']
                    };

                    service = new google.maps.places.PlacesService(map);
                    service.nearbySearch(request, callback);
                    console.log(service, "SERVICE");
                }

                function callback(results, status) {
                    console.log("Callback Running");
                    if (status == google.maps.places.PlacesServiceStatus.OK) {
                        for (var i = 0; i < results.length; i++) {
                            createMarker(results[i]);
                        }
                    }
                }



                // //Places attempt(best)
                // var map;
                // var service;
                // var infowindow;
                // initialize();
                // function initialize() {
                //     var pyrmont = new google.maps.LatLng(response.coord.lat, response.coord.lon);

                //     map = new google.maps.Map(document.getElementById('map'), {
                //         center: pyrmont,
                //         zoom: 15
                //     });
                //     //mayvbe
                //     // let getNextPage;
                //     // const moreButton = document.getElementById("more");

                //     // moreButton.onclick = function () {
                //     //     moreButton.disabled = true;

                //     //     if (getNextPage) {
                //     //         getNextPage();
                //     //     }
                //     // };

                //     var request = {
                //         location: pyrmont,
                //         radius: '500',
                //         query: ['beach',
                //             'activites',
                //             'beach']
                //     };

                //     service = new google.maps.places.PlacesService(map);
                //     service.nearbySearch(request, callback);

                //     service.nearbySearch(
                //         { location: pyrmont, radius: 500, type: "store" },
                //         (results, status, pagination) => {
                //             if (status !== "OK") return;
                //             createMarkers(results, map);
                //             moreButton.disabled = !pagination.hasNextPage;

                //             if (pagination.hasNextPage) {
                //                 getNextPage = pagination.nextPage;
                //             }
                //         }
                //     );

                // }

                // function callback(results, status) {
                //     if (status == google.maps.places.PlacesServiceStatus.OK) {
                //         for (var i = 0; i < results.length; i++) {
                //             var place = results[i];
                //             createMarker(results[i]);
                //         }
                //     }
                // }
                // function createMarkers(places, map) {
                //     const bounds = new google.maps.LatLngBounds();
                //     const placesList = document.getElementById("places");

                //     for (let i = 0, place; (place = places[i]); i++) {
                //         const image = {
                //             url: place.icon,
                //             size: new google.maps.Size(71, 71),
                //             origin: new google.maps.Point(0, 0),
                //             anchor: new google.maps.Point(17, 34),
                //             scaledSize: new google.maps.Size(25, 25),
                //         };
                //         new google.maps.Marker({
                //             map,
                //             icon: image,
                //             title: place.name,
                //             position: place.geometry.location,
                //         });
                //         const li = document.createElement("li");
                //         li.textContent = place.name;
                //         placesList.appendChild(li);
                //         bounds.extend(place.geometry.location);
                //     }
                //     map.fitBounds(bounds);
                // }

                //places attempt(current)

                // This example requires the Places library. Include the libraries=places
                // parameter when you first load the API. For example:
                // <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
                // function initMap() {
                //     // Create the map.
                //     const pyrmont = { lat: -33.866, lng: 151.196 };
                //     const map = new google.maps.Map(document.getElementById("map"), {
                //         center: pyrmont,
                //         zoom: 17,
                //     });
                //     // Create the places service.
                //     const service = new google.maps.places.PlacesService(map);
                //     let getNextPage;
                //     const moreButton = document.getElementById("more");

                //     moreButton.onclick = function () {
                //         moreButton.disabled = true;

                //         if (getNextPage) {
                //             getNextPage();
                //         }
                //     };
                //     // Perform a nearby search.
                //     service.nearbySearch(
                //         { location: pyrmont, radius: 500, type: "store" },
                //         (results, status, pagination) => {
                //             if (status !== "OK") return;
                //             createMarkers(results, map);
                //             moreButton.disabled = !pagination.hasNextPage;

                //             if (pagination.hasNextPage) {
                //                 getNextPage = pagination.nextPage;
                //             }
                //         }
                //     );
                // }

                // function createMarkers(places, map) {
                //     const bounds = new google.maps.LatLngBounds();
                //     const placesList = document.getElementById("places");

                //     for (let i = 0, place; (place = places[i]); i++) {
                //         const image = {
                //             url: place.icon,
                //             size: new google.maps.Size(71, 71),
                //             origin: new google.maps.Point(0, 0),
                //             anchor: new google.maps.Point(17, 34),
                //             scaledSize: new google.maps.Size(25, 25),
                //         };
                //         new google.maps.Marker({
                //             map,
                //             icon: image,
                //             title: place.name,
                //             position: place.geometry.location,
                //         });
                //         const li = document.createElement("li");
                //         li.textContent = place.name;
                //         placesList.appendChild(li);
                //         bounds.extend(place.geometry.location);
                //     }
                //     map.fitBounds(bounds);
                // }

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
    function gMapsAPI(searchValue) {
        let queryURL = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=" + searchValue + "%20beaches&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=AIzaSyBpsko6mY2gC8yhiv3pQsX0X2axGTXKrE0"
        $.ajax({
            url: 'https://api.allorigins.win/get?url=' + encodeURIComponent(queryURL), 
            method: 'GET',
        }).then(function (response) {
            console.log(response, ":WORKING");
            console.log(JSON.parse(response.contents), "reference");
            var data = JSON.parse(response.contents);
            console.log(data.candidates[0].photos[0].html_attributions[0], "trying to find map data");

            //Beaches appended here 

                var beach = $("<p>").text("Your Beach Result: ")
                var beachName = $("<p>").text(data.candidates[0].name);
                var beachAddress = $("<p>").text(data.candidates[0].formatted_address);
                var beachRating = $("<p>").text(data.candidates[0].rating + " stars");
                console.log("beach rating " + data.candidates[0].rating);
                $("#beachResults").append(beach, beachName, beachRating, beachAddress);

        });
    }
    //working
    function tidesAPI() {
        $("#tide-data").html("");
        $("#tide-data1").html("");


        //BG api call
        // const settings = {
        //     "async": true,
        //     "crossDomain": true,
        //     "url": "https://tides.p.rapidapi.com/tides?latitude=44.414&longitude=-2.097&interval=60&duration=1440",
        //     "method": "GET",
        //     "headers": {
        //         "x-rapidapi-key": "860bd8267cmsh0224dc5b15d78d9p1bf78fjsnf179cb3c0ad2",
        //         "x-rapidapi-host": "tides.p.rapidapi.com"
        //     }
        // };
        //EB api call
        const settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://tides.p.rapidapi.com/tides?latitude=44.414&longitude=-2.097&interval=60&duration=1440",
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "57167014f1msh8f4697a8f731a71p1513c4jsn311b1f516fe4",
                "x-rapidapi-host": "tides.p.rapidapi.com"
            }
        };
        $.ajax(settings).done(function (response) {
            console.log(response, "TIDES");
            //recieve tide data
            console.log(response.extremes[0].timestamp);
            console.log(response.extremes[0].height);

            var height = response.extremes[0].height;
            height = height.toFixed(2);

            var height2 = response.heights[0].height;
            height2 = height2.toFixed(2);

            let unix_timestamp = response.heights[0].timestamp;
            var date = new Date(unix_timestamp * 1000);
            var hours = date.getHours();
            var minutes = "0" + date.getMinutes();
            var formattedTime = hours + ":" + minutes.substr(-2) + "am";
            if (hours > 12) {
                hours -= 12;
                formattedTime = hours + ":" + minutes.substr(-2) + "pm";
            }

            var timeD = $("<p></p>").text("Time: " + formattedTime);
            var hDiv = $("<p></p>").text("Height: " + height2);
            var sDiv = $("<p></p>").text("State: " + response.heights[0].state);
            $("#tide-data").addClass("card");

            $("#tide-data").append(timeD, sDiv, hDiv);


            for (var i = 0; i < 2; i++) {


                //converting unix time
                let unix_timestamp = response.extremes[i].timestamp;
                var date = new Date(unix_timestamp * 1000);
                var hours = date.getHours();
                var minutes = "0" + date.getMinutes();

                //changes from 24 hour time
                var formattedTime = hours + ":" + minutes.substr(-2) + "am";
                if (hours > 12) {
                    hours -= 12;
                    formattedTime = hours + ":" + minutes.substr(-2) + "pm";
                }
                console.log(formattedTime);
                var div = $("<div></div>").addClass("card card-body");
                div.attr("id", "tideRow");
                var nDiv = $("<div></div>").addClass("col s12 m6");
                var nDiv2 = $("<div></div>").addClass("col s12 m6 card");
                $("#tide-data1").addClass("row");

                var timeD = $("<p></p>").text("Time: " + formattedTime + "");
                var hDiv = $("<p></p>").text("Height: " + response.extremes[i].height.toFixed(2));
                var sDiv = $("<p></p>").text("State: " + response.extremes[i].state);

                //timeD, sDiv, hDiv
                nDiv.append(timeD, sDiv, hDiv);
                nDiv2.append(timeD, sDiv, hDiv);
                div.append(nDiv2, nDiv);
                //$("#tide-data").append(div);

                $("#tide-data1").append(nDiv2);

            }



        });
        //Al api call 
        // const settings = {
        //     "async": true,
        //     "crossDomain": true,
        //     "url": "https://tides.p.rapidapi.com/tides?latitude=44.414&longitude=-2.097&interval=60&duration=1440",
        //     "method": "GET",
        //     "headers": {
        //         "x-rapidapi-key": "060fa7bd32mshd4d14b256c582fbp173924jsn92ccfae51f8e",
        //         "x-rapidapi-host": "tides.p.rapidapi.com"
        //     }
        // };

        // $.ajax(settings).done(function (response) {
        //     console.log(response, "TIDES");


        //     $("#tide-data").append();

        // });
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

