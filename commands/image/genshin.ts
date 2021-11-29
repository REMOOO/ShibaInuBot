import { ICommand } from "wokcommands";
import { MessageEmbed } from "discord.js";
const getter = require("reddit-image-fetcher")

export default {
    category: 'Image',
    description: 'Get a genshin impact related image',

    slash: 'both',

    callback: async ({}) => {
        let subreddits = ["Genshin_Impact"]

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