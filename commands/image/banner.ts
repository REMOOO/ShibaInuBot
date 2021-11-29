import { GuildMember, MessageEmbed } from "discord.js";
import { CommandErrors, ICommand } from "wokcommands";
import axios from "axios"

export default {
    category : 'Image',
    description: 'Get the banner image of a user.',

    slash: 'both',

    maxArgs: 1,
    expectedArgs: '<user>',
    expectedArgsTypes: ['USER'],

    callback: async ({ message, interaction }) => {
        const target = message ? message.mentions.members?.first() : interaction.options.getMember('user') as GuildMember

        if (!target) {
            if (!interaction) {
                const data = await axios.get(`https://discord.com/api/users/${message.author.id}`,{
                    headers:{
                        Authorization: `Bot ${process.env.TOKEN}`
                    }
                }).then(d => d.data)
    
                if (data.banner) {
                    let url = data.banner.startsWith("a_") ? ".gif?size=4096":".png?size=4096"
                    const embed = new MessageEmbed()
                        .setTitle('Your banner')
                        .setImage(`https://cdn.discordapp.com/banners/${message.author.id}/${data.banner}${url}`)
                    return embed
                } else {
                    const embed = new MessageEmbed()
                        .setTitle("You don't have a banner 🙄")
                    return embed
                }
            } else {
                const data = await axios.get(`https://discord.com/api/users/${interaction.user.id}`,{
                    headers:{
                        Authorization: `Bot ${process.env.TOKEN}`
                    }
                }).then(d => d.data)
    
                if (data.banner) {
                    let url = data.banner.startsWith("a_") ? ".gif?size=4096":".png?size=4096"
                    const embed = new MessageEmbed()
                        .setTitle('Your banner')
                        .setImage(`https://cdn.discordapp.com/banners/${interaction.user.id}/${data.banner}${url}`)
                    return embed
                } else {
                    const embed = new MessageEmbed()
                        .setTitle("You don't have a banner 🙄")
                    return embed
                }
            }

        } else {
            const data = await axios.get(`https://discord.com/api/users/${target.user.id}`,{
                headers:{
                    Authorization: `Bot ${process.env.TOKEN}`
                }
            }).then(d => d.data)

            if (data.banner) {
                let url = data.banner.startsWith("a_") ? ".gif?size=4096":".png?size=4096"
                const embed = new MessageEmbed()
                    .setTitle(`Banner of ${target.user.username}`)
                    .setImage(`https://cdn.discordapp.com/banners/${target.user.id}/${data.banner}${url}`)
                return embed
            } else {
                const embed = new MessageEmbed()
                    .setTitle(`${target.user.username} doesn't have a banner 🙄`)
                return embed
            }
        }
    },
} as ICommand