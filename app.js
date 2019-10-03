const domain = `https://pokeapi.co/api/v2/pokemon`
const search = document.querySelector('#input');
let button = document.querySelector('#search')
const pageOne = document.querySelector('#home');
const pageGame = document.querySelector('#game');
const limitBox = document.querySelector('#run-box')
const player = document.querySelector("#player")
// let pokeBall = document.querySelector("#poke-ball")
const beginGame = document.querySelector('#begin')
let startLeft = 400;


const pokeFall = (pokeball, startTop) => {
  if (startTop < 800) {
    startTop += 1
    pokeball.style.top = `${startTop}px`
    setTimeout(() => pokeFall(pokeball, startTop), 5)
    let randomPokeLoc = document.querySelector('#random-poke').getBoundingClientRect();
    let randomPokeLocRight = randomPokeLoc.right
    let randomPokeLocLeft = randomPokeLoc.left
    let randomPokeLocBottom = randomPokeLoc.bottom
    let randomPokeLocTop = randomPokeLoc.top
    let randomPokeLocX = randomPokeLoc.x
    let randomPokeLocY = randomPokeLoc.y

    let playerLoc = document.querySelector("#player").getBoundingClientRect();
    let playerLocRight = playerLoc.right
    let playerLocLeft = playerLoc.left
    let playerLocTop = playerLoc.top
    let playerLocBottom = playerLoc.bottom
    let playerLocX = playerLoc.x
    let playerLocY = playerLoc.y

    if ((playerLocTop <= randomPokeLocBottom) && (playerLocLeft <= randomPokeLocLeft && playerLocRight >= randomPokeLocRight)) {
      console.log("Holy fuck")
    } else {

    }
  } else {
    pokeball.remove();

  }

}
const generateBall = () => {
  let randomPoke = document.createElement('div')
  randomPoke.id = "random-poke"
  pageGame.append(randomPoke)
  randomSpot = Math.floor(Math.random() * window.innerWidth + 1)
  randomPoke.style.left = `${randomSpot}px`
  randomPoke.style.top = "0px"
  pokeFall(randomPoke, 0)

}
let player1;
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
    player.style.backgroundImage = `url(${pokemon.sprites.front_default})`
    setInterval(generateBall, 2000)
  })
  player1 = document.getElementById('#player')
};
button.addEventListener('click', async () => {
  let response = await axios.get(`${domain}/${search.value.toLowerCase()}/`)
  let pokeString = response.data;
  getInfo(pokeString)
})
const mvLeft = () => {
  if (startLeft > 0) {
    startLeft -= 15
    player.style.left = `${startLeft}px`;
  }
}
const mvRight = () => {
  if (startLeft < 1677) {
    startLeft += 15
    player.style.left = `${startLeft}px`;
  }
}
document.addEventListener('keydown', event => {
  if (event.keyCode === 37) {
    mvLeft();
  }
  if (event.keyCode === 39) {
    mvRight();
  }
})

beginGame.addEventListener('keydown', event) => {
  if (event.keycode === 32) {

  }
}