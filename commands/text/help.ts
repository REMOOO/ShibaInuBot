import { MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Text',
    description: 'Check the commands.',

    slash: true,

    callback: async () => {
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