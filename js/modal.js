"use strict";

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