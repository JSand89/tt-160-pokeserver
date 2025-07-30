import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"

import PokemonRouter from "./routes/pokemon.routes.js"
dotenv.config()
const app = express()

const PORT = process.env.PORT || 3006
app.set("port",PORT)

app.use(express.json())
app.use("/api/pokemon",PokemonRouter)

mongoose.connect(process.env.MONGO_DB_URI)
.then(()=> console.log("Conect to DB"))
.catch((error)=>console.error(error))

app.listen(PORT,()=>{
    console.log(`Listening in port ${PORT}`)
})