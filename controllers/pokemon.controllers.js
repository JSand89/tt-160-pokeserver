import pokemonModel from "../models/pokemon.model.js"
import PokemonModel from "../models/pokemon.model.js"
import fetchPokemon from "../services/fetchPokemon.js"

const hola = async (req,res)=>{
    console.log("hola desde controlador")
    return res.status(200).send("hola desde controlador")
}

const createPokemon = async (req,res)=>{
    try {
        const toCreate = await fetchPokemon(req.body.pokemon_id)
        console.log(toCreate)
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
        const data = await pokemonModel.find({"pokemon_id":pokemon_id})
        if (data.length == 0){
            const pokemonStatus = {
                name:pokemon.name,
                pokemon_id:pokemon_id,
                view:true,
                catch:false,
                in_team:false,
                image: pokemon.sprites.front_default
            }
            return res.status(200).json(pokemonStatus)
        }
        let pokemon_view = data.filter(pokemon=>pokemon.catch == false )
        if(pokemon_view.length != 0){
             {
            const pokemonStatus = {
                name:pokemon.name,
                pokemon_id:pokemon_id,
                view:true,
                catch:false,
                in_team:false,
                image: pokemon.sprites.front_default
            }
            return res.status(200).json(pokemonStatus)
            }
        }
        let pokemon_in_team = data.filter(pokemon=>pokemon.in_team == true )
        if(pokemon_in_team.length > 0 ){
            const pokemonStatus = {
                name:pokemon.name,
                pokemon_id:pokemon_id,
                view:true,
                catch:true,
                in_team:true,
                image: pokemon.sprites.front_default
            }
            return res.status(200).json(pokemonStatus)
        }
         const pokemonStatus = {
                name:pokemon.name,
                pokemon_id:pokemon_id,
                view:true,
                catch:true,
                in_team:false,
                image: pokemon.sprites.front_default
            }
            return res.status(200).json(pokemonStatus)
    } catch (error) {
        return error
    }

}
const catchPokemon = async (req,res)=>{
    try {
        const {id} = req.params
        
        const pokemonToChange = await  PokemonModel.findByIdAndUpdate(id,{catch:true},{new:true})
        if(pokemonToChange== null){
            res.status(404).send("Pokemon no encontrado en DB")
        }
        return res.status(200).json(pokemonToChange)  
    }
         catch (error) {
        
    }
}
export {hola,createPokemon,getPokemons, getPokemonForPokedexStatus, catchPokemon}