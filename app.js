const domain = `https://pokeapi.co/api/v2/pokemon`
const search = document.querySelector('#input');
let button = document.querySelector('#search')
const pageOne = document.querySelector('#home');
const pageGame = document.querySelector('#game');
const limitBox = document.querySelector('#run-box')
const player = document.querySelector("#player")
// let pokeBall = document.querySelector("#poke-ball")
const easy = document.querySelector('#easy')
const medium = document.querySelector('#medium')
const hard = document.querySelector('#hard')

let gameBox = document.querySelector('#button-box')
let startLeft = 400;
let expBar = document.querySelector('#experience-bar')
let exp = document.querySelector('#experience')
let loseBox = document.querySelector('#lose-box')
let tryNew = document.querySelector('#try-new-poke')
let tryNew2 = document.querySelector('#try-new-poke2')
let tryAgain = document.querySelector('#try-again')
let difficulty;
let totalExp = 0;
let playerNumber = document.querySelector("#player-level").innerHTML
let playerLvl = parseInt(playerNumber)
let wonGame = document.querySelector('#won-game')
window.addEventListener("keydown", function (e) {
  if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
    e.preventDefault();
  }
}, false);


const gainExp = () => {

  if (totalExp < 390 && player.style.display !== "none") {
    totalExp += 400
    exp.style.width = `${totalExp}px`;
    setTimeout(gainExp, 100)
  }
  if (totalExp >= 390) {
    playerLvl += 1
    document.querySelector("#player-level").innerHTML = playerLvl
    totalExp = 0
    exp.style.width = `${totalExp}px`;

  }
  if (playerLvl === 20 && totalExp === 0) {
    setInterval(generateBall, 1000)
    console.log("ran")
  }
  if (playerLvl === 40 && totalExp === 0) {
    difficulty += 1
    console.log(difficulty)
  }
  if (playerLvl === 60 && totalExp === 0) {
    setInterval(generateBall, 3000)
    console.log("ran")
  }
  if (playerLvl === 80 && totalExp === 0) {
    difficulty += 1
    console.log(difficulty)
  }
  if (playerLvl === 100) {
    wonGame.style.display = "block"
    pageGame.style.display = "none"
  }
}

const pokeFall = (pokeball, startTop) => {
  if (startTop < 830) {
    startTop += difficulty
    pokeball.style.top = `${startTop}px`
    setTimeout(() => pokeFall(pokeball, startTop), 5)
    let randomPokeLoc = document.querySelector('#random-poke').getBoundingClientRect();
    let randomPokeLocRight = randomPokeLoc.right
    let randomPokeLocLeft = randomPokeLoc.left
    let randomPokeLocBottom = randomPokeLoc.bottom

    let playerLoc = document.querySelector("#player").getBoundingClientRect();
    let playerLocRight = playerLoc.right
    let playerLocLeft = playerLoc.left
    let playerLocTop = playerLoc.top


    if ((playerLocTop <= randomPokeLocBottom) && (playerLocLeft <= randomPokeLocLeft && playerLocRight >= randomPokeLocRight)) {
      player.style.display = "none"
      loseBox.style.display = "block"
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
    startLeft -= 25
    player.style.left = `${startLeft}px`;
  }
}
const mvRight = () => {
  if (startLeft < 1677) {
    startLeft += 25
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

easy.addEventListener('click', () => {
  setInterval(generateBall, 150)
  difficulty = 1
  gameBox.style.display = 'none'
  gainExp();
})

medium.addEventListener('click', () => {
  setInterval(generateBall, 150)
  difficulty = 3
  gameBox.style.display = 'none'
  gainExp();

})

hard.addEventListener('click', () => {
  setInterval(generateBall, 100)
  difficulty = 6
  gameBox.style.display = 'none'
  gainExp();
})

tryNew.addEventListener('click', () => {
  location.reload()
})
tryNew2.addEventListener('click', () => {
  location.reload()
})
