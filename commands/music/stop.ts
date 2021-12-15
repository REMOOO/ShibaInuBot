import { WebhookClient, MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";
const music = require("@koenie06/discord.js-music")

export default {
    category: "Music",
    description: "Stop a song. This only works as a slash command.",

    slash: true,
    callback: async ({ interaction, guild }) => {
        const webhook = new WebhookClient({ url: process.env.COMMANDS_URL! })
        const embed = new MessageEmbed()
            .setTitle(`stop in ${guild?.name}`)
            .setColor('GREEN')
        await webhook.send({embeds: [embed]})

        const isConnected = await music.isConnected({
            interaction: interaction
        })

        if (!isConnected) return interaction.reply({ content: "There are no songs playing, noob.", ephemeral: true})

        const queue = music.getQueue({
            interaction: interaction
        })
        if (queue.length === 0) return interaction.reply({ content: "No music is playing.", ephemeral: true})

        interaction.reply({
            content: "Thank you for stopping this shit."
        })

        music.stop({
            interaction: interaction
        })
    }
} as ICommand