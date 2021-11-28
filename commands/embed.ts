import { MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Text',
    description: 'Sends an embed. Only works for administrators.',

    permissions: ['ADMINISTRATOR'],

    callback: async ({ text }) => {
        const json = JSON.parse(text)

        const embed = new MessageEmbed(json)

        return embed
    }

} as ICommand