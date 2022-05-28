import { scrape } from "./../../helpers/scraper.js"

export const scraperGithub = async (req, res) => {
    const { profileQuery, mode, exists } = req.body

    try {
        const data = await scrape(profileQuery)
        res.send({ status: "found", data: data })
    }
    catch (err) {
        res.send({ status: "not found", data: " " })
    }
}