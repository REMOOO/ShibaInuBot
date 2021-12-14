import { ICommand } from "wokcommands";
const music = require("@koenie06/discord.js-music")

export default {
    category: "Music",
    description: "Pause a song. This only works as a slash command.",

    slash: true,
    callback: async ({ interaction }) => {
        console.log(`pause`)

        const isConnected = await music.isConnected({
            interaction: interaction
        })

        if (!isConnected) return interaction.reply({ content: "There are no songs playing, noob.", ephemeral: true})

        music.pause({
            interaction: interaction
        })

        interaction.reply({
            content: "Paused this shit."
        })
    }
} as ICommand