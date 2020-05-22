"use strict";

let currentRestaurantID = 0;

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
  
    let newRating = restaurantAverage(restaurantList[currentRestaurantID].ratings)    
    $("#rating_" + currentRestaurantID).rating('update', newRating)
  }

  $("#ratings-filter").change(function () {
    var selectedValue = $("#ratings-filter").val();

    for (let i = 0; i < restaurantList.length; i++) {
      let averagePerRestaurant = restaurantAverage(restaurantList[i].ratings);
      if (selectedValue <= averagePerRestaurant) {
        restaurantList[i].show = true;
      } else {
        restaurantList[i].show = false;
      }
    } 

    $("#restaurant-card").html("")
    for (let i = 0; i < restaurantList.length; i++) {
      card(restaurantList[i], i)
     }
      
});

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
  