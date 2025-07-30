import Pokemon from "../models/pokemon.model.js"

const hola = async (req,res)=>{
    console.log("hola desde controlador")
    return res.status(200).send("hola desde controlador")
}

const createPokemon = async (req,res)=>{
    try {
        const pokemon = new Pokemon(req.body)
        await pokemon.save()
        return res.status(201).json(pokemon)
    } catch (error) {
        console.error(error)
        return res.status(error.status).json(error)
    }
}
export {hola,createPokemon}