import {Router} from "express"
import {hola, viewPokemon,getPokemons,getPokemonForPokedexStatus,catchPokemon,changeStatusInTeam} from "../controllers/pokemon.controllers.js"
const router = Router()

router.get("/hola",hola)
router.post("/view",viewPokemon)
router.get("/",getPokemons)
router.get("/:pokemon_id",getPokemonForPokedexStatus)
router.post("/catch/",catchPokemon)
router.put("/in_team/:id",changeStatusInTeam)
export default router