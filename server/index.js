// imports
import express from "express"
import cors from "cors"
import fs from "fs"
import morgan from "morgan"

const app = express()

// db
import { mongoose } from "./src/config/mongoDB.js"

// variables
const PORT = process.env.PORT || 5001;
const ORIGINS = ["https://www.exploregithub.com", "http://www.exploregithub.com", "https://139.177.183.132:5001", "http://139.177.183.132:5001", "http://localhost:3000"]

// create a write stream (in append mode)
const serverPath = process.cwd()
var accessLogStream = fs.createWriteStream(`${serverPath}/src/logs/access.log`, { flags: 'a' })

// middleweares
app.use(morgan("combined", { stream: accessLogStream }))
app.use(cors({ origin: ORIGINS }))
app.use(express.json())

// routes
import checkDatabase from "./src/components/CheckDatabase/database.routes.js"
import githubAPI from "./src/components/GithubAPI/githubAPI.routes.js"
import scraperGithub from "./src/components/ScrapeGithub/scraperGithub.routes.js"

app.use("/api", checkDatabase)
app.use("/api", githubAPI)
app.use("/api", scraperGithub)

app.listen(PORT, () => {
    console.log(`Listening to port ${PORT} for Explore Github.`);
});
