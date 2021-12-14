import axios from "axios";
import { CacheType, CommandInteraction, GuildMember, Message, MessageEmbed, TextChannel } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Image',
    description: 'Get the server avatar image of a user.',
    aliases: ['serverav', 'serverpfp'],

    slash: 'both',

    maxArgs: 1,
    expectedArgs: '<user>',
    expectedArgsTypes: ['USER'],

    callback: async ({ message, channel, interaction }) => {
        console.log(`serveravatar`)

        const target = message ? message.mentions.members?.first() : interaction.options.getMember('user') as GuildMember

        if (!target) {
            return createOwnServerAvatarEmbed(interaction, channel, message)
        } else {
            return createTargetServerAvatarEmbed(target, channel, message, interaction)
        }
    }
} as ICommand

async function createTargetServerAvatarEmbed(target: GuildMember, channel: TextChannel, message: Message<boolean>, interaction: CommandInteraction<CacheType>) {
    if (!interaction) {
        if (botHasPermissionsMessage(channel, message)) {
            const data = await getTargetData(target)
            return createTargetServerAvatar(data, target)
        }
    } else {
        if (botHasPermissionsInteraction(channel, interaction)) {
            const data = await getTargetData(target)
            return createTargetServerAvatar(data, target)
        }
    }
}

function createTargetServerAvatar(data: { avatar: string | null | undefined; }, target: GuildMember) {
    if (data.avatar !== undefined && data.avatar !== null) {
        let end = data.avatar.startsWith("a_") ? ".gif?size=4096":".png?size=4096"
        return createTargetServerAvatarEmbedPositive(target, data, end);
    } else {
        return createTargetServerAvatarEmbedNegative(target);
    }
}

function createTargetServerAvatarEmbedNegative(target: GuildMember) {
    const embed = new MessageEmbed()
        .setTitle(`${target.user.username} doesn't have a server avatar 🙄`)
        .setDescription(`Anyway, this is the global avatar of ${target.user.username}`)
        .setImage(`${target.user.displayAvatarURL({ dynamic: true, size: 4096 })}`);
    return embed;
}

function createTargetServerAvatarEmbedPositive(target: GuildMember, data: any, end: string) {
    const embed = new MessageEmbed()
        .setTitle(`Server avatar of ${target.user.username}`)
        .setImage(`https://cdn.discordapp.com/guilds/${target.guild.id}/users/${target.user.id}/avatars/${data.avatar}${end}`);
    return embed;
}

async function getTargetData(target: GuildMember) {
    return await axios.get(`https://discord.com/api/guilds/${target.guild.id}/members/${target.user.id}`, {
        headers: {
            Authorization: `Bot ${process.env.TOKEN}`
        }
    }).then(d => d.data);
}

async function createOwnServerAvatarEmbed(interaction: CommandInteraction<CacheType>, channel: TextChannel, message: Message<boolean>) {
    if (!interaction) {
        if (botHasPermissionsMessage(channel, message)) {
            const data = await getDataMessage(message)
            return createOwnServerAvatarMessageEmbed(data, message)
        }
    } else {
        if (botHasPermissionsInteraction(channel, interaction)) {
            const data = await getDataInteraction(interaction)
            return createOwnServerAvatarInteractionEmbed(data, interaction)
        }
    }
}

function createOwnServerAvatarInteractionEmbed(data: { avatar: string | null | undefined; }, interaction: CommandInteraction<CacheType>) {
    if (data.avatar !== undefined && data.avatar !== null) {
        let end = data.avatar.startsWith("a_") ? ".gif?size=4096":".png?size=4096"
        return createOwnServerAvatarInteractionEmbedPositive(interaction, data, end);
    } else {
        return createOwnServerAvatarInteractionEmbedNegative(interaction);
    }
}

function createOwnServerAvatarInteractionEmbedNegative(interaction: CommandInteraction<CacheType>) {
    const embed = new MessageEmbed()
        .setTitle("You don't have a server avatar 🙄")
        .setDescription("Anyway, this is your global avatar")
        .setImage(`${interaction.user.displayAvatarURL({ dynamic: true, size: 4096 })}`);
    return embed;
}

function createOwnServerAvatarInteractionEmbedPositive(interaction: CommandInteraction<CacheType>, data: any, end: string) {
    const embed = new MessageEmbed()
        .setTitle('Your server avatar')
        .setImage(`https://cdn.discordapp.com/guilds/${interaction.guildId}/users/${interaction.user.id}/avatars/${data.avatar}${end}`);
    return embed;
}

async function getDataInteraction(interaction: CommandInteraction<CacheType>) {
    return await axios.get(`https://discord.com/api/guilds/${interaction.guildId}/members/${interaction.user.id}`, {
        headers: {
            Authorization: `Bot ${process.env.TOKEN}`
        }
    }).then(d => d.data);
}

function createOwnServerAvatarMessageEmbed(data: { avatar: string | null | undefined; }, message: Message<boolean>) {
    if (data.avatar !== undefined && data.avatar !== null) {
        let end = data.avatar.startsWith("a_") ? ".gif?size=4096":".png?size=4096"
        return createOwnServerAvatarMessageEmbedPositive(message, data, end);
    } else {
        return createOwnServerAvatarMessageEmbedNegative(message);
    }
}

function createOwnServerAvatarMessageEmbedNegative(message: Message<boolean>) {
    const embed = new MessageEmbed()
        .setTitle("You don't have a server avatar 🙄")
        .setDescription("Anyway, this is your global avatar")
        .setImage(`${message.author.displayAvatarURL({ dynamic: true, size: 4096 })}`);
    return embed;
}

function createOwnServerAvatarMessageEmbedPositive(message: Message<boolean>, data: any, end: string) {
    const embed = new MessageEmbed()
        .setTitle('Your server avatar')
        .setImage(`https://cdn.discordapp.com/guilds/${message.guildId}/users/${message.author.id}/avatars/${data.avatar}${end}`);
    return embed;
}

async function getDataMessage(message: Message<boolean>) {
    return await axios.get(`https://discord.com/api/guilds/${message.guildId}/members/${message.author.id}`, {
        headers: {
            Authorization: `Bot ${process.env.TOKEN}`
        }
    }).then(d => d.data);
}

function botHasPermissionsInteraction(channel: TextChannel, interaction: CommandInteraction<CacheType>) {
    return channel.permissionsFor(interaction.guild?.me!).has("SEND_MESSAGES");
}

function botHasPermissionsMessage(channel: TextChannel, message: Message<boolean>) {
    return channel.permissionsFor(message.guild?.me!).has("SEND_MESSAGES");
}