let restaurantList = [
  {
    restaurantName: "Bronco",
    address: "39 Rue des Petites Écuries, 75010 Paris",
    lat: 6.5489900,
    long: 3.3688805123456,
    ratings: [
      {
        stars: 4,
        comment: "Great! But not many veggie options.",
      },
      {
        stars: 5,
        comment: "My favorite restaurant!",
      },
    ],
  },
  {
    restaurantName: "Bar beach",
    address: "39 Rue des Petites Écuries, 75010 Paris",
    lat: 6.5482276,
    long: 3.3615805999999997,
    ratings: [
      {
        stars: 4,
        comment: "Great! But not many veggie options.",
      },
      {
        stars: 5,
        comment: "My favorite restaurant!",
      },
    ],
  },
  {
    restaurantName: "Babalou",
    address: "4 Rue Lamarck, 75018 Paris",
    lat: 6.5462976,
    long: 3.3665805999999997,
    ratings: [
      {
        stars: 5,
        comment: "Tiny pizzeria next to Sacre Coeur!",
      },
      {
        stars: 3,
        comment: "Meh, it was fine.",
      },
    ],
  },
  {
    restaurantName: "Dominos",
    address: "33, Palm Avenue, Victoria",
    lat: 6.5489976,
    long: 3.3615805999999997,
    ratings: [
      {
        stars: 2,
        comment: "The Best Ever",
      },
      {
        stars: 3,
        comment: "Will come again",
      },
    ],
  },
];

let map = null;
let panorama = null;

let clickedPosition = {
  lat: 0,
  long: 0,
};

let currentRestaurantID = 0;

$(document).ready(function () {
  initMap(function (map) {
    for (let i = 0; i < restaurantList.length; i++) {
      card(restaurantList[i], i);
      addMarker(
        map,
        restaurantList[i].restaurantName,
        restaurantList[i].lat,
        restaurantList[i].long
      );
    }
  });
});

function card(restaurant, id) {
  let average = restaurantAverage(restaurant.ratings);

  $("#restaurant-card").append(`
  <div class="col-md-8">
    <div class="card border-info mb-2 breadth">
      <div class="card-header text text-info" id="name_${id}"><a href="#" onclick="commentModal(${id})">${restaurant.restaurantName}</a></div>
    <div class="card-body text-info">
      <h5 class="card-title" id="address_${id}">${restaurant.address}</h5>
      <input class="rating" data-readonly="true" id="rating_${id}" value="${average}" />  
      <button class="btn btn-info" onClick="callStreet(${restaurant.lat}, ${restaurant.long})">Show Street View</button>
    </div>
  </div>
  </div>
  <div class="col-md-4"><img src="/images/jonathan-borba-5E0d3lfoC1w-unsplash.jpg" id="radius" class="card-img"alt="Restaurant image"/></div>`);

  $("#rating_" + id).rating({});
}

//Calculates the average rating of the restaurant
function restaurantAverage(ratings) {
  let average = 0;

  for (let i = 0; i < ratings.length; i++) {
    average += ratings[i].stars;
  }

  average /= ratings.length;

  return average;
}

function getComments(ratings) {
  let comments = "<ol>";

  for (let i = 0; i < ratings.length; i++) {
    comments += `<li>${ratings[i].comment}</li>`;
  }

  comments += "</ol>";

  return comments;
}

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

      addMarker(map, "Your Location", pos.lat, pos.lng);
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

function addMarker(map, name, latitude, longitude) {
  // The location of myPosition
  var restaurantsIcon = "https://maps.google.com/mapfiles/kml/pushpin/";

  var restaurantLocation = { lat: latitude, lng: longitude };
  var marker = new google.maps.Marker({
    position: restaurantLocation,
    map: map,
    icon: restaurantsIcon + "ylw-pushpin.png",
    animation: google.maps.Animation.DROP
  });

  var infoWindow = new google.maps.InfoWindow({
    content: `<h3>${name}</h3>`,
  });

  marker.addListener("click", () => {
    infoWindow.open(map, marker);
  });
}

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
  //2) Save restaurant in JSON
  restaurantList.push(restaurantObject);
  addMarker(
    map,
    restaurantObject.restaurantName,
    clickedPosition.lat,
    clickedPosition.long
  );
  card(restaurantObject, restaurantList.length);
  //3) Close modal
  $("#addRestaurantModal").modal("hide");
}

//Cleans addRestaurantModal so that it always shows empty
function cleanRestaurantModal() {
  $("#add-restaurant-name").val("");
  $("#add-restaurant-address").val("");
  $("#add-restaurant-star").val("");
  $("#add-restaurant-comments").val("");
  clickedPosition.lat = 0;
  clickedPosition.long = 0;
  currentRestaurantID = 0;
}

//Cleans addNewReview modal so that it always shows empty
function cleanCommentModal() {
  $("#display-stars").val("");
  $("#display-comments").val("");
}
//This function displays the modal with the existing reviews
function commentModal(id) {
  //Save restaurant ID for later
  currentRestaurantID = id;
  let individualAverage = restaurantAverage(restaurantList[currentRestaurantID].ratings);
  let comments = getComments(restaurantList[currentRestaurantID].ratings);

  $("#display-stars").html(`${individualAverage}`);

  $("#display-comments").html(`${comments}`);
  //Add new star and comment
  $("#addReviewsModal").modal("show");
  //Calls a function when modal is hidden (to clean it)
  $("#addReviewsModal").on("hidden.bs.modal", cleanCommentModal);
}

function addNewReview() {
  var newRestaurantReview = {
    ratings: [
      { stars: $("#add-new-star").val(), comment: $("#add-new-comment").val() },
    ],
  };
  //Update the stars and comments for the restaurant
  restaurantList.push(newRestaurantReview);
  //3) Close modal
  $("#addReviewsModal").modal("hide");

  restaurantList[currentRestaurantID].ratings.push({
    stars: parseInt($("#add-new-star").val()),
    comment: $("#add-new-comment").val(),
  });

  $("#addReviewsModal").modal("hide");
}

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

//This function filters the ratings and updates the card component that is displayed on the map
// I'm yet to complete the logic required for this function
 function filteredStar(ratings, id){
  $("#ratings-filter").change(function () {
      var selectedValue = $("#ratings-filter option:selected").val();
      
      let averageRestaurantRating = [];

      for (let i = 0; i < ratings.length; i++) {
        if (selectedValue === individualAverage) {
          averageRestaurantRating.push(average)
          //updates the card component
          card(averageRestaurantRating, id)
        } else {
          return averageRestaurantRating;
        }
      }
      // alert(`The selected rating is  ${selectedValue}`);
  });
}