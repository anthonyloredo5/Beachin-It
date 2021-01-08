# Beachin' It

This application is designed to simplify finding a relaxing beach anywhere in florida! Functionality includes: access to Google Maps location data for finding your beach, tide data for each location, input parameters based desired activities, and also lists nearby attractions/restaurants.

# Prerequisites
-  Any modern web browser including: Chrome, Edge, Firefox, Opera.

# Framework/Css

- Materialize Css Framework (Cards/Clickdown menus)

# API's

- World Tides Api (tide information)
    (SRC: https://www.worldtides.info/api/v2?heights&plot&date=2021-01-07&lat=33.768321&lon=-118.195617&key=)

- Yelp API (location)
    (SRC: https://api.yelp.com/v3/businesses/search)

- Open Weather API (location/forecast)
    (SRC: https://api.openweathermap.org/data/2.5/onecall?lat=)

- Google Maps API (nearby places information/location)
    (SRC: https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=burgers%20NewSmyrnaBeach&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=AIzaSyBpsko6mY2gC8yhiv3pQsX0X2axGTXKrE0)

# Future Scope
    - Plan to increase functionality, perhaps adding weather the beach is dog friendly and increasing search parameters based on preferences and activities available. In addition, we'd like to add more animations and clean up ui.