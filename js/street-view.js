"use strict";
let panorama = null;

function callStreet(lat, long) {
    $("#streetViewModal").modal("show");
  
    panorama = new google.maps.StreetViewPanorama(
      document.getElementById("street-view"),
      {
        position: { lat: lat, lng: long },
      }
    );
    map.setStreetView(panorama);
  }