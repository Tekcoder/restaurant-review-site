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

$(document).ready(function() {
  initMap(function(map) {
    for (let i = 0; i < restaurantList.length; i++) {
      card(restaurantList[i]);
      addMarker(
        map,
        restaurantList[i].restaurantName,
        restaurantList[i].lat,
        restaurantList[i].long
      );
    }
  });
  ('#rating').rating();
});

function card(restaurant) {
  $("#restaurant-card").append(`<div class="col-md-8">
    <div class="card border-info mb-2 breadth">
  <div class="card-header alert alert-info" id="name">${restaurant.restaurantName}</div>
  <div class="card-body text-info">
    <h5 class="card-title" id="address">${restaurant.address}</h5>
    <p class="card-text" id="rating">${restaurant.ratings[0].stars}</p>  
  </div>
  </div>
  </div>
  <div class="col-md-4"><img src="jonathan-borba-5E0d3lfoC1w-unsplash.jpg" id="radius" class="card-img"alt="Restaurant image"/></div>`);
}

function initMap(callback) {
  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: pos.lat, lng: pos.lng },
        zoom: 15
      });
      addMarker(map, "Restaurant Name", pos.lat, pos.lng);
      callback(map);
    });
  }
}

function addMarker(map, name, latitude, longitude) {
  // The location of myPosition
  var iconBase = "https://maps.google.com/mapfiles/kml/pushpin/";

  var myPosition = { lat: latitude, lng: longitude };
  var marker = new google.maps.Marker({
    position: myPosition,
    map: map,
    icon: iconBase + "ylw-pushpin.png"
  });

  var infoWindow = new google.maps.InfoWindow({
    content: "<h3>My Location</h3>"
  });

  marker.addListener("click", () => {
    infoWindow.open(map, marker);
  });
}
