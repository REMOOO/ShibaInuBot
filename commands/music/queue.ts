import { ICommand } from "wokcommands";
const music = require("@koenie06/discord.js-music")

export default {
    category: "Music",
    description: "Get the queue. This only works as a slash command.",

    slash: true,
    callback: async ({ interaction }) => {
        const isConnected = await music.isConnected({
            interaction: interaction
        })

        if (!isConnected) return interaction.reply({ content: "There are no songs playing, noob.", ephemeral: true})

        const queue = await music.getQueue({
            interaction: interaction
        })

        let response = ``

        for (let i = 1; i < queue.length; i++) {
            response += `${i}. ${queue[i].info.title} - ${queue[i].info.duration}\n`
        }

        interaction.reply({ content: response})
    }
} as ICommand