import express from "express"
const router = express.Router()

import { githubAPI } from "./githubAPI.controller.js"

router.post("/githubAPI", githubAPI)

export default router;