import { ICommand } from "wokcommands";
import { MessageEmbed } from "discord.js";
const getter = require("reddit-api-image-getter")

export default {
    category: 'Image',
    description: 'Get a random picture',
    aliases : ['pic'],

    slash: 'both',

    callback: async ({}) => {
        let subreddits = ["pics", "pic", "images"]
        let subreddit = subreddits[Math.floor(Math.random()*(subreddits.length))]

        let api = new getter()

        const res = await api.getHotImagesOfSubReddit(subreddit)
        const post = res[Math.floor(Math.random() * res.length)]

        const embed = new MessageEmbed()
                    .setTitle(post.title)
                    .setImage(post.url)
                return embed
    }
} as ICommand