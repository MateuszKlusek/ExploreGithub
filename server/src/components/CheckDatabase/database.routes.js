import express from "express"

const router = express.Router()

import { checkDatabase, getLatestThree } from "./database.controller.js"


router.get("/getLatestThree", getLatestThree)
router.post("/checkDatabase", checkDatabase)

export default router;