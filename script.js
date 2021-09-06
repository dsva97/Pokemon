//#region DATA
const URL = 'https://pokeapi.co/api/v2/pokemon/'
let data = []
const promisePokemones = 
    fetch(URL)
        .then(res=>res.json())
        .then(res=>data=res.results)
//#endregion DATA


//#region HTML elements
const input = document.getElementById('input')
const content = document.getElementById('content')
//#endregion HTML elements


//#region Utils
const fetchPokeImg = pokeUrl => 
    fetch(pokeUrl).then(res=>res.json())
        .then(res=>res.sprites.front_default)

const getPokeImg = async pokeUrl => {
    const pokemon = data.find(({url})=>url===pokeUrl)
    if(!pokemon.img) {
        pokemon.img = await fetchPokeImg(pokeUrl)
    }
    return pokemon.img
}
//#endregion Utils


//#region Main
input.addEventListener('input', async e => {
    content.innerHTML = ''
    const search = e.target.value
    if(search) {
        await promisePokemones;
        data
        .filter(({name}) => name.split(search).length>1)
        .forEach(async ({name, url}) => {
            const img = await getPokeImg(url)
            content.innerHTML += /*html*/`
            <div>
                <strong>${name}</strong>
                <img src="${img}" />
            </div>
            `
        })
    }
})
//#endregion Main