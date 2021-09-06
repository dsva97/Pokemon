//#region DATA
const URL = 'https://pokeapi.co/api/v2/pokemon/'
const promisePokemones = 
    fetch(URL)
        .then(res=>res.json())
        .then(res=>res.results)
//#endregion DATA


//#region HTML elements
const input = document.getElementById('input')
const content = document.getElementById('content')
//#endregion HTML elements


//#region Utils
const fetchPokeImg = pokeUrl => 
    fetch(pokeUrl).then(res=>res.json())
        .then(res=>res.sprites.front_default)

//#endregion Utils


//#region Main
input.addEventListener('input', async e => {
    content.innerHTML = ''
    const search = e.target.value
    if(search) {
        (await promisePokemones)
        .filter(({name}) => name.includes(search))
        .forEach(async pokemon => {
            if(!pokemon.img) {
                pokemon.img = await fetchPokeImg(pokemon.url)
            }
            content.innerHTML += /*html*/`
            <div>
                <strong>${pokemon.name}</strong>
                <img src="${pokemon.img}" />
            </div>
            `
        })
    }
})
//#endregion Main