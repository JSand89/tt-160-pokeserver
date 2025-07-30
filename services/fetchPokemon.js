const fetchPokemon = async (pokemon_id)=>{
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon_id}`)
        let pokemon = await response.json()
        return pokemon
    } catch (error) {
        console.error(error)
        // if(error.code==404){
        //     return null
        // }
        return error
    }
}
export default fetchPokemon