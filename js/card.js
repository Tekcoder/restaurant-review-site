"use strict";

function card(restaurant, id) {
    if (restaurant.show == true) { 
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
    <div class="col-md-4" id="image_div"><img src='${restaurant.image}' id='radius' class='card-img' alt='Restaurant image'/></div>`);
  
    $("#rating_" + id).rating({});
  }
  }