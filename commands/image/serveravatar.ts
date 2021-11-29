import axios from "axios";
import { GuildMember, MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Image',
    description: 'Get the server avatar image of a user.',

    slash: 'both',

    maxArgs: 1,
    expectedArgs: '<user>',
    expectedArgsTypes: ['USER'],

    callback: async ({ message, interaction }) => {
        const target = message ? message.mentions.members?.first() : interaction.options.getMember('user') as GuildMember

        if (!target) {
            if (!interaction) {
                const data = await axios.get(`https://discord.com/api/guilds/${message.guildId}/members/${message.author.id}`, {
                    headers:{
                        Authorization: `Bot ${process.env.TOKEN}`
                    }
                }).then(d => d.data)

                if (data.avatar !== undefined && data.avatar !== null) {
                    let end = data.avatar.startsWith("a_") ? ".gif?size=4096":".png?size=4096"
                    const embed = new MessageEmbed()
                        .setTitle('Your server avatar')
                        .setImage(`https://cdn.discordapp.com/guilds/${message.guildId}/users/${message.author.id}/avatars/${data.avatar}${end}`)
                    return embed
                } else {
                    const embed = new MessageEmbed()
                        .setTitle("You don't have a server avatar 🙄")
                        .setDescription("Anyway, this is your global avatar")
                        .setImage(`${message.author.displayAvatarURL({dynamic: true, size: 4096})}`)
                    return embed
                }

            } else {
                const data = await axios.get(`https://discord.com/api/guilds/${interaction.guildId}/members/${interaction.user.id}`, {
                    headers:{
                        Authorization: `Bot ${process.env.TOKEN}`
                    }
                }).then(d => d.data)

                if (data.avatar !== undefined && data.avatar !== null) {
                    let end = data.avatar.startsWith("a_") ? ".gif?size=4096":".png?size=4096"
                    const embed = new MessageEmbed()
                        .setTitle('Your server avatar')
                        .setImage(`https://cdn.discordapp.com/guilds/${interaction.guildId}/users/${interaction.user.id}/avatars/${data.avatar}${end}`)
                    return embed
                } else {
                    const embed = new MessageEmbed()
                        .setTitle("You don't have a server avatar 🙄")
                        .setDescription("Anyway, this is your global avatar")
                        .setImage(`${interaction.user.displayAvatarURL({dynamic: true, size: 4096})}`)
                    return embed
                }
            }
        } else {
            const data = await axios.get(`https://discord.com/api/guilds/${target.guild.id}/members/${target.user.id}`, {
                headers:{
                    Authorization: `Bot ${process.env.TOKEN}`
                }
            }).then(d => d.data)

            if (data.avatar !== undefined && data.avatar !== null) {
                let end = data.avatar.startsWith("a_") ? ".gif?size=4096":".png?size=4096"
                const embed = new MessageEmbed()
                    .setTitle(`Server avatar of ${target.user.username}`)
                    .setImage(`https://cdn.discordapp.com/guilds/${target.guild.id}/users/${target.user.id}/avatars/${data.avatar}${end}`)
                return embed
            } else {
                const embed = new MessageEmbed()
                    .setTitle(`${target.user.username} doesn't have a server avatar 🙄`)
                    .setDescription(`Anyway, this is the global avatar of ${target.user.username}`)
                    .setImage(`${target.user.displayAvatarURL({dynamic: true, size: 4096})}`)
                return embed
            }
        }
    }
} as ICommand