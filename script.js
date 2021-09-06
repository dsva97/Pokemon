//#region DATA
const URL = 'https://pokeapi.co/api/v2/pokemon/'
const promisePokemones = 
    fetch(URL)
        .then(res=>res.json())
        .then(res=>res.results)
        .catch(err=>console.error(err) || [])
//#endregion DATA


//#region HTML elements
const input = document.getElementById('input')
const content = document.getElementById('content')
//#endregion HTML elements


//#region Utils
const fetchPokeImg = pokeUrl => 
    fetch(pokeUrl)
        .then(res=>res.json())
        .then(res=>res.sprites.front_default)
        .catch(err=>console.error(err) || null)

const printPokemon = ({ name, img }) => {
    if(name && img) {
        content.innerHTML += /*html*/`
        <div>
            <strong>${name}</strong>
            <img src="${img}" alt="${name}" />
        </div>
        `
    }
}
//#endregion Utils


//#region Main
const handlerChange = async e => {
    content.innerHTML = ''
    const search = e.target.value
    if(search) {
        (await promisePokemones)
        .filter(({name}) => name.includes(search))
        .forEach(async pokemon => {
            if(!pokemon.img) {
                pokemon.img = await fetchPokeImg(pokemon.url)
            }
            printPokemon(pokemon)
        })
    }
}
input.addEventListener('input', handlerChange)
//#endregion Main