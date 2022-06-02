// packages
import axios from "axios";

// models
import Profiles from "../../models/Profiles.js"


export const githubAPI = async (req, res) => {
    console.log("sinside github API route")
    const { profileQuery, mode, exists } = req.body
    console.log(profileQuery, mode, exists)

    try {
        const response1 = await axios({
            method: 'get',
            url: `https://api.github.com/users/${profileQuery}`,
        })

        const response2 = await axios({
            method: 'get',
            url: `https://api.github.com/users/${profileQuery}/repos`,
            params: {
                per_page: 100,
                // page arguments in parags, it's like pagination
                page: 1
            }
        })

        // if there's already an entry in db, but we till want to change it (update it)

        // you can only get 30 repos max??????

        const profileURL_toCompare = response1.data.login.toLowerCase();

        var data_to_save = {
            profileURL: response1.data.login,
            profileURL_toCompare: profileURL_toCompare,
            id: response1.data.id,
            avatar_url: response1.data.avatar_url,
            type: response1.data.type,
            site_admin: response1.data.site_admin,
            name: response1.data.name,
            company: response1.data.company,
            blog: response1.data.blog,
            location: response1.data.location,
            email: response1.data.email,
            hireable: response1.data.hireable,
            bio: response1.data.bio,
            twitter_username: response1.data.twitter_username,
            public_repos: response1.data.public_repos,
            public_gists: response1.data.public_gists,
            followers: response1.data.followers,
            following: response1.data.following,
            created_at: response1.data.created_at,
            updated_at: response1.data.updated_at,

            scraped_at: new Date(),
            repos: response2.data
        }

        // clean data
        for (var prop in data_to_save) {
            if (data_to_save[prop] == null || data_to_save[prop] === "") {
                data_to_save[prop] = " "
            }
        }

        // upsert:true if there's no entry, if there is, replace is
        await Profiles.replaceOne({ profileURL_toCompare: profileURL_toCompare }, data_to_save, { upsert: true })
        // await data_to_save.save();


        // save data and send the save data to client

        console.log(data_to_save)
        // res.send({status: "found",  data1: response1.data, data2: response2.data})
        res.send({ status: "found", data: data_to_save })
    } catch (err) {
        console.log(err)
        // console.log(err.response.status)
        res.send({ status: "not found", data: "" })
    }
};