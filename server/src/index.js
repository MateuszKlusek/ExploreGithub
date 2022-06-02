// imports
import express from "express"
import cors from "cors"

const app = express()

// db
import { mongoose } from "./config/mongoDB.js"

// variables
const PORT = process.env.PORT || 5001;

// middleweares
app.use(cors({ origin: "http://localhost:3000" }))
app.use(express.json())

// routes
import checkDatabase from "./components/CheckDatabase/database.routes.js"
import githubAPI from "./components/GithubAPI/githubAPI.routes.js"
import scraperGithub from "./components/ScrapeGithub/scraperGithub.routes.js"

app.use("/", checkDatabase)
app.use("/", githubAPI)
app.use("/", scraperGithub)

app.listen(PORT, () => {
    console.log(`Listening to port ${PORT} for Browse Github.`)
})