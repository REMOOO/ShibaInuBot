import { CacheType, CommandInteraction, GuildMember, Message, MessageEmbed, TextChannel } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Image',
    description: 'Get the avatar image of a user.',
    aliases: ['av', 'pfp'],

    slash: 'both',
    
    maxArgs: 1,
    expectedArgs: '<user>',
    expectedArgsTypes: ['USER'],

    callback: ({ channel, message, interaction }) => {
        console.log(`avatar`)

        const target = message ? message.mentions.members?.first() : interaction.options.getMember('user') as GuildMember
        if (!target) {
            return ownAvatar(interaction, channel, message)
        } else {
            return targetAvatar(interaction, channel, message, target)
        }
    }
} as ICommand

function targetAvatar(interaction: CommandInteraction<CacheType>, channel: TextChannel, message: Message<boolean>, target: GuildMember) {
    if (!interaction) {
        if (botHasPermissionsMessage(channel, message)) {
            return createTargetEmbed(target);
        }
    } else {
        if (botHasPermissionsInteraction(channel, interaction)) {
            return createTargetEmbed(target);
        }
    }
}

function ownAvatar(interaction: CommandInteraction<CacheType>, channel: TextChannel, message: Message<boolean>) {
    if (!interaction) {
        if (botHasPermissionsMessage(channel, message)) {
            return createOwnMessageEmbed(message);
        }
    } else {
        if (botHasPermissionsInteraction(channel, interaction)) {
            return createOwnInteractionEmbed(interaction);
        }
    }
}

function createOwnInteractionEmbed(interaction: CommandInteraction<CacheType>) {
    const embed = new MessageEmbed()
        .setTitle(`Your avatar`)
        .setImage(`${interaction.user.displayAvatarURL({ dynamic: true, size: 4096 })}`);
    return embed;
}

function createOwnMessageEmbed(message: Message<boolean>) {
    const embed = new MessageEmbed()
        .setTitle(`Your avatar`)
        .setImage(`${message.author.displayAvatarURL({ dynamic: true, size: 4096 })}`);
    return embed;
}

function createTargetEmbed(target: GuildMember) {
    const embed = new MessageEmbed()
        .setTitle(`Avatar of ${target.user.username}`)
        .setImage(`${target.user.displayAvatarURL({ dynamic: true, size: 4096 })}`);
    return embed;
}

function botHasPermissionsInteraction(channel: TextChannel, interaction: CommandInteraction<CacheType>) {
    return channel.permissionsFor(interaction.guild?.me!).has("SEND_MESSAGES");
}

function botHasPermissionsMessage(channel: TextChannel, message: Message<boolean>) {
    return channel.permissionsFor(message.guild?.me!).has("SEND_MESSAGES");
}