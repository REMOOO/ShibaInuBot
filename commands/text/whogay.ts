import { GuildMember, MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Text',
    description: 'Find the gay user.',

    slash: 'both',

    callback: ({ message, interaction }) => {
        let randomUser
        let randomCrush
        if (!interaction) {
            randomUser = message.guild?.members.cache.random()?.user!
            randomCrush = message.guild?.members.cache.random()?.user!

            while (randomUser.bot === true) {
                randomUser = message.guild?.members.cache.random()?.user!
            }

            while (randomCrush === randomUser) {
                randomCrush = message.guild?.members.cache.random()?.user!
            }
        } else {
            randomUser = interaction.guild?.members.cache.random()?.user!
            randomCrush = interaction.guild?.members.cache.random()?.user!

            while (randomUser.bot === true) {
                randomUser = interaction.guild?.members.cache.random()?.user!
            }

            while (randomCrush === randomUser) {
                randomCrush = interaction.guild?.members.cache.random()?.user!
            }
        }

        const embed = new MessageEmbed()
            .setTitle(`${randomUser.username} is gay 🌈`)
            .setDescription(`And has a crush on ${randomCrush.username} 👀`)
            .setThumbnail(randomUser.displayAvatarURL({dynamic:true,size:4096}))
        return embed
    }
} as ICommand
