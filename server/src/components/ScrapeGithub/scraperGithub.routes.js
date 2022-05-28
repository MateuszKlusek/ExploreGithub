import express from "express"
const router = express.Router()

import { scraperGithub } from "./scraperGithub.controller.js"

router.post("/scraperGithub", scraperGithub)

export default router;