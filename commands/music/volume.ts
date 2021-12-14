import { ICommand } from "wokcommands";
const music = require("@koenie06/discord.js-music")

export default {
    category: "Music",
    description: "This is for trolling tbh, 1 is default. This only works as a slash command.",

    slash: true,

    minArgs: 1,
    expectedArgs: '<volume>',
    expectedArgsTypes: ['INTEGER'],

    callback: async ({ interaction, args }) => {
        console.log(`volume ${args[0]}`)

        const volume  = interaction.options.getInteger("volume")!

        if(volume > 100) return interaction.reply({ content: "Can't go higher than 100%. Especially you.", ephemeral: true})
        if (volume === 0) return interaction.reply({ content: "Shiba never plays music at zero volume", ephemeral: true})

        const isConnected = await music.isConnected({
            interaction: interaction
        })

        if (!isConnected) return interaction.reply({ content: "There are no songs playing, noob.", ephemeral: true})

        music.volume({
            interaction: interaction,
            volume: volume
        })
        
        interaction.reply({ content: `Set the volume to ${volume}`})
    }
} as ICommand