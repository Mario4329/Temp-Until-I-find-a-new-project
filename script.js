"use strict";
// fetch(a1fdd1a0c8c57f436d5a3210f0a486fe);

const searchBar = document.getElementById("searchBar");
const form = document.getElementById("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let searchInput = searchBar.value;
  loadMovies(searchInput);
});

function loadMovies(searchInput) {
  console.log(searchInput);
}
