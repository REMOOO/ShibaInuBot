import { MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Text',
    description: 'Sends an embed. Only works on test server of Shiba Inu Bot.',

    permissions: ['ADMINISTRATOR'],
    testOnly: true,
    ownerOnly: true,

    slash: false,

    callback: async ({ text }) => {
        const json = JSON.parse(text)

        const embed = new MessageEmbed(json)

        return embed
    }

} as ICommand