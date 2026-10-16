const upcoming = document.getElementById("upcoming");
const popular = document.getElementById("popular");
const movies = document.getElementById("movies");
const genreBtn = document.getElementById("genre-btn");
const genreMenu = document.getElementById("genre-menu");
const cards = document.getElementById("movies");

genreBtn.addEventListener("click", (e) => {
  e.preventDefault();
  genreMenu.classList.toggle("show");
});

const api_key = `e7dfeebed18ea55af2842ab0282fcd56`;
const API_Popular = `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en-US&page=1`;
const API_Upcoming = `https://api.themoviedb.org/3/movie/upcoming?api_key=${api_key}&language=en-US&page=1`;
const genreData = {
  comedy: 35,
  action: 28,
  drama: 18,
  horror: 27,
};
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
  console.log(data[0]);
  cards.innerHTML = ``;
  data.forEach((elem) => {
    const title = elem.title;
    const image = `${img_path}${elem.poster_path}`;
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
popular.addEventListener("click", () => {
  fetchData(API_Popular);
});
upcoming.addEventListener("click", () => {
  fetchData(API_Upcoming);
});
fetchData(API_Popular);

let genereBtns = document.querySelectorAll(".genre-link");
genereBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    let genereId = btn.dataset.id;
    fetchGenere(genereId);
  });
});

