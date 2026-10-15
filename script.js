const genreBtn = document.getElementById("genre-btn");
const genreMenu = document.getElementById("genre-menu");

genreBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    genreMenu.classList.toggle("show");
});