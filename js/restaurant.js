"use strict";

let clickedPosition = {
    lat: 0,
    long: 0,
  };
  
//Adds a new restaurant to the list, uses location saved in map listener
function addRestaurant() {
    //1) Save all restaurant info
    var restaurantObject = {
      restaurantName: $("#add-restaurant-name").val(),
      address: $("#add-restaurant-address").val(),
      lat: clickedPosition.lat,
      long: clickedPosition.long,
      ratings: [
        {
          stars: $("#add-restaurant-star").val(),
          comment: $("#add-restaurant-comments").val(),
        },
      ],
    };
  
      if (restaurantObject.restaurantName === "") {
        alert('Kindly add the restaurant name')
        return false;
      } else if (restaurantObject.address === "") {
        alert('Kindly add the restaurant address')
        return false;
      } else if (restaurantObject.ratings[0].stars === null) {
        alert('Kindly choose a star rating from the dropdown')
        return false;
      } else if (restaurantObject.ratings[0].comment === "") {
        alert('Kindly leave a comment below')
        return false;
      }
      
      
    //2) Save restaurant in JSON
    var restaurantIcon = "http://maps.google.com/mapfiles/kml/paddle/ltblu-blank.png";
    restaurantList.push(restaurantObject);
    addMarker(
      map,
      restaurantObject.restaurantName,
      clickedPosition.lat,
      clickedPosition.long,
      restaurantIcon
    );
    card(restaurantObject, restaurantList.length);
    //3) Close modal
    $("#addRestaurantModal").modal("hide");
  }