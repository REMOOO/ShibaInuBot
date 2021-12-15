import { WebhookClient, MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";
const music = require("@koenie06/discord.js-music")

export default {
    category: "Music",
    description: "Jump to the given queue number song. This only works as a slash command.",

    slash: true,

    minArgs: 1,
    expectedArgs: '<number>',
    expectedArgsTypes: ['INTEGER'],

    callback: async ({ args, interaction, guild }) => {
        const webhook = new WebhookClient({ url: process.env.COMMANDS_URL! })
        const embed = new MessageEmbed()
            .setTitle(`jump ${args[0]} in ${guild?.name}`)
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

        if(number === queue.length) return interaction.reply({ content: "Can't jump that far. ok", ephemeral: true})

        try {
            await music.jump({
                interaction: interaction,
                number: number
            })

            interaction.reply({ content: "Jumping the song to the given queue number."})
        } catch {
            interaction.reply({ content: "Can't jump that far. ok", ephemeral: true})
        }
    }
} as ICommand