import axios from "axios";
import { CacheType, CommandInteraction, GuildMember, Message, MessageEmbed, TextChannel, WebhookClient } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Image',
    description: 'Get the server banner image of a user.',
    aliases: ['serverheader'],

    slash: 'both',

    maxArgs: 1,
    expectedArgs: '<user>',
    expectedArgsTypes: ['USER'],

    callback: async ({ channel, message, interaction, guild }) => {
        const webhook = new WebhookClient({ url: process.env.COMMANDS_URL! })
        const embed = new MessageEmbed()
            .setTitle(`serverbanner in ${guild?.name}`)
            .setColor('GREEN')
        await webhook.send({embeds: [embed]})

        const target = message ? message.mentions.members?.first() : interaction.options.getMember('user') as GuildMember

        if (!target) {
            return ownServerBanner(interaction, channel, message)
        } else {
            return targetServerBanner(target)
        }
    },
} as ICommand

function ownServerBanner(interaction: CommandInteraction<CacheType>, channel: TextChannel, message: Message<boolean>) {
    if (!interaction) {
        return ownMessageServerBanner(channel, message)
    } else {
        return ownInteractionServerBanner(channel, interaction)
    }
}

async function ownMessageServerBanner(channel: TextChannel, message: Message<boolean>) {
        const data = await getUserDataMessage(message)
        console.log(data)
        return "Will work when Discord fixes server banner data"
        // if (data.banner) {
        //     return createOwnMessageEmbedPositive(data, message)
        // } else {
        //     if (data.banner_color) {
        //         return createOwnMessageEmbedNegativeDetail(data)
        //     } else {
        //         return createOwnMessageEmbedNegative()
        //     }
        // }
}

async function getUserDataMessage(message: Message<boolean>) {
    return await axios.get(`https://discord.com/api/guilds/${message.guildId}/members/${message.author.id}`, {
        headers: {
            Authorization: `Bot ${process.env.TOKEN}`
        }
    }).then(d => d.data)
}

function createOwnMessageEmbedPositive(data: any, message: Message<boolean>) {
    let end = data.banner.startsWith("a_") ? ".gif?size=4096" : ".png?size=4096";
    const embed = new MessageEmbed()
        .setTitle('Your banner')
        .setImage(`https://cdn.discordapp.com/guilds/${message.guildId}/users/${message.author.id}/banners/${data.banner}${end}`)
    return embed
}

function createOwnMessageEmbedNegativeDetail(data: any) {
    const embed = new MessageEmbed()
        .setTitle("You don't have a server banner 🙄")
        .setDescription(`Anyway, your banner color is ${data.banner_color}`)
        .setColor(data.banner_color);
    return embed;
}

function createOwnMessageEmbedNegative() {
    const embed = new MessageEmbed()
        .setTitle("You don't have a server banner 🙄");
    return embed;
}

async function ownInteractionServerBanner(channel: TextChannel, interaction: CommandInteraction<CacheType>) {
        const data = await getUserDataInteraction(interaction)

        return "Will work when Discord fixes server banner data"

        // if (data.banner) {
        //     return createOwnInteractionEmbedPositive(data, interaction)
        // } else {
        //     if (data.banner_color) {
        //         return createOwnInteractionEmbedNegativeDetail(data)
        //     } else {
        //         return createOwnInteractionEmbedNegative()
        //     }
        // }
}

async function getUserDataInteraction(interaction: CommandInteraction<CacheType>) {
    return await axios.get(`https://discord.com/api/guilds/${interaction.guildId}/members/${interaction.user.id}`, {
        headers: {
            Authorization: `Bot ${process.env.TOKEN}`
        }
    }).then(d => d.data);
}

function createOwnInteractionEmbedPositive(data: any, interaction: CommandInteraction<CacheType>) {
    let end = data.banner.startsWith("a_") ? ".gif?size=4096" : ".png?size=4096";
    const embed = new MessageEmbed()
        .setTitle('Your banner')
        .setImage(`https://cdn.discordapp.com/banners/${interaction.user.id}/${data.banner}${end}`);
    return embed;
}

function createOwnInteractionEmbedNegative() {
    const embed = new MessageEmbed()
        .setTitle("You don't have a server banner 🙄");
    return embed;
}

function createOwnInteractionEmbedNegativeDetail(data: any) {
    const embed = new MessageEmbed()
        .setTitle("You don't have a server banner 🙄")
        .setDescription(`Anyway, your banner color is ${data.banner_color}`)
        .setColor(data.banner_color);
    return embed;
}

function targetServerBanner(target: GuildMember) {
    return "Will work when Discord fixes server banner data"
            //return createTargetEmbed(target)
}

async function createTargetEmbed(target: GuildMember) {
    const data = await getTargetData(target)

            if (data.banner) {
                return createTargetEmbedPositive(data, target);
            } else {
                if (data.banner_color) {
                    return createTargetEmbedNegativeDetail(target, data);
                } else {
                    return createTargetEmbedNegative(target);
                }
            }
}

async function getTargetData(target: GuildMember) {
    return await axios.get(`https://discord.com/api/guilds/${target.guild.id}/members/${target.user.id}`, {
        headers: {
            Authorization: `Bot ${process.env.TOKEN}`
        }
    }).then(d => d.data);
}

function createTargetEmbedNegative(target: GuildMember) {
    const embed = new MessageEmbed()
        .setTitle(`${target.user.username} doesn't have a server banner 🙄`);
    return embed;
}

function createTargetEmbedNegativeDetail(target: GuildMember, data: any) {
    const embed = new MessageEmbed()
        .setTitle(`${target.user.username} doesn't have a server banner 🙄`)
        .setDescription(`Anyway, the banner color of ${target.user.username} is ${data.banner_color}`)
        .setColor(data.banner_color);
    return embed;
}

function createTargetEmbedPositive(data: any, target: GuildMember) {
    let end = data.banner.startsWith("a_") ? ".gif?size=4096" : ".png?size=4096";
    const embed = new MessageEmbed()
        .setTitle(`Banner of ${target.user.username}`)
        .setImage(`https://cdn.discordapp.com/banners/${target.user.id}/${data.banner}${end}`);
    return embed;
}
