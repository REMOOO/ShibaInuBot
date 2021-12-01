import { ICommand } from "wokcommands";
const music = require("@koenie06/discord.js-music")

export default {
    category: "Music",
    description: "Jump to the given queue number song. This only works as a slash command.",

    slash: true,

    minArgs: 1,
    expectedArgs: '<number>',
    expectedArgsTypes: ['INTEGER'],

    callback: async ({ interaction }) => {
        const number = interaction.options.getInteger("number")!

        const isConnected = await music.isConnected({
            interaction: interaction
        })

        if (!isConnected) return interaction.reply({ content: "There are no songs playing, noob.", ephemeral: true})

        const queue = music.getQueue({
            interaction: interaction
        })

        if(number > queue.length) return interaction.reply({ content: "Can't jump that far. ok", ephemeral: true})

        music.jump({
            interaction: interaction,
            number: number
        })

        interaction.reply({ content: "Jump the song to the given queue number."})
    }
} as ICommand