import { GuildMember, MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Text',
    description: 'Measure the evilness of a user.',

    slash: 'both',

    maxArgs: 1,
    expectedArgs: '<user>',
    expectedArgsTypes: ['USER'],

    callback: ({ message, interaction }) => {
        console.log(`evilrate`)

        const target = message ? message.mentions.members?.first() : interaction.options.getMember('user') as GuildMember

        return evilrate(target)
    }
} as ICommand

function evilrate(target: GuildMember | undefined) {
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
    const evilrate = getEvilRate()
    const embed = new MessageEmbed()
        .setTitle(`${target.user.username} is ${evilrate}% evil 😈 and ${100-evilrate}% good 😇`)
        .setColor("RANDOM");
    return embed;
}

function createOwnEmbed() {
    const evilrate = getEvilRate()
    const embed = new MessageEmbed()
        .setTitle(`You are ${evilrate}% evil 😈 and ${100-evilrate}% good 😇`)
        .setColor("RANDOM");
    return embed;
}

function getEvilRate() {
    return Math.floor(Math.random() * 101)
}
