const fetchPokemon = async (pokemon_id)=>{
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon_id}`)
        if (response.status == 404){
            return null
        }
        let pokemon = await response.json()
        return pokemon
    } catch (error) {
        console.error(error)
        return error
    }
}
export default fetchPokemon