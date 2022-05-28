// import dependencies
import mongoose from "mongoose";

// settings

const Schema = mongoose.Schema;

const Profiles = new Schema({
    profileURL: {
        type: String,
        required: true,
    },
    profileURL_toCompare: {
        type: String,
        required: true,
    },
    id: {
        type: Number,
        required: true
    },
    avatar_url: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    site_admin: {
        type: Boolean,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    blog: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    hireable: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: true
    },
    twitter_username: {
        type: String,
        required: true
    },
    public_repos: {
        type: Number,
        required: true
    },
    public_gists: {
        type: Number,
        required: true
    },
    followers: {
        type: Number,
        required: true
    },
    following: {
        type: Number,
        required: true
    },
    created_at: {
        type: Date,
    },
    updated_at: {
        type: Date,
    },
    scraped_at: {
        type: Date,
        required: true
    },


    repos: []
});

export default mongoose.model("profile", Profiles);
