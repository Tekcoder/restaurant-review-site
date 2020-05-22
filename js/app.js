"use strict";

let restaurantList = [
  {
    restaurantName: "Bronco",
    address: "39 Rue des Petites Écuries, 75010 Paris",
    lat: 6.5489900,
    long: 3.36158059999967897,
    ratings: [
      {
        stars: 5,
        comment: "Great! But not many veggie options.",
      },
      {
        stars: 5,
        comment: "My favorite restaurant!",
      },
    ],
    show: true,
    image: "/images/jonathan-borba-5E0d3lfoC1w-unsplash.jpg"
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
        stars: 4,
        comment: "My favorite restaurant!",
      },
    ],
    show: true,
    image: "/images/tim-mossholder-FH3nWjvia-U-unsplash.jpg"
  },
  {
    restaurantName: "Babalou",
    address: "4 Rue Lamarck, 75018 Paris",
    lat: 6.5462976,
    long: 3.3665805999999997,
    ratings: [
      {
        stars: 3,
        comment: "Tiny pizzeria next to Sacre Coeur!",
      },
      {
        stars: 3,
        comment: "Meh, it was fine.",
      },
    ],
    show: true,
    image: "/images/clem-onojeghuo-P7-_EB3gQuA-unsplash.jpg"
  },
  {
    restaurantName: "Dominos",
    address: "33, Palm Avenue, Victoria Island",
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
    show: true,
    image: "/images/joseph-gonzalez-fdlZBWIP0aM-unsplash.jpg"
  },
];

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





  