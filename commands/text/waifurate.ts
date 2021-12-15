import { GuildMember, MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Text',
    description: 'Measure the waifu of a user.',

    slash: 'both',

    maxArgs: 1,
    expectedArgs: '<user>',
    expectedArgsTypes: ['USER'],

    callback: ({ message, interaction }) => {
        console.log(`waifurate`)

        const target = message ? message.mentions.members?.first() : interaction.options.getMember('user') as GuildMember

        return waifurate(target)
    }
} as ICommand

function waifurate(target: GuildMember | undefined) {
    return createEmbed(target)
}

function createEmbed(target: GuildMember | undefined) {
    if (!target) {
        return createOwnEmbed();
    } else {
        return createTargetEmbed(target);
    }
}

function createTargetEmbed(target: GuildMember) {
    const embed = new MessageEmbed()
        .setTitle(`${target.user.username} is ${getWaifuRate()}% waifu 😍`)
        .setColor("RED");
    return embed;
}

function createOwnEmbed() {
    const embed = new MessageEmbed()
        .setTitle(`You are ${getWaifuRate()}% waifu 😍`)
        .setColor("RED");
    return embed;
}

function getWaifuRate() {
    return Math.floor(Math.random() * 101)
}
