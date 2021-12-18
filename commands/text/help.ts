import { MessageEmbed, WebhookClient } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Text',
    description: 'Check the commands.',

    slash: true,

    callback: async ({interaction, guild}) => {
        const webhook = new WebhookClient({ url: process.env.COMMANDS_URL! })

        const xd = new MessageEmbed()
            .setTitle(`help by ${interaction.user.username} in ${guild?.name}`)
            .setColor('GREEN')
        await webhook.send({ embeds: [xd] })

        const embed = new MessageEmbed()
            .setTitle(`Commands`)
            .setDescription(`Type the following commands in for more details.
            \n**💰 - Cryptocurrency**\n/crypto\n/work
            \n**📷 - Image**\n/animal\n/avatar\n/fun\n/pic
            \n**👩‍💻 - Text**\n/find\n/giveaway\n/random\n/rate\n/who
            \n**🎶 - Music **\n/music
            \n**🔞 - NSFW**\n/nsfw
            \n**🛡️ - Moderation**\n/mod`)
            .setColor('RANDOM')

        return embed
    }
} as ICommand