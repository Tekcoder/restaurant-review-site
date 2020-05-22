"use strict";

let map = null;

function initMap(callback) {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
  
        var mapDiv = document.getElementById("map");
  
        map = new google.maps.Map(mapDiv, {
          center: { lat: pos.lat, lng: pos.lng },
          zoom: 16,
        });
        var userIcon = "https://maps.google.com/mapfiles/kml/pushpin/ltblu-pushpin.png";
        addMarker(map, "User's Location", pos.lat, pos.lng, userIcon);
        callback(map);
        map.addListener("click", function (e) {
          //Save location for later
          clickedPosition.lat = e.latLng.lat();
          clickedPosition.long = e.latLng.lng();
          $("#addRestaurantModal").modal("show");
          //Calls a function when modal is hidden (to clean it)
          $("#addRestaurantModal").on("hidden.bs.modal", cleanRestaurantModal);
        });
      });
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  }