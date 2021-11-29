import { GuildMember, MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Text',
    description: 'Measure the thotness of a user.',

    slash: 'both',

    maxArgs: 1,
    expectedArgs: '<user>',
    expectedArgsTypes: ['USER'],

    callback: ({ message, interaction }) => {
        const target = message ? message.mentions.members?.first() : interaction.options.getMember('user') as GuildMember
        if (!target) {
            const embed = new MessageEmbed()
                .setTitle(`You are ${getThotRate()}% thot 😏`)
            return embed
        } else {
            const embed = new MessageEmbed()
                .setTitle(`${target.user.username} is ${getThotRate()}% thot 😏`)
            return embed
        }
    }
} as ICommand

function getThotRate() {
    return Math.floor(Math.random() * 101)
}