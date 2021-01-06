$(document).ready(function () {
    var yBusinessSearchAPI = "https://api.yelp.com/v3/businesses/search";

    $(".button").on("click", function () {
        $.ajax({
            type: "GET",
            url: yBusinessSearchAPI,
            dataType: "json",
            success: function (response) {
                console.log(response);
            }

        })
    })
});