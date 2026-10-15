const upcoming = document.getElementById("upcoming");
const popular =  document.getElementById("popular");
const movies = document.getElementById("movies");

const genreBtn = document.getElementById("genre-btn");
const genreMenu = document.getElementById("genre-menu");

genreBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    genreMenu.classList.toggle("show");
});

