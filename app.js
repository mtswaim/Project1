const domain = `https://pokeapi.co/api/v2/pokemon`
const search = document.querySelector('#input');
let button = document.querySelector('#search')
const pageOne = document.querySelector('#home');
const pageGame = document.querySelector('#game');
let player;
const limitBox = document.querySelector('#run-box')

const getInfo = (pokemon) => {
  const pokeInfo = document.querySelector('.container');
  pokeInfo.innerHTML = `
  <h1> ${pokemon.name}</h1>
  <img class= "pok-pic" src= "${pokemon.sprites.front_default}" </h2>
  <br>  
  <br>
  <br>
  <li>Type: ${pokemon.types[0].type.name}</li>
    <li>Pokedex ID: #${pokemon.id}</li>
    <li>Speed: ${pokemon.stats[0].base_stat}</li>
    <button id="start-game">Start Game</button>
    `
  // spriteURL += pokemon.sprites.front_default
  const startGame = document.querySelector('#start-game')
  startGame.addEventListener('click', () => {
    pageOne.style.display = "none";
    pageGame.style.display = "block";
    limitBox.innerHTML = `<img id="player"src= "${pokemon.sprites.front_default}">`
    player = document.getElementById('player')
  })
};

button.addEventListener('click', async () => {
  let response = await axios.get(`${domain}/${search.value.toLowerCase()}/`)
  let pokeString = response.data;
  getInfo(pokeString)
})


// let ie = (document.all && !window.opera) ? 1 : 0;
// if (!ie) {
//   var e = document.captureEvents(Event.KEYDOWN)
// }
// window.onload = function () {
//   if (!ie) {
//     document.onkeydown = function (e) {
//       move(e);
//     }
//   }
//   else {
//     document.onkeydown = function () {
//       move();
//     }
//   }
// }
// function move(e) {
//   if (ie) {
//     ek = window.event.keyCode;
//   }
//   else {
//     let event = e;
//     var ek = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;
//   }
//   if (ek == 37) player.style.left = (player.style.left.replace('px', '') * 1) - 5;
//   if (ek == 39) player.style.left = (player.style.left.replace('px', '') * 1) + 5;
// }

// player.addEventListener('keydown', () => {

// } )