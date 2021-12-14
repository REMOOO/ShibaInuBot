import { CacheType, CommandInteraction, GuildMember, Message, MessageEmbed, TextChannel } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Text',
    description: 'Measure the eboyness of a user.',

    slash: 'both',

    maxArgs: 1,
    expectedArgs: '<user>',
    expectedArgsTypes: ['USER'],

    callback: ({ message, interaction, channel }) => {
        console.log(`eboyrate`)

        const target = message ? message.mentions.members?.first() : interaction.options.getMember('user') as GuildMember

        return eboyrate(interaction, channel, message, target)
    }
} as ICommand

function eboyrate(interaction: CommandInteraction<CacheType>, channel: TextChannel, message: Message<boolean>, target: GuildMember | undefined) {
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
    const embed = new MessageEmbed()
        .setTitle(`${target.user.username} is ${getEboyRate()}% e-boy ⛓️💀🖤`);
    return embed;
}

function createOwnEmbed() {
    const embed = new MessageEmbed()
        .setTitle(`You are ${getEboyRate()}% e-boy ⛓️💀🖤`);
    return embed;
}

function getEboyRate() {
    return Math.floor(Math.random() * 101)
}

function botHasPermissionsInteraction(channel: TextChannel, interaction: CommandInteraction<CacheType>) {
    return channel.permissionsFor(interaction.guild?.me!).has("SEND_MESSAGES");
}

function botHasPermissionsMessage(channel: TextChannel, message: Message<boolean>) {
    return channel.permissionsFor(message.guild?.me!).has("SEND_MESSAGES");
}
