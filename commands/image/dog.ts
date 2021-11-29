import { ICommand } from "wokcommands";
import { MessageEmbed } from "discord.js";
const getter = require("reddit-image-fetcher")

export default {
    category: 'Image',
    description: 'Get an image of a cute doggo.',

    slash: 'both',

    callback: async ({}) => {
        let subreddits = ["lookatmydog", "dogpictures"]

        const res = await getter.fetch({
            type: 'custom',
            subreddit: subreddits
        })

        const embed = new MessageEmbed()
                    .setTitle(res[0].title)
                    .setImage(res[0].image)
                return embed
    }
} as ICommand