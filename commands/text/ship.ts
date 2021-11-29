import { GuildMember, MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Text',
    description: 'Ship your love with another user.',
    aliases : ['love', 'match'],

    slash: 'both',

    maxArgs: 1,
    expectedArgs: '<user>',
    expectedArgsTypes: ['USER'],

    callback: ({ message, interaction }) => {
        const target = message ? message.mentions.members?.first() : interaction.options.getMember('user') as GuildMember
        if (!target) {
            if (!interaction) {
                const randomUser = message.guild?.members.cache.random()?.user!
                const shipArray = ship()

                const embed = new MessageEmbed()
                    .setTitle(`Shipped ${message.author.username} with ${randomUser?.username}`)
                    .setDescription(`💕 ${shipArray[0]}%\n\n${shipArray[1]}`)
                    .setThumbnail(randomUser?.displayAvatarURL({dynamic: true, size: 4096}))
                    .setColor("LUMINOUS_VIVID_PINK")
                return embed
            } else {
                const randomUser = interaction.guild?.members.cache.random()?.user!
                const shipArray = ship()

                const embed = new MessageEmbed()
                    .setTitle(`Shipped ${interaction.user.username} with ${randomUser?.username}`)
                    .setDescription(`💕 ${shipArray[0]}%\n\n${shipArray[1]}`)
                    .setThumbnail(randomUser?.displayAvatarURL({dynamic: true, size: 4096}))
                    .setColor("LUMINOUS_VIVID_PINK")
                return embed
            }
        } else {
            if (!interaction) {
                const shipArray = ship()
                
                const embed = new MessageEmbed()
                    .setTitle(`Shipped ${message.author.username} with ${target.user.username}`)
                    .setDescription(`💕 ${shipArray[0]}%\n\n${shipArray[1]}`)
                    .setThumbnail(target.user.displayAvatarURL({dynamic: true, size: 4096}))
                    .setColor("LUMINOUS_VIVID_PINK")
                return embed
            } else {
                const shipArray = ship()

                const embed = new MessageEmbed()
                    .setTitle(`Shipped ${interaction.user.username} with ${target.user.username}`)
                    .setDescription(`💕 ${shipArray[0]}%\n\n${shipArray[1]}`)
                    .setThumbnail(target.user.displayAvatarURL({dynamic: true, size: 4096}))
                    .setColor("LUMINOUS_VIVID_PINK")
                return embed
            }
        }
    }
} as ICommand

function ship() {
    const shipness = Math.floor(Math.random() * 101)
    const shipIndex = Math.floor(shipness / 10)
    const shipLevel = "💖".repeat(shipIndex) + "💔".repeat(10 - shipIndex)
    const shipArray = [shipness, shipLevel]
    return shipArray
}