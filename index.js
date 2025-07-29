import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"

const app = express()

const PORT = process.env.PORT || 3006
app.set("port",PORT)

app.use(express.json())

app.listen(PORT,()=>{
    console.log(`Listening in port ${PORT}`)
})