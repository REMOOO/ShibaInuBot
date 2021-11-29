import { GuildMember, MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Text',
    description: 'Measure the egirlness of a user.',

    slash: 'both',

    maxArgs: 1,
    expectedArgs: '<user>',
    expectedArgsTypes: ['USER'],

    callback: ({ message, interaction }) => {
        const target = message ? message.mentions.members?.first() : interaction.options.getMember('user') as GuildMember
        if (!target) {
            const embed = new MessageEmbed()
                .setTitle(`You are ${getEgirlRate()}% e-girl 🥀💀🖤`)
            return embed
        } else {
            const embed = new MessageEmbed()
                .setTitle(`${target.user.username} is ${getEgirlRate()}% e-girl 🥀💀🖤`)
            return embed
        }
    }
} as ICommand

function getEgirlRate() {
    return Math.floor(Math.random() * 101)
}