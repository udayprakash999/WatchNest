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
  cards.innerHTML = ``;
  data.forEach((elem) => {
    const title = elem.title;
    const image = `${img_path}${elem.backdrop_path}`;
    const language = elem.original_language;
    const overview = elem.overview;
    const date = elem.release_date;
    const adult = elem.adult;
    const rating = elem.vote_average;

    const card = document.createElement("div");
    card.classList.add("movie-card");
    card.innerHTML = `
        <img src=${image} alt="">
        <h3>${title}</h3>
        <h4>${rating}</h4>
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

let genereBtns=document.querySelectorAll('.genre-link')
genereBtns.forEach(btn=>{
    btn.addEventListener('click',()=>{
        let genereId = btn.dataset.id
        fetchGenere(genereId)
    })
})