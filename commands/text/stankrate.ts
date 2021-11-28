import { GuildMember, MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Text',
    description: 'Measure the stank of a user',

    slash: 'both',

    maxArgs: 1,
    expectedArgs: '<user>',
    expectedArgsTypes: ['USER'],

    callback: ({ message, interaction, args }) => {
        const target = message ? message.mentions.members?.first() : interaction.options.getMember('user') as GuildMember
        if (!target) {
            const embed = new MessageEmbed()
                .setTitle(`You are ${getStankRate()}% stanky 🤮`)
            return embed
        } else {
            const embed = new MessageEmbed()
                .setTitle(`${target.displayName} is ${getStankRate()}% stanky 🤮`)
            return embed
        }
    }
} as ICommand

function getStankRate() {
    return Math.floor(Math.random() * 101)
}