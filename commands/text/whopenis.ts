import { MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Text',
    description: 'Find the user with the biggest penis.',
    aliases: ['whopp', 'whopeepee', 'whodick'],

    slash: 'both',

    callback: ({ message, interaction }) => {
        let randomUser
        let randomSmallPenisUser
        if (!interaction) {
            randomUser = message.guild?.members.cache.random()?.user!
            randomSmallPenisUser = message.guild?.members.cache.random()?.user!

            while (randomUser.bot === true) {
                randomUser = message.guild?.members.cache.random()?.user!
            }

            while (randomSmallPenisUser === randomUser) {
                randomSmallPenisUser = message.guild?.members.cache.random()?.user!
            }
        } else {
            randomUser = interaction.guild?.members.cache.random()?.user!
            randomSmallPenisUser = interaction.guild?.members.cache.random()?.user!

            while (randomUser.bot === true) {
                randomUser = interaction.guild?.members.cache.random()?.user!
            }

            while (randomSmallPenisUser === randomUser) {
                randomSmallPenisUser = interaction.guild?.members.cache.random()?.user!
            }
        }

        const embed = new MessageEmbed()
            .setTitle(`${randomUser.username} has the biggest penis 😩`)
            .setDescription(`${randomSmallPenisUser.username} has the smallest penis 🤏`)
            .setThumbnail(randomUser.displayAvatarURL({dynamic:true,size:4096}))
        return embed
    }
} as ICommand
