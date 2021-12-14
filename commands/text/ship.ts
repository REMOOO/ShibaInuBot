import { CacheType, CommandInteraction, GuildMember, Message, MessageEmbed, TextChannel } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Text',
    description: 'Ship your love with another user.',
    aliases : ['love', 'match'],

    slash: 'both',

    maxArgs: 1,
    expectedArgs: '<user>',
    expectedArgsTypes: ['USER'],

    callback: ({ message, interaction, channel }) => {
        console.log(`ship`)

        const target = message ? message.mentions.members?.first() : interaction.options.getMember('user') as GuildMember
        return shipCmd(target, interaction, channel, message)
    }
} as ICommand

function shipCmd(target: GuildMember | undefined, interaction: CommandInteraction<CacheType>, channel: TextChannel, message: Message<boolean>) {
    if (!target) {
        return createOwnEmbed(interaction, channel, message)
    } else {
        return createTargetEmbed(interaction, channel, message, target)
    }
}

function createTargetEmbed(interaction: CommandInteraction<CacheType>, channel: TextChannel, message: Message<boolean>, target: GuildMember) {
    if (!interaction) {
        if (botHasPermissionsMessage(channel, message)) {
            return createTargetMessageEmbed(message, target)
        }
    } else {
        if (botHasPermissionsInteraction(channel, interaction)) {
            return createTargetInteractionEmbed(interaction, target)
        }
    }
}

function createOwnEmbed(interaction: CommandInteraction<CacheType>, channel: TextChannel, message: Message<boolean>) {
    if (!interaction) {
        if (botHasPermissionsMessage(channel, message)) {
            return createOwnMessageEmbed(message)
        }
    } else {
        if (botHasPermissionsInteraction(channel, interaction)) {
            return createOwnInteractionEmbed(interaction)
        }
    }
}

function createTargetInteractionEmbed(interaction: CommandInteraction<CacheType>, target: GuildMember) {
    const shipArray = ship();

    const embed = new MessageEmbed()
        .setTitle(`Shipped ${interaction.user.username} with ${target.user.username}`)
        .setDescription(`💕 ${shipArray[0]}%\n\n${shipArray[1]}`)
        .setThumbnail(target.user.displayAvatarURL({ dynamic: true, size: 4096 }))
        .setColor("LUMINOUS_VIVID_PINK");
    return embed;
}

function createTargetMessageEmbed(message: Message<boolean>, target: GuildMember) {
    const shipArray = ship();

    const embed = new MessageEmbed()
        .setTitle(`Shipped ${message.author.username} with ${target.user.username}`)
        .setDescription(`💕 ${shipArray[0]}%\n\n${shipArray[1]}`)
        .setThumbnail(target.user.displayAvatarURL({ dynamic: true, size: 4096 }))
        .setColor("LUMINOUS_VIVID_PINK");
    return embed;
}

function createOwnInteractionEmbed(interaction: CommandInteraction<CacheType>) {
    const randomUser = interaction.guild?.members.cache.random()?.user!;
    const shipArray = ship();

    const embed = new MessageEmbed()
        .setTitle(`Shipped ${interaction.user.username} with ${randomUser?.username}`)
        .setDescription(`💕 ${shipArray[0]}%\n\n${shipArray[1]}`)
        .setThumbnail(randomUser?.displayAvatarURL({ dynamic: true, size: 4096 }))
        .setColor("LUMINOUS_VIVID_PINK");
    return embed;
}

function createOwnMessageEmbed(message: Message<boolean>) {
    const randomUser = message.guild?.members.cache.random()?.user!;
    const shipArray = ship();

    const embed = new MessageEmbed()
        .setTitle(`Shipped ${message.author.username} with ${randomUser?.username}`)
        .setDescription(`💕 ${shipArray[0]}%\n\n${shipArray[1]}`)
        .setThumbnail(randomUser?.displayAvatarURL({ dynamic: true, size: 4096 }))
        .setColor("LUMINOUS_VIVID_PINK");
    return embed;
}

function ship() {
    const shipness = Math.floor(Math.random() * 101)
    const shipIndex = Math.floor(shipness / 10)
    const shipLevel = "💖".repeat(shipIndex) + "💔".repeat(10 - shipIndex)
    const shipArray = [shipness, shipLevel]
    return shipArray
}

function botHasPermissionsInteraction(channel: TextChannel, interaction: CommandInteraction<CacheType>) {
    return channel.permissionsFor(interaction.guild?.me!).has("SEND_MESSAGES");
}

function botHasPermissionsMessage(channel: TextChannel, message: Message<boolean>) {
    return channel.permissionsFor(message.guild?.me!).has("SEND_MESSAGES");
}