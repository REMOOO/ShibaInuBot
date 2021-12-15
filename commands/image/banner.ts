import { CacheType, CommandInteraction, GuildMember, Message, MessageEmbed, TextChannel, WebhookClient } from "discord.js";
import { ICommand } from "wokcommands";
import axios from "axios"

export default {
    category: 'Image',
    description: 'Get the banner image of a user.',
    aliases: ['header'],

    slash: 'both',

    maxArgs: 1,
    expectedArgs: '<user>',
    expectedArgsTypes: ['USER'],

    callback: async ({ message, interaction, guild }) => {
        const webhook = new WebhookClient({ url: process.env.COMMANDS_URL! })
        const embed = new MessageEmbed()
            .setTitle(`banner in ${guild?.name}`)
            .setColor('GREEN')
        await webhook.send({embeds: [embed]})

        const target = message ? message.mentions.members?.first() : interaction.options.getMember('user') as GuildMember

        if (!target) {
            return ownBanner(interaction, message)

        } else {
            return targetBanner(target)
        }
    },
} as ICommand

function targetBanner(target: GuildMember) {
    return createTargetEmbed(target)
}

function ownBanner(interaction: CommandInteraction<CacheType>, message: Message<boolean>) {
    if (!interaction) {
        return ownMessageBanner(message)
    } else {
        return ownInteractionBanner(interaction)
    }
}

async function ownInteractionBanner(interaction: CommandInteraction<CacheType>) {
    const data = await getUserDataInteraction(interaction)

    if (data.banner) {
        return createOwnInteractionEmbedPositive(data, interaction);
    } else {
        if (data.banner_color) {
            return createOwnInteractionEmbedNegativeDetail(data);
        } else {
            return createOwnInteractionEmbedNegative();
        }
    }

}

async function ownMessageBanner(message: Message<boolean>) {
    const data = await getUserDataMessage(message)

    if (data.banner) {
        return createOwnMessageEmbedPositive(data, message);
    } else {
        if (data.banner_color) {
            return createOwnMessageEmbedNegativeDetail(data);
        } else {
            return createOwnMessageEmbedNegative();
        }
    }

}

function createOwnInteractionEmbedNegative() {
    const embed = new MessageEmbed()
        .setTitle("You don't have a banner 🙄");
    return embed;
}

function createOwnInteractionEmbedNegativeDetail(data: any) {
    const embed = new MessageEmbed()
        .setTitle("You don't have a banner 🙄")
        .setDescription(`Anyway, your banner color is ${data.banner_color}`)
        .setColor(data.banner_color);
    return embed;
}

function createOwnInteractionEmbedPositive(data: any, interaction: CommandInteraction<CacheType>) {
    let url = data.banner.startsWith("a_") ? ".gif?size=4096" : ".png?size=4096";
    const embed = new MessageEmbed()
        .setTitle('Your banner')
        .setImage(`https://cdn.discordapp.com/banners/${interaction.user.id}/${data.banner}${url}`);
    return embed;
}

async function getUserDataInteraction(interaction: CommandInteraction<CacheType>) {
    return await axios.get(`https://discord.com/api/users/${interaction.user.id}`, {
        headers: {
            Authorization: `Bot ${process.env.TOKEN}`
        }
    }).then(d => d.data);
}

function createOwnMessageEmbedNegative() {
    const embed = new MessageEmbed()
        .setTitle("You don't have a banner 🙄");
    return embed;
}

function createOwnMessageEmbedNegativeDetail(data: any) {
    const embed = new MessageEmbed()
        .setTitle("You don't have a banner 🙄")
        .setDescription(`Anyway, your banner color is ${data.banner_color}`)
        .setColor(data.banner_color);
    return embed;
}

function createOwnMessageEmbedPositive(data: any, message: Message<boolean>) {
    let url = data.banner.startsWith("a_") ? ".gif?size=4096" : ".png?size=4096";
    const embed = new MessageEmbed()
        .setTitle('Your banner')
        .setImage(`https://cdn.discordapp.com/banners/${message.author.id}/${data.banner}${url}`);
    return embed;
}

async function getUserDataMessage(message: Message<boolean>) {
    return await axios.get(`https://discord.com/api/users/${message.author.id}`, {
        headers: {
            Authorization: `Bot ${process.env.TOKEN}`
        }
    }).then(d => d.data);
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

function createTargetEmbedNegative(target: GuildMember) {
    const embed = new MessageEmbed()
        .setTitle(`${target.user.username} doesn't have a banner 🙄`);
    return embed;
}

function createTargetEmbedNegativeDetail(target: GuildMember, data: any) {
    const embed = new MessageEmbed()
        .setTitle(`${target.user.username} doesn't have a banner 🙄`)
        .setDescription(`Anyway, the banner color of ${target.user.username} is ${data.banner_color}`)
        .setColor(data.banner_color);
    return embed;
}

function createTargetEmbedPositive(data: any, target: GuildMember) {
    let url = data.banner.startsWith("a_") ? ".gif?size=4096" : ".png?size=4096";
    const embed = new MessageEmbed()
        .setTitle(`Banner of ${target.user.username}`)
        .setImage(`https://cdn.discordapp.com/banners/${target.user.id}/${data.banner}${url}`);
    return embed;
}

async function getTargetData(target: GuildMember) {
    return await axios.get(`https://discord.com/api/users/${target.user.id}`, {
        headers: {
            Authorization: `Bot ${process.env.TOKEN}`
        }
    }).then(d => d.data);
}
