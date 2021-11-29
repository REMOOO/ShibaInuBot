import { ICommand } from "wokcommands";
import { MessageEmbed } from "discord.js";
const getter = require("reddit-image-fetcher")

export default {
    category: 'Image',
    description: 'Get a genshin impact related image.',

    slash: 'both',

    callback: async ({}) => {
        let subreddits = ["Genshin_Impact"]

        const res = await getter.fetch({
            type: 'custom',
            subreddit: subreddits
        })

        let title = ""

        if(res[0].title.length > 256) {
            title = "Genshin Impact"
        } else {
            title = res[0].title
        }

        const embed = new MessageEmbed()
                    .setTitle(title)
                    .setImage(res[0].image)
                return embed
    }
} as ICommand