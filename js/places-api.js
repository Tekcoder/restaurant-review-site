"use strict";

function placesApiRestaurant() {

    var placesRestaurant =  'http://maps.google.com/mapfiles/kml/pal2/icon43.png' 

    let restaurantSearch =  $("#search-location").val()

  navigator.geolocation.getCurrentPosition(function (position) {
    var pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
    var request = {
      location: { lat: pos.lat, lng: pos.lng },
      radius: '500',
      type: ['restaurant'],
      query: restaurantSearch
    };
    service = new google.maps.places.PlacesService(map);
  service.textSearch(request, callback);
  }
  )

  function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        var place = results[i];
        console.log(place)
        var restaurantResult = {
          restaurantName: place.name,
          address: place.formatted_address,
          lat: place.geometry.location.lat(),
          long: place.geometry.location.lng(),
          ratings: [
            {
              stars: place.rating,
            }
          ],
          show: true,
          image: place.photos[0].getUrl() 
        };
    
        restaurantList.push(restaurantResult);
        addMarker(map, place.name, place.geometry.location.lat(), place.geometry.location.lng(), placesRestaurant);
        card(restaurantResult, restaurantList.length)
      }
    }
  }
  }