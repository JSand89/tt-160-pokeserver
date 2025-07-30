import {Router} from "express"
import {hola, createPokemon,getPokemons} from "../controllers/pokemon.controllers.js"
const router = Router()

router.get("/hola",hola)
router.post("/create",createPokemon)
router.get("/",getPokemons)

export default router