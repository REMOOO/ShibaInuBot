import { MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Text',
    description: 'Sends an embed with a random color. Split title & description with comma (,).',

    permissions: ['ADMINISTRATOR'],

    slash: 'both',

    minArgs: 1,
    expectedArgs: '<title> [description]',
    expectedArgsTypes: ['STRING', 'STRING'],

    callback: async ({ message, interaction, channel, args }) => {
        if (!interaction) {
            await message.delete()
            const title = message.content.slice(7).split(",")[0]
            const description = message.content.split(",")[1]
            let json
    
            if (description === undefined) {
                json = JSON.parse(`{"title":"${title}"}`)
            }  else {
                json = JSON.parse(`{"title":"${title}","description":"${description}"}`)
            }
    
            const embed = new MessageEmbed(json).setColor("RANDOM")
    
            message.channel.send({
                embeds: [embed]
            })
        } else {
            const title = args[0]
            const description = args[1]
            let json
    
            if (description === undefined) {
                json = JSON.parse(`{"title":"${title}"}`)
            }  else {
                json = JSON.parse(`{"title":"${title}","description":"${description}"}`)
            }
    
            const embed = new MessageEmbed(json).setColor("RANDOM")
    
            channel.send({
                embeds: [embed]
            })
        }
    }

} as ICommand