import express from "express";
import { connectDB } from "./DB.js";
import cors from 'cors'
import { router } from "./controllers/EmpController.js";

let app  = express()

app.use(express.json())

app.use(cors({
    origin :'http://localhost:4200'
}))

app.use('/employee',router)
let port = 8080



connectDB()

app.listen(port, () => console.log(`crud app listening on port ${port}!`))
