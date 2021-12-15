import { WebhookClient, MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";
const music = require("@koenie06/discord.js-music")

export default {
    category: "Music",
    description: "Remove the given queue number song. This only works as a slash command.",

    slash: true,

    minArgs: 1,
    expectedArgs: '<number>',
    expectedArgsTypes: ['INTEGER'],

    callback: async({ interaction, args, guild })=> {
        const webhook = new WebhookClient({ url: process.env.COMMANDS_URL! })
        const embed = new MessageEmbed()
            .setTitle(`removequeue ${args[0]} in ${guild?.name}`)
            .setColor('GREEN')
        await webhook.send({embeds: [embed]})

        const number = interaction.options.getInteger("number")!

        const isConnected = await music.isConnected({
            interaction: interaction
        })

        if (!isConnected) return interaction.reply({ content: "There are no songs playing, noob.", ephemeral: true})

        const queue = await music.getQueue({
            interaction: interaction
        })
        if(!queue[number - 1]) return interaction.reply({ content: "That number of the queue doesn't exist. dumb", ephemeral: true})

        try {
            await music.removeQueue({
                interaction: interaction,
                number: number+1
            })
        } catch(error) {
            return "Queue is empty."
        }
        
        interaction.reply({ content: `Removed the ${number}th song of the queue.`})
    }
} as ICommand