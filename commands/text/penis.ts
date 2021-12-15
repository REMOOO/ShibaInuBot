import { GuildMember, MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Text',
    description: 'Measure the penis of a user.',
    aliases : ['peepee', 'pp', 'dick', 'howlong'],

    slash: 'both',

    maxArgs: 1,
    expectedArgs: '<user>',
    expectedArgsTypes: ['USER'],

    callback: ({ message, interaction, guild }) => {
        console.log(`penis in ${guild?.name}`)

        const target = message ? message.mentions.members?.first() : interaction.options.getMember('user') as GuildMember
        return penis(target)
    }
} as ICommand

function penis(target: GuildMember | undefined) {
    return createEmbed(target)
}

function createEmbed(target: GuildMember | undefined) {
    if (!target) {
        const embed = new MessageEmbed()
            .setTitle(`Your penis`)
            .setDescription(`8${getPenisSize()}D`)
        return embed
    } else {
        const embed = new MessageEmbed()
            .setTitle(`${target.user.username}'s penis`)
            .setDescription(`8${getPenisSize()}D`)
        return embed
    }
}

function getPenisSize() {
    let penis = ""
    for (let i = 0; i<=Math.floor(Math.random() * 101);i++) {
        penis += "="
    }
    return penis
}