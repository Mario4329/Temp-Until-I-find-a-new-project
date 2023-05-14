"use strict";
const popular =
  "https://api.themoviedb.org/3/movie/popular?api_key=a1fdd1a0c8c57f436d5a3210f0a486fe&language=en-US&page=1";
const SEARCH_MOVIE =
  "https://api.themoviedb.org/3/search/movie?api_key=a1fdd1a0c8c57f436d5a3210f0a486fe&query=";
const IMAGE_PATH = "https://image.tmdb.org/t/p/w500/";

const searchBar = document.getElementById("searchBar");
const form = document.getElementById("form");
const loadBTN = document.getElementById("loadBtn");
let totalPages = 100;
let nextPage = 2;
let lastUrl = "";

window.onload = loadPopular(popular);

function loadPopular(url) {
  lastUrl = url;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      for (let idk = 0; idk < data.results.length; idk++) {
        let card = document.createElement("card");
        card.classList.add("card");
        document.querySelector(".movie-cards").appendChild(card);

        if (data.results.length !== 0) {
          let currentPage = data.page;
          nextPage = currentPage + 1;
          // let prevPage = currentPage - 1;
          totalPages = data.total_pages;
        }

        moives.push(data.results[idk]);
        if (data.results[idk].vote_average > 7.0) {
          // console.log(data.results[idk].vote_average);
          let randomMovie = moives[Math.floor(Math.random() * moives.length)];
          console.log(randomMovie);
        }

        // Dont repeat yourself

        let cardPoster = IMAGE_PATH + data.results[idk].poster_path;
        card.innerHTML = ` <h3>${data.results[idk].title}</h3>
        <img src="${cardPoster}" class="card-poster" />`;
      }
      let upcomingImg = document.createElement("upcomingImg");
      upcomingImg.classList.add("bannerImg");
      document.querySelector(".upcoming").appendChild(upcomingImg);
      let imgff = IMAGE_PATH + data.results[2].poster_path;
      upcomingImg.innerHTML = `
      <div class ="movieText">
      
      <h1>${data.results[2].title}</h1>
      <p>${data.results[2].overview}</p>
      
      </div>
      
      <img src="${imgff}" />`;
      console.log(data);
      console.log(imgff);
    });
  return true;
  // Use the vote average to pick from a certain score and randomly select movies with it.
}
let moives = [];

form.addEventListener("submit", (e) => {
  console.log("works");
  e.preventDefault();
  let searchInput = searchBar.value;

  if (searchInput !== "") {
    document.querySelector(".movie-cards").innerHTML = ``;
    loadMovies(SEARCH_MOVIE, searchInput);
    // if i do the thing in the video get rid of the search input from the bottom I think that would work
  } else {
    alert("Put Something in the box");
    // location.reload(true);
  }
});

// Use a for loop idiot

function loadMovies(url, searchInput) {
  lastUrl = url + searchInput;
  fetch(
    url + searchInput
    // "https://api.themoviedb.org/3/search/movie?api_key=a1fdd1a0c8c57f436d5a3210f0a486fe&query=" +
    //   searchInput
    // "https://api.themoviedb.org/3/movie/popular?api_key=a1fdd1a0c8c57f436d5a3210f0a486fe&language=en-US&page=1"
  )
    .then((res) => res.json())
    .then((data) => {
      for (let idk = 0; idk < data.results.length; idk++) {
        // moives.push(data.results[idk]);

        if (data.results.length !== 0) {
          let currentPage = data.page;
          nextPage = currentPage + 1;
          // let prevPage = currentPage - 1;
          totalPages = data.total_pages;
        }
        let card = document.createElement("card");
        card.classList.add("card");
        document.querySelector(".movie-cards").appendChild(card);

        let cardPoster = IMAGE_PATH + data.results[idk].poster_path;
        card.innerHTML = ` <h3>${data.results[idk].title}</h3>
        <img src="${cardPoster}" class="card-poster" />
        
        `;
      }
    });
  return true;
}

loadBTN.addEventListener("click", () => {
  if (nextPage <= totalPages) {
    console.log("WorkS");
    pageCall(nextPage);
  }
});

function pageCall(page) {
  let urlSplit = lastUrl.split("?");
  let queryParams = urlSplit[1].split("&");
  let key = queryParams[queryParams.length - 1].split("=");
  if (key[0] != "page") {
    let url = lastUrl + "&page=" + page;
    // loadMovies(url);
    loadPopular(url);
  } else {
    key[1] = page.toString();
    let a = key.join("=");
    queryParams[queryParams.length - 1] = a;
    let b = queryParams.join("&");
    let url = urlSplit[0] + "?" + b;
    // loadMovies(url);
    loadPopular(url);
  }

  // if (loadPopular()) {
  //   pageCall(loadPopular);
  //   // figure this out
  // }
}
