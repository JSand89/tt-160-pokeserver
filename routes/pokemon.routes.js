import {Router} from "express"
import {hola, createPokemon,getPokemons,getPokemonForPokedexStatus,catchPokemon} from "../controllers/pokemon.controllers.js"
const router = Router()

router.get("/hola",hola)
router.post("/view",createPokemon)
router.get("/",getPokemons)
router.get("/:pokemon_id",getPokemonForPokedexStatus)
router.put("/:id",catchPokemon)
export default router