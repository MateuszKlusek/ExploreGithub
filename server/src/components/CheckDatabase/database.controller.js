// models
import Profiles from "../../models/Profiles.js"

// helpers
import { sleep } from "./../../helpers/sleep.js"

export const checkDatabase = async (req, res) => {
    const { profileQuery, mode } = req.body
    try {
        const response = await Profiles.find({ profileURL_toCompare: profileQuery })
        response.length > 0 ? res.send({ status: "found in DB", data: response[0] }) : res.send({ status: "not found in DB", data: "" })
    } catch (err) {
        console.log(err)
    }
}

export const getLatestThree = async (req, res) => {
    try {
        const response = await Profiles.find({}).sort({ scraped_at: -1 }).limit(3)
        res.send({ status: "ok", data: response })
    } catch (err) {
        console.log(err)
    }
}