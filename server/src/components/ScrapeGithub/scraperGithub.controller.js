import Profiles from "../../models/Profiles.js"
import { scrape } from "./../../helpers/scraper.js"

export const scraperGithub = async (req, res) => {
    const { profileQuery, mode, exists } = req.body

    try {
        const data = await scrape(profileQuery)

        // save data to database
        await Profiles.replaceOne({ profileURL_toCompare: profileQuery.toLowerCase() }, data, { upsert: true })

        res.send({ status: "found", data: data })
    }
    catch (err) {
        res.send({ status: "not found", data: " " })
    }
}