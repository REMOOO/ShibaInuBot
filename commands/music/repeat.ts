import { WebhookClient, MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";
const music = require("@koenie06/discord.js-music")


export default {
    category: "Music",
    description: "Repeat the song. This only works as a slash command.",

    slash: true,

    minArgs: 1,
    expectedArgs: '<onoroff>',
    expectedArgsTypes: ['BOOLEAN'],
    callback: async ({ interaction, args, guild }) => {
        const webhook = new WebhookClient({ url: process.env.COMMANDS_URL! })
        const embed = new MessageEmbed()
            .setTitle(`repeat ${args[0]} in ${guild?.name}`)
            .setColor('GREEN')
        await webhook.send({embeds: [embed]})

        const realBoolean = interaction.options.getBoolean("onoroff")!
        let boolean
        if (realBoolean === true) {
            boolean = "on"
        } else {
            boolean = "off"
        }
        const isConnected = await music.isConnected({
            interaction: interaction
        })

        if (!isConnected) return interaction.reply({ content: "There are no songs playing, noob.", ephemeral: true})

        const isRepeated = music.isRepeated({
            interaction: interaction
        })

        if (isRepeated === boolean) return interaction.reply({ content: `Repeat mode is already on ${boolean}`, ephemeral: true})

        music.repeat({
            interaction: interaction,
            value: realBoolean
        })

        interaction.reply({ content: `Turned repeat mode to ${boolean}`})
    }
} as ICommand