import express from "express"
import cors from "cors"

const app = express()


import { mongoose } from "./config/mongoDB.js"

// VARIABLES
const PORT = process.env.PORT || 5001;


// MIDDLEWARES
app.use(cors({ origin: "http://localhost:3000" }))
app.use(express.json())


// ROUTES
import checkDatabase from "./components/CheckDatabase/database.routes.js"
import githubAPI from "./components/GithubAPI/githubAPI.routes.js"
import scraperGithub from "./components/ScrapeGithub/scraperGithub.routes.js"

app.use("/", checkDatabase)
app.use("/", githubAPI)
app.use("/", scraperGithub)



app.listen(PORT, () => {
    console.log(`Listening to port ${PORT} for Browse Github.`)
})