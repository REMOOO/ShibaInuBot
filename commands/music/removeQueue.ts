import { ICommand } from "wokcommands";
const music = require("@koenie06/discord.js-music")

export default {
    category: "Music",
    description: "Remove the given queue number song. This only works as a slash command.",

    slash: true,

    minArgs: 1,
    expectedArgs: '<number>',
    expectedArgsTypes: ['INTEGER'],

    callback: async({ interaction })=> {
        const number = interaction.options.getInteger("number")!

        const isConnected = await music.isConnected({
            interaction: interaction
        })

        if (!isConnected) return interaction.reply({ content: "There are no songs playing, noob.", ephemeral: true})

        const queue = await music.getQueue({
            interaction: interaction
        })
        if(!queue[number - 1]) return interaction.reply({ content: "That number of the queue doesn't exist. dumb", ephemeral: true})

        music.removeQueue({
            interaction: interaction,
            number: number
        })
        
        interaction.reply({ content: `Removed the ${number}th song of the queue.`})
    }
} as ICommand