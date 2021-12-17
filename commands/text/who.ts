import { CacheType, CommandInteraction, MessageEmbed, WebhookClient } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Text',
    description: 'Find who is something.',

    slash: true,

    options: [
        {
            type: 'SUB_COMMAND',
            name: 'furry',
            description: 'Find the furry user.'
        },
        {
            type: 'SUB_COMMAND',
            name: 'gay',
            description: 'Find the gay user.'
        },
        {
            type: 'SUB_COMMAND',
            name: 'penis',
            description: 'Find the user with the biggest penis.'
        },
        {
            type: 'SUB_COMMAND',
            name: 'pussy',
            description: 'Find the biggest pussy.'
        },
        {
            type: 'SUB_COMMAND',
            name: 'sus',
            description: 'Find the sus user.'
        }
    ],

    callback: async ({ guild, interaction }) => {
        const subcommand = interaction.options.getSubcommand()
        const webhook = new WebhookClient({ url: process.env.COMMANDS_URL! })

        const embed = new MessageEmbed()
            .setTitle(`who ${subcommand} in ${guild?.name}`)
            .setColor('GREEN')
        await webhook.send({ embeds: [embed] })

        if (subcommand === 'furry') {
            return who(interaction, 'is a furry 😻', 'is a furry hater 😾')

        } else if (subcommand === 'gay') {
            return who(interaction, 'is gay 🌈', 'is their crush 👀')

        } else if (subcommand === 'penis') {
            return who(interaction, 'has the biggest penis 😩', 'has the smallest penis 🤏')

        } else if (subcommand === 'pussy') {
            return who(interaction, 'is the biggest pussy 😸', 'is the one who gets no pussy tho 💀')

        } else if (subcommand === 'sus') {
            return who(interaction, 'is big sus ඞ🧐', 'loves minors tho')
        }

    }
} as ICommand

async function who(interaction: CommandInteraction<CacheType>, userIsWhat: string, otherIsWhat: string) {
    let randomUser = interaction.guild?.members.cache.random()?.user!
    let randomOther = interaction.guild?.members.cache.random()?.user!

    while (randomUser.bot === true) {
        randomUser = interaction.guild?.members.cache.random()?.user!
    }

    while (randomOther === randomUser) {
        randomOther = interaction.guild?.members.cache.random()?.user!
    }

    const embed = new MessageEmbed()
        .setTitle(`${randomUser.username} ${userIsWhat}`)
        .setDescription(`${randomOther.username} ${otherIsWhat}`)
        .setThumbnail(randomUser.displayAvatarURL({ dynamic: true, size: 4096 }))
        .setColor('RANDOM')
        return embed
}