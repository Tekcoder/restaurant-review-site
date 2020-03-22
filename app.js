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
      <div class="card-header alert alert-info" id="name_${id}">${restaurant.restaurantName}</div>
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
      addMarker(map, "Restaurant Name", pos.lat, pos.lng);
      callback(map);
      // We add a DOM event here to show an alert if the DIV containing the
      // map is clicked.
      google.maps.event.addDomListener(mapDiv, "click", function() {
        $("#modal-id").append(`<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Add New Restaurant</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form>
                <div class="form-group">
                  <label for="recipient-name" class="col-form-label">Name:</label>
                  <input type="text" class="form-control" id="restaurant-name">
                </div>
                <div class="form-group">
                  <label for="restaurant-address" class="col-form-label">Address:</label>
                  <textarea class="form-control" id="restaurant-address"></textarea>
                </div>
                <div class="form-group">
                  <label for="restaurant-star" class="col-form-label">Star:</label>
                  <textarea class="form-control" id="restaurant-star"></textarea>
                </div>
              <div class="form-group">
                <label for="restaurant-comments" class="col-form-label">Comments:</label>
                <textarea class="form-control" id="restaurant-comments"></textarea>
              </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary">Submit</button>
            </div>
          </div>
        </div>
      </div>`);
      });
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
