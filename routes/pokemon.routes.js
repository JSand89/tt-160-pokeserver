import {Router} from "express"
import {hola, createPokemon,getPokemons,getPokemonForPokedexStatus} from "../controllers/pokemon.controllers.js"
const router = Router()

router.get("/hola",hola)
router.post("/create",createPokemon)
router.get("/",getPokemons)
router.get("/:pokemon_id",getPokemonForPokedexStatus)
export default router