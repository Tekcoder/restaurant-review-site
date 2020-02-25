let restaurantList = [
  {
    restaurantName: "Bronco",

    address: "39 Rue des Petites Écuries, 75010 Paris",
    lat: -32,

    long: 150,

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
    lat: -32,

    long: 150,

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
    lat: -30.5,

    long: 152,

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
    lat: -29.5,

    long: 151,

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

  for (let i = 0; i < restaurantList.length; i++) {
    card(restaurantList[i]);
  }
});

function initMap() {
  // The location of myPosition
  var myPosition = { lat: 6.548287999999, lng: 3.363564299999 };
  // The map, centered at User's Position
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 16,
    center: myPosition
  });
  // The marker, positioned at Uluru
  var marker = new google.maps.Marker({ position: myPosition, map: map });
}

for (let i = 0; restaurantList.length; i++) {
  var restaurantLatitude = restaurantList[i].lat;
  var restaurantListLongitude = restaurantList[i].long;

  var restaurantListLocation = { restaurantLatitude, restaurantListLongitude };

  var marker = new google.maps.Marker({
    position: restaurantListLocation,
    map: map
  });
  initMap(marker);
}
