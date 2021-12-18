import { WebhookClient, MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";
const getter = require("reddit-image-fetcher")

export default {
    category: 'Image',
    description: 'Get a pic.',

    slash: true,

    options: [
        {
            type: 'SUB_COMMAND',
            name: 'get',
            description: 'Get a random picture.'
        },
        {
            type: 'SUB_COMMAND',
            name: 'genshin',
            description: 'Get a genshin impact related pic.'
        },
        {
            type: 'SUB_COMMAND',
            name: 'meme',
            description: 'Get a meme.'
        },
        {
            type: 'SUB_COMMAND',
            name: 'playboicarti',
            description: 'Get a playboi carti related pic. slatt'
        }
    ],

    callback: async ({ guild, interaction }) => {
        const subcommand = interaction.options.getSubcommand()

        const webhook = new WebhookClient({ url: process.env.COMMANDS_URL! })
        const embed = new MessageEmbed()
            .setTitle(`pic ${subcommand} in ${guild?.name}`)
            .setColor('GREEN')
        await webhook.send({ embeds: [embed] })

        if (subcommand === 'get') {
            const subreddits = [
                "pics",
                "pic",
                "images"
            ]
            return pic(subreddits, subcommand)

        } else if (subcommand === 'genshin') {
            const subreddits = [
                "Genshin_Impact"
            ]
            return pic(subreddits, subcommand)

        } else if (subcommand === 'meme') {
            const subreddits = [
                "memes",
                "dank_meme",
                "dankmemes",
                "meme",
                "okbuddyretard"
            ]
            return pic(subreddits, subcommand)

        } else if (subcommand === 'playboicarti') {
            const subreddits = [
                "playboicarti"
            ]
            return pic(subreddits, subcommand)

        }
    }
} as ICommand

async function pic(subs: string[], cmd: string) {
    const subreddits = subs

    const res = await getter.fetch({
        type: 'custom',
        subreddit: subreddits
    });

    let title = "";

    if (res[0].title.length > 256) {
        title = cmd;
    } else {
        title = res[0].title;
    }

    const embed = new MessageEmbed()
        .setTitle(title)
        .setImage(res[0].image);
    return embed
}