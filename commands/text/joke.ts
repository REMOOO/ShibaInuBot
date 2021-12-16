import { MessageEmbed, WebhookClient } from "discord.js";
import { ICommand } from "wokcommands";
const redditFetch = require('reddit-fetch')

export default {
    category: 'Text',
    description: 'Get a random joke.',

    slash: 'both',
    
    callback: async ({guild}) => {
        const webhook = new WebhookClient({ url: process.env.COMMANDS_URL! })
        const embed = new MessageEmbed()
            .setTitle(`joke in ${guild?.name}`)
            .setColor('GREEN')
        await webhook.send({embeds: [embed]})

        return joke()
    },
} as ICommand


async function joke() {
    const res = await redditFetch({

        subreddit: 'jokes',
        sort: 'hot',
        allowNSFW: true
    
    })

    const jokeTitle = res.title
    const desc = res.selftext
    const embed = new MessageEmbed()
        .setTitle(jokeTitle)
        .setDescription(desc)
        .setColor('RANDOM')
    return embed
}
