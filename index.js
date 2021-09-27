import axios from 'axios'
export {datosPokemon}


// traer data del api
const dataPokemon = async () => {
    const {data: response} = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=150")
    const datos = response.results
    return datos
}
// leer pokemon por pokemon
const pokemon = async (datos) => {
    const pokemonUnico = datos.map(async ({url}) => {
        const {data: dataUnico} = await axios.get(url)
        return dataUnico
    })

    return pokemonUnico 
}
// extraer informacion de cada pokemon para asi crear json con solo el nombre y el url de la imagen
const datosPokemon = async () => { 
    const datos = await dataPokemon()
    const dataUnico = await pokemon(datos)
    const dataUnico2 = await Promise.all(dataUnico)
    const informacionPokemon = dataUnico2.map(p => {
    let nombreEImagen = {
            nombre: p.name,
            img: p.sprites.front_default,
            order: p.id,
        }
        return nombreEImagen
    }); 
    return informacionPokemon
}

