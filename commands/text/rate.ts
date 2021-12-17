import { WebhookClient, MessageEmbed, User, CacheType, CommandInteraction } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Text',
    description: 'Rate something.',

    slash: true,

    options: [
        {
            type: 'SUB_COMMAND',
            name: 'eboy',
            description: 'Rate the eboyness of a user.',
            options: [
                {
                    name: 'user',
                    type: 'USER',
                    description: 'A user in the server.'
                }
            ]
        },
        {
            type: 'SUB_COMMAND',
            name: 'egirl',
            description: 'Rate the egirlness of a user.',
            options: [
                {
                    name: 'user',
                    type: 'USER',
                    description: 'A user in the server.'
                }
            ]
        },
        {
            type: 'SUB_COMMAND',
            name: 'evil',
            description: 'Rate the evilness of a user.',
            options: [
                {
                    name: 'user',
                    type: 'USER',
                    description: 'A user in the server.'
                }
            ]
        },
        {
            type: 'SUB_COMMAND',
            name: 'furry',
            description: 'Rate the furryness of a user.',
            options: [
                {
                    name: 'user',
                    type: 'USER',
                    description: 'A user in the server.'
                }
            ]
        },
        {
            type: 'SUB_COMMAND',
            name: 'gay',
            description: 'Rate the gayness of a user.',
            options: [
                {
                    name: 'user',
                    type: 'USER',
                    description: 'A user in the server.'
                }
            ]
        },
        {
            type: 'SUB_COMMAND',
            name: 'penis',
            description: 'Rate the penis of a user.',
            options: [
                {
                    name: 'user',
                    type: 'USER',
                    description: 'A user in the server.'
                }
            ]
        },
        {
            type: 'SUB_COMMAND',
            name: 'shiba',
            description: 'Rate the shibaness of a user.',
            options: [
                {
                    name: 'user',
                    type: 'USER',
                    description: 'A user in the server.'
                }
            ]
        },
        {
            type: 'SUB_COMMAND',
            name: 'ship',
            description: 'Rate the shipness between users.',
            options: [
                {
                    name: 'user',
                    type: 'USER',
                    description: 'A user in the server.'
                }
            ]
        },
        {
            type: 'SUB_COMMAND',
            name: 'stank',
            description: 'Rate the stankness of a user.',
            options: [
                {
                    name: 'user',
                    type: 'USER',
                    description: 'A user in the server.'
                }
            ]
        },
        {
            type: 'SUB_COMMAND',
            name: 'thot',
            description: 'Rate the thotness of a user.',
            options: [
                {
                    name: 'user',
                    type: 'USER',
                    description: 'A user in the server.'
                }
            ]
        },
        {
            type: 'SUB_COMMAND',
            name: 'waifu',
            description: 'Rate the waifuness of a user.',
            options: [
                {
                    name: 'user',
                    type: 'USER',
                    description: 'A user in the server.'
                }
            ]
        }
    ],

    callback: async ({ guild, interaction }) => {
        const subcommand = interaction.options.getSubcommand()
        const user = interaction.options.getUser('user')
        const webhook = new WebhookClient({ url: process.env.COMMANDS_URL! })
        const embed = new MessageEmbed()
            .setTitle(`${subcommand} ${user?.username} in ${guild?.name}`)
            .setColor('GREEN')
        await webhook.send({ embeds: [embed] })

        if (subcommand === 'eboy') {
            return rate(user!, interaction, subcommand, '⛓️💀🖤')

        } else if (subcommand === 'egirl') {
            return rate(user!, interaction, subcommand, '🥀💀🖤')

        } else if (subcommand === 'evil') {
            return evilrate(user!, interaction)

        } else if (subcommand === 'furry') {
            return rate(user!, interaction, subcommand, '😻. UwU!')

        } else if (subcommand === 'gay') {
            return rate(user!, interaction, subcommand, '🏳️‍🌈')

        } else if (subcommand === 'penis') {
            return penisrate(user!, interaction)

        } else if (subcommand === 'shiba') {
            return rate(user!, interaction, subcommand, '🐕. Woof!')

        } else if (subcommand === 'ship') {
            return ship(user!, interaction)
            
        } else if (subcommand === 'stank') {
            return rate(user!, interaction, 'stanky', '🤮')

        } else if (subcommand === 'thot') {
            return rate(user!, interaction, subcommand, '😏')

        } else if (subcommand === 'waifu') {
            return rate(user!, interaction, subcommand, '😍')
        }
    }
} as ICommand

async function rate(target: User, interaction: CommandInteraction<CacheType>, what: string, emoji: string) {
    let user = target
    if (!user) user = interaction?.user

    const rating = Math.floor(Math.random() * 101)

    const embed = new MessageEmbed()
        .setTitle(`${user.username} is ${rating}% ${what} ${emoji}`)
        .setColor('RANDOM')
    return embed
}

async function evilrate(target: User, interaction: CommandInteraction<CacheType>) {
    let user = target
    if (!user) user = interaction?.user

    const rating = Math.floor(Math.random() * 101)

    const embed = new MessageEmbed()
        .setTitle(`${user.username} is ${rating}% evil 😈 and ${100-rating}% good 😇`)
        .setColor('RANDOM')
    return embed
}

async function penisrate(target: User, interaction: CommandInteraction<CacheType>) {
    let user = target
    if (!user) user = interaction?.user

    let penis = ""
    for (let i = 0; i<=Math.floor(Math.random() * 101);i++) {
        penis += "="
    }

    const embed = new MessageEmbed()
        .setTitle(`${user.username}'s penis`)
        .setDescription(`8${penis}D`)
        .setColor('RANDOM')
    return embed
}

async function ship(target: User, interaction: CommandInteraction<CacheType>) {
    let user = target
    let me = interaction.user
    if (!user) user = interaction.guild?.members.cache.random()?.user!;

    const shipness = Math.floor(Math.random() * 101)
    const shipIndex = Math.floor(shipness / 10)
    const shipLevel = "💖".repeat(shipIndex) + "💔".repeat(10 - shipIndex)
    const shipArray = [shipness, shipLevel]

    const embed = new MessageEmbed()
        .setTitle(`Shipped ${me.username} with ${user.username}`)
        .setDescription(`💕 ${shipArray[0]}%\n\n${shipArray[1]}`)
        .setThumbnail(user.displayAvatarURL({ dynamic: true, size: 4096 }))
        .setColor("LUMINOUS_VIVID_PINK");
    return embed;
}