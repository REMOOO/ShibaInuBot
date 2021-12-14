import { CacheType, CommandInteraction, GuildMember, Message, MessageEmbed, TextChannel } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Text',
    description: 'Measure the evilness of a user.',

    slash: 'both',

    maxArgs: 1,
    expectedArgs: '<user>',
    expectedArgsTypes: ['USER'],

    callback: ({ message, interaction, channel }) => {
        console.log(`evilrate`)

        const target = message ? message.mentions.members?.first() : interaction.options.getMember('user') as GuildMember

        return evilrate(interaction, channel, message, target)
    }
} as ICommand

function evilrate(interaction: CommandInteraction<CacheType>, channel: TextChannel, message: Message<boolean>, target: GuildMember | undefined) {
    if (!interaction) {
        if (botHasPermissionsMessage(channel, message)) {
            return createEmbed(target)
        }
    } else {
        if (botHasPermissionsInteraction(channel, interaction)) {
            return createEmbed(target)
        }
    }
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

function botHasPermissionsInteraction(channel: TextChannel, interaction: CommandInteraction<CacheType>) {
    return channel.permissionsFor(interaction.guild?.me!).has("SEND_MESSAGES");
}

function botHasPermissionsMessage(channel: TextChannel, message: Message<boolean>) {
    return channel.permissionsFor(message.guild?.me!).has("SEND_MESSAGES");
}