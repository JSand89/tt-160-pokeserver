import pokemonModel from "../models/pokemon.model.js"
import PokemonModel from "../models/pokemon.model.js"
import fetchPokemon from "../services/fetchPokemon.js"

const hola = async (req,res)=>{
    console.log("hola desde controlador")
    return res.status(200).send("hola desde controlador")
}

const viewPokemon = async (req,res)=>{
    try {
       const toCreate = await fetchPokemon(req.body.pokemon_id)
        console.log(toCreate)
        if(toCreate == null){
            return res.status(400).send("pokemon_id no valido")
        }
        const pokemonView ={
            "pokemon_id":req.body.pokemon_id,
            "stats":[1,1,1,1,1,1],
            "name":toCreate.name,
            "nivel":0
        }
        const pokemon = new PokemonModel(pokemonView)
        await pokemon.save()
        // code 11000 para nombre repetido
        return res.status(201).send(`Pokemon ${toCreate.name} visto`)
    } catch (error) {
        console.error(error)
        if(error.code == 11000){
            console.error(error)
            return res.status(400).json(
                {message:`Pokemon con id: ${req.body.pokemon_id} ya visto`,
            })
        }
        return res.status(500).json(error)
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
            const toCreate = await fetchPokemon(req.body.pokemon_id)
            if(toCreate == null){
                return res.status(404).send("Pokemon no encontrado en la pokeapi")
            }
            const pokemonView = await pokemonModel.find({pokemon_id:req.body.pokemon_id,name:toCreate.name})
            console.log(pokemonView)
            if(pokemonView.length == 0){
                return res.status(400).send(`Pokemon ${toCreate.name}, con id: ${req.body.pokemon_id} no esta visto aun`)
            }
            const pokemonToCatch ={
            "pokemon_id":req.body.pokemon_id,
            "stats":req.body.stats,
            "name":req.body.name,
            "nivel":req.body.nivel,
            "catch":true
        }
        const pokemon = new PokemonModel(pokemonToCatch)
        await pokemon.save()
        return res.status(201).json(pokemon)  
    }
    catch (error) {
        if(error.code == 11000){
            console.error(error)
            return res.status(400).json({message:`Nombre ya usado`})
        }
        console.error(error)
        return res.status(500).json(error)
    }
}

const changeStatusInTeam = async (req,res)=>{
    try {
        console.log("in team")
        const {id} = req.params
        const pokemonToChange =await pokemonModel.findById(id)
        if(pokemonToChange == null){
            return res.status(404).send("Pokemon no encontrado en DB")
        }
        if (!pokemonToChange.catch){
            return res.status(400).send("Pokemon aun no esta capturado")
        }
        if(pokemonToChange.in_team){
            const pokemon = await  PokemonModel.findByIdAndUpdate(id,{in_team:false},{new:true})
            return res.status(200).json(pokemon)
        }
        const pokemon = await  PokemonModel.findByIdAndUpdate(id,{in_team:true},{new:true})
        return res.status(200).json(pokemon)
    } catch (error) {
        return res.status(500).send(error)
    }
}
export {hola,viewPokemon,getPokemons, getPokemonForPokedexStatus, catchPokemon,changeStatusInTeam}