"use strict";
const APIURL =
  "https://api.themoviedb.org/3/movie/popular?api_key=a1fdd1a0c8c57f436d5a3210f0a486fe&language=en-US&page=1";
const SEARCH_MOVIE =
  "https://api.themoviedb.org/3/search/movie?api_key={api_key}&query=";
const IMAGE_PATH = "https://image.tmdb.org/t/p/w500/";

const searchBar = document.getElementById("searchBar");
const form = document.getElementById("form");

form.addEventListener("submit", (e) => {
  console.log("works");
  e.preventDefault();
  let searchInput = searchBar.value;
  if (searchInput !== "") {
    loadMovies(searchInput);
  } else {
    alert("Put Something in the box");
  }
});

// Use a for loop idiot

const moives = [];

function loadMovies(searchInput) {
  fetch(
    "https://api.themoviedb.org/3/search/movie?api_key=a1fdd1a0c8c57f436d5a3210f0a486fe&query=" +
      searchInput
    // "https://api.themoviedb.org/3/movie/popular?api_key=a1fdd1a0c8c57f436d5a3210f0a486fe&language=en-US&page=1"
  )
    .then((res) => res.json())
    .then((data) => {
      for (let idk = 0; idk < data.results.length; idk++) {
        moives.push(data.results[idk]);

        let card = document.createElement("card");
        card.classList.add("card");
        document.querySelector(".movie-cards").appendChild(card);
        let cardPoster = IMAGE_PATH + data.results[idk].poster_path;
        card.innerHTML = ` <h3>${data.results[idk].title}</h3>
        <img src="${cardPoster}" class="card-poster" />
        
        `;

        // const markup = `
        // <img src=${data.results[idk].poster_path} />
        // `;
        // console.log(data.results[idk]);
        // console.log(data.results[idk].original_title);
        // console.log(data.results[idk].poster_path);
        console.log(cardPoster);
      }
      console.log(moives);
    });
}
