"use strict";

function addMarker(map, name, latitude, longitude, icon) {
    // The location of User
  
    var restaurantLocation = { lat: latitude, lng: longitude };
    var marker = new google.maps.Marker({
      position: restaurantLocation,
      map: map,
      icon: icon,
      animation: google.maps.Animation.DROP
    });
  
    var infoWindow = new google.maps.InfoWindow({
      content: `<h3>${name}</h3>`,
    });
  
    marker.addListener("click", () => {
      infoWindow.open(map, marker);
    });
  }