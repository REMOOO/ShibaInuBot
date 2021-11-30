import { GuildMember, MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Text',
    description: 'Find the furry user.',

    slash: 'both',

    callback: ({ message, interaction }) => {
        let randomUser
        let randomFurryHater
        if (!interaction) {
            randomUser = message.guild?.members.cache.random()?.user!
            randomFurryHater = message.guild?.members.cache.random()?.user!

            while (randomUser.bot === true) {
                randomUser = message.guild?.members.cache.random()?.user!
            }

            while (randomFurryHater === randomUser) {
                randomFurryHater = message.guild?.members.cache.random()?.user!
            }
        } else {
            randomUser = interaction.guild?.members.cache.random()?.user!
            randomFurryHater = interaction.guild?.members.cache.random()?.user!

            while (randomUser.bot === true) {
                randomUser = interaction.guild?.members.cache.random()?.user!
            }

            while (randomFurryHater === randomUser) {
                randomFurryHater = interaction.guild?.members.cache.random()?.user!
            }
        }

        const embed = new MessageEmbed()
            .setTitle(`${randomUser.username} is a furry 😻`)
            .setDescription(`${randomFurryHater.username} is a furry hater 😾`)
            .setThumbnail(randomUser.displayAvatarURL({dynamic:true,size:4096}))
        return embed
    }
} as ICommand
