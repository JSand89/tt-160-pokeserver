import PokemonModel from "../models/pokemon.model.js"
import fetchPokemon from "../services/fetchPokemon.js"

const hola = async (req,res)=>{
    console.log("hola desde controlador")
    return res.status(200).send("hola desde controlador")
}

const createPokemon = async (req,res)=>{
    try {
        const toCreate = fetchPokemon(req.body.pokemon_id)
        if(toCreate == null){
            return res.status(400).send("pokemon_id no valido")
        }
        const pokemon = new PokemonModel(req.body)
        await pokemon.save()
        // code 11000 para nombre repetido
        return res.status(201).json(pokemon)
    } catch (error) {
        console.error(error)
        if(error.code == 11000){
            console.error(error)
            return res.status(500).json(
                {message:"Nombre de pokemon ya usado",
                error:error
            })
        }
        return res.status(error.code).json(error)
    }
}
const getPokemons = async (req,res)=>{
    try {
        const pokemons = await PokemonModel.find()
        return res.status(200).json(pokemons)
    } catch (error) {
        console.error(error)
        return res.status(error.code).json(error) 
    }
}
const getPokemonForPokedexStatus = async (req,res)=>{
    try {
        const {pokemon_id} = req.params// este es el numero en la pokedex del pokemon
        const pokemon = await fetchPokemon(pokemon_id)
        if(pokemon == null){
            return res.status(404).send("Pokemon no existe")
        }
        return res.status(200).json(pokemon) 
    } catch (error) {
        return error
    }

}
export {hola,createPokemon,getPokemons, getPokemonForPokedexStatus}