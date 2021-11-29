import { GuildMember, MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Image',
    description: 'Get the avatar image of a user.',

    slash: 'both',
    
    maxArgs: 1,
    expectedArgs: '<user>',
    expectedArgsTypes: ['USER'],

    callback: ({ message, interaction }) => {
        const target = message ? message.mentions.members?.first() : interaction.options.getMember('user') as GuildMember
        if (!target) {
            const embed = new MessageEmbed()
                .setTitle(`Your avatar`)
                .setImage(`${message.author.displayAvatarURL({dynamic: true})}?size=2048`)
            return embed
        } else {
            const embed = new MessageEmbed()
                .setTitle(`Avatar of ${target.user.username}`)
                .setImage(`${target.user.displayAvatarURL({dynamic: true})}?size=2048`)
            return embed
        }
    }
} as ICommand