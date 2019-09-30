const domain = `https://pokeapi.co/api/v2/pokemon`
const search = document.querySelector('#input');
let button = document.querySelector('button')

const getInfo = (pokemon) => {
  const pokeInfo = document.querySelector('.container');
  pokeInfo.innerHTML = `
    <h1> ${pokemon.name}</h1>
    <img src= "${pokemon.sprites.front_default}" </h2>
    <li>Type: ${pokemon.types[0].type.name}</li>
    <li>Pokedex ID: #${pokemon.id}</li>
    <li>Speed: ${pokemon.stats[0].base_stat}</li>
    `

};

button.addEventListener('click', async () => {
  let response = await axios.get(`${domain}/${search.value}/`)
  let pokeString = response.data;
  getInfo(pokeString)
})