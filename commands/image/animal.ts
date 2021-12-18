import { MessageEmbed, TextChannel, WebhookClient } from "discord.js";
import { ICommand } from "wokcommands";
const getter = require("reddit-image-fetcher")

export default {
    category: 'Image',
    description: 'Get an animal pic.',

    slash: true,

    options: [
        {
            type: 'SUB_COMMAND',
            name: 'bunny',
            description: 'Get an image of a cute bunny.'
        },
        {
            type: 'SUB_COMMAND',
            name: 'cat',
            description: 'Get an image of a cute kitty.'
        },
        {
            type: 'SUB_COMMAND',
            name: 'dog',
            description: 'Get an image of a cute doggo.'
        },
        {
            type: 'SUB_COMMAND',
            name: 'shiba',
            description: 'Get an image of a cute shiba inu.'
        },
    ],

    callback: async ({ guild, interaction }) => {
        const subcommand = interaction.options.getSubcommand()

        const webhook = new WebhookClient({ url: process.env.COMMANDS_URL! })
        const embed = new MessageEmbed()
            .setTitle(`animal ${subcommand} in ${guild?.name}`)
            .setColor('GREEN')
        await webhook.send({ embeds: [embed] })

        if (subcommand === 'bunny') {
            const subreddits = [
                "rabbits",
                "bunnies"
            ]
            return animal(subreddits, subcommand)

        } else if (subcommand === 'cat') {
            const subreddits = [
                "catpictures",
                "catpics"
            ]
            return animal(subreddits, subcommand)

        } else if (subcommand === 'dog') {
            const subreddits = [
                "lookatmydog",
                "dogpictures"
            ]
            return animal(subreddits, subcommand)

        } else if (subcommand === 'shiba') {
            const subreddits = [
                "shiba"
            ]
            return animal(subreddits, subcommand)

        }
    }
} as ICommand

async function animal(subs: string[], cmd: string) {
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