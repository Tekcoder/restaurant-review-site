let restaurantList = [
  {
    restaurantName: "Bronco",
    address: "39 Rue des Petites Écuries, 75010 Paris",
    lat: 6.5489996,
    long: 3.3688805999999997,
    ratings: [
      {
        stars: 4,
        comment: "Great! But not many veggie options."
      },
      {
        stars: 5,
        comment: "My favorite restaurant!"
      }
    ]
  },
  {
    restaurantName: "Bar beach",
    address: "39 Rue des Petites Écuries, 75010 Paris",
    lat: 6.5482276,
    long: 3.3615805999999997,
    ratings: [
      {
        stars: 4,
        comment: "Great! But not many veggie options."
      },
      {
        stars: 5,
        comment: "My favorite restaurant!"
      }
    ]
  },
  {
    restaurantName: "Babalou",
    address: "4 Rue Lamarck, 75018 Paris",
    lat: 6.5462976,
    long: 3.3665805999999997,
    ratings: [
      {
        stars: 5,
        comment: "Tiny pizzeria next to Sacre Coeur!"
      },
      {
        stars: 3,
        comment: "Meh, it was fine."
      }
    ]
  },
  {
    restaurantName: "Dominos",
    address: "33, Palm Avenue, Victoria",
    lat: 6.5489976,
    long: 3.3615805999999997,
    ratings: [
      {
        stars: 2,
        comment: "The Best Ever"
      },
      {
        stars: 3,
        comment: "Will come again"
      }
    ]
  }
];

let clickedPosition = {
  lat: 0,
  long: 0
};

$(document).ready(function() {
  initMap(function(map) {
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
  let average = 0;

  for (let i = 0; i < restaurant.ratings.length; i++) {
    average += restaurant.ratings[i].stars;
  }

  average /= restaurant.ratings.length;

  $("#restaurant-card").append(`
  <div class="col-md-8">
    <div class="card border-info mb-2 breadth">
      <div class="card-header alert alert-info" id="name_${id}"><a href="#" onclick="commentModal()">${restaurant.restaurantName}</a></div>
    <div class="card-body text-info">
      <h5 class="card-title" id="address_${id}">${restaurant.address}</h5>
      <input class="rating" data-readonly="true" id="rating_${id}" value="${average}" />  
    </div>
  </div>
  </div>
  <div class="col-md-4"><img src="jonathan-borba-5E0d3lfoC1w-unsplash.jpg" id="radius" class="card-img"alt="Restaurant image"/></div>`);

  $("#rating_" + id).rating({});
}

function initMap(callback) {
  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      var mapDiv = document.getElementById("map");

      map = new google.maps.Map(mapDiv, {
        center: { lat: pos.lat, lng: pos.lng },
        zoom: 16
      });

      addMarker(map, "Your Location", pos.lat, pos.lng);
      callback(map);
      map.addListener("click", function(e) {
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
    icon: restaurantsIcon + "ylw-pushpin.png"
  });

  var infoWindow = new google.maps.InfoWindow({
    content: `<h3>${name}</h3>`
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
    ratings: [
      {
        stars: $("#add-restaurant-star").val(),
        comment: $("#add-restaurant-comments").val()
      }
    ]
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
}

//Cleans addNewReview modal so that it always shows empty
function cleanCommentModal() {
  $("#add-new-star").val("");
  $("#add-new-comment").val("");
}
//This function displays the modal with the existing reviews
function commentModal() {
  $("#addReviewsModal").modal("show");
  //Calls a function when modal is hidden (to clean it)
  $("#addReviewsModal").on("hidden.bs.modal", cleanCommentModal);
}

function addNewReview() {
  //Display existing stars and comments
  var existingStarsAndReviews = {
    stars: restaurantList.ratings[i].stars,
    comments: restaurantList.ratings[i].comment
  };

  $("#display-stars").append(`<h3>${existingStarsAndReviews.stars}</h3>`);

  $("#display-comments").append(`<h3>${existingStarsAndReviews.comments}</h3>`);
  //Add new star and comment
  var newRestaurantReview = {
    ratings: [
      { stars: $("#add-new-star").val(), comment: $("#add-new-comment").val() }
    ]
  };
  //Update the stars and comments for the restaurant
  restaurantList.push(newRestaurantReview);
  //3) Close modal
  $("#addReviewsModal").modal("hide");
}
