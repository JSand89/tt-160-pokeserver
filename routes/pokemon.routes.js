import {Router} from "express"
import {hola, createPokemon} from "../controllers/pokemon.controllers.js"
const router = Router()

router.get("/hola",hola)
router.post("/create",createPokemon)

export default router