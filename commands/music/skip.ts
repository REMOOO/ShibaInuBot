import { WebhookClient, MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";
const music = require("@koenie06/discord.js-music")

export default {
    category: "Music",
    description: "Skip a song. This only works as a slash command.",

    slash: true,
    callback: async ({ interaction, guild }) => {
        const webhook = new WebhookClient({ url: process.env.COMMANDS_URL! })
        const embed = new MessageEmbed()
            .setTitle(`skip in ${guild?.name}`)
            .setColor('GREEN')
        await webhook.send({embeds: [embed]})

        const isConnected = await music.isConnected({
            interaction: interaction
        })

        if (!isConnected) return interaction.reply({ content: "There are no songs playing, noob.", ephemeral: true})

        music.skip({
            interaction: interaction
        })

        interaction.reply({ content: "Skipped the trash song" })
    }
} as ICommand