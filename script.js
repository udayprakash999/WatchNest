const nav = document.querySelector("nav");
const header = document.querySelector("header");
const upcoming = document.getElementById("upcoming");
const popular = document.getElementById("popular");
const movies = document.getElementById("movies");
const genreBtn = document.getElementById("genre-btn");
const genreMenu = document.getElementById("genre-menu");
const cards = document.getElementById("movies");
const searchForm = document.querySelector(".search-box");

let genereOpen = false;
genreBtn.addEventListener("click", (e) => {
  if (!genereOpen) {
    e.preventDefault();
    genreMenu.classList.add("show");
    genereOpen = true;
  } else {
    e.preventDefault();
    genreMenu.classList.remove("show");
    genereOpen = false;
  }
});
window.addEventListener("click", (e) => {
  if (genereOpen && !e.target.closest("#genre-btn")) {
    e.preventDefault();
    genreMenu.classList.remove("show");
    genereOpen = false;
  }
});
const api_key = `e7dfeebed18ea55af2842ab0282fcd56`;
const API_Popular = `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en-US&page=1`;
const API_Upcoming = `https://api.themoviedb.org/3/movie/upcoming?api_key=${api_key}&language=en-US&page=1`;
const img_path = `https://image.tmdb.org/t/p/w500/`;

function fetchData(api) {
  fetch(api)
    .then((result) => result.json())
    .then((data) => {
      generateCard(data.results);
    })
    .catch(console.error());
}
function fetchGenere(genere) {
  const API_Genere = `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&with_genres=${genere}&page=1`;
  fetchData(API_Genere);
}
function generateCard(data) {
  cards.innerHTML = ``;
  data.forEach((elem) => {
    const title = elem.title;
    const image = elem.poster_path
      ? `${img_path}${elem.poster_path}`
      : elem.backdrop_path
        ? `${img_path}${elem.backdrop_path}`
        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8qQIlJ-l0xqlhqxVODyh2OUurmdXdjYDV7gIi3h8SN1nJhzqm96ODBZ_7&s=10";
    const language = elem.original_language;
    const overview = elem.overview;
    const date = elem.release_date;
    const adult = elem.adult;
    const rating = elem.vote_average;
    const card = document.createElement("div");
    card.classList.add("card");
    card.id = "card";
    card.innerHTML = `
    <div class="card-image">
      <img
        src=${image}
        alt=${title}
      />
    </div>
    <div class="card-content">
      <div class="name">
        <h4 class="movie-name">${title}</h4>
        <p class="date">${date}</p>
      </div>
      <div class="rating">
        <p>Rating</p>
        <p class="point">${rating}</p>
      </div>
    </div>
    <div class="card-overview">
      <p>${overview}</p>
    </div>
    `;

    cards.appendChild(card);
  });
}
function searchMovie(q) {
  const API_Search = `https://api.themoviedb.org/3/search/movie?query=${q}&api_key=${api_key}`;
  fetchData(API_Search);
}

popular.addEventListener("click", () => {
  fetchData(API_Popular);
});
upcoming.addEventListener("click", () => {
  fetchData(API_Upcoming);
});
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let query = e.target[0].value;
  searchMovie(query);
});

fetchData(API_Popular);

let genereBtns = document.querySelectorAll(".genre-link");
genereBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    let genereId = btn.dataset.id;
    fetchGenere(genereId);
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  });
});

observer.observe(header);
