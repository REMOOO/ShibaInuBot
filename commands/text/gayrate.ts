import { GuildMember, MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Text',
    description: 'Measure the gayness of a user.',
    aliases: ['howgay'],

    slash: 'both',

    maxArgs: 1,
    expectedArgs: '<user>',
    expectedArgsTypes: ['USER'],

    callback: ({ message, interaction, guild }) => {
        console.log(`gayrate in ${guild?.name}`)

        const target = message ? message.mentions.members?.first() : interaction.options.getMember('user') as GuildMember

        return gayrate(target)
    }
} as ICommand

function gayrate(target: GuildMember | undefined) {
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
        .setTitle(`${target.user.username} is ${getGayRate()}% gay 🏳️‍🌈`)
        .setColor("PURPLE");
    return embed;
}

function createOwnEmbed() {
    const embed = new MessageEmbed()
        .setTitle(`You are ${getGayRate()}% gay 🏳️‍🌈`)
        .setColor("PURPLE");
    return embed;
}

function getGayRate() {
    return Math.floor(Math.random() * 101)
}
