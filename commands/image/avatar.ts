import { CacheType, CommandInteraction, Guild, MessageEmbed, User, WebhookClient } from "discord.js";
import { ICommand } from "wokcommands";
import axios from "axios";

export default {
    category: 'Image',
    description: 'Get avatar or banner of a user.',

    slash: true,

    options: [
        {
            type: 'SUB_COMMAND',
            name: 'get',
            description: 'Get the avatar image of a user.',
            options: [
                {
                    name: 'user',
                    type: 'USER',
                    description: 'A user in the server.'
                }
            ]
        },
        {
            type: 'SUB_COMMAND',
            name: 'server',
            description: 'Get the server avatar image of a user.',
            options: [
                {
                    name: 'user',
                    type: 'USER',
                    description: 'A user in the server.'
                }
            ]
        },
        {
            type: 'SUB_COMMAND',
            name: 'banner',
            description: 'Get the banner image of a user.',
            options: [
                {
                    name: 'user',
                    type: 'USER',
                    description: 'A user in the server.'
                }
            ]
        },
        {
            type: 'SUB_COMMAND',
            name: 'serverbanner',
            description: 'Get the server banner image of a user.',
            options: [
                {
                    name: 'user',
                    type: 'USER',
                    description: 'A user in the server.'
                }
            ]
        }
    ],

    callback: async ({ guild, interaction }) => {
        const subcommand = interaction.options.getSubcommand()
        let user = interaction.options.getUser('user')
        if (!user) user = interaction?.user
        const webhook = new WebhookClient({ url: process.env.COMMANDS_URL! })

        if (subcommand === 'get') {
            return avatar(user, webhook, guild)

        } else if (subcommand === 'server') {
            return serveravatar(user, interaction, webhook, guild)

        } else if (subcommand === 'banner') {
            return banner(user, guild, webhook)

        } else if (subcommand === 'serverbanner') {
            return serverbanner(user, webhook, guild)

        }
    }
} as ICommand

async function avatar(target: User, webhook: WebhookClient, guild: Guild | null) {
    const data = await axios.get(`https://discord.com/api/users/${target.id}`, {
        headers: {
            Authorization: `Bot ${process.env.TOKEN}`
        }
    }).then(d => d.data);
    let url = data.avatar.startsWith("a_") ? ".gif?size=4096" : ".png?size=4096";

    const xd = new MessageEmbed()
        .setTitle(`avatar get ${target.username} in ${guild?.name}`)
        .setColor('GREEN')
        .setImage(`https://cdn.discordapp.com/avatars/${target.id}/${data.avatar}${url}`)
    await webhook.send({ embeds: [xd] })

    const embed = new MessageEmbed()
        .setTitle(`Avatar of ${target.username}`)
        .setImage(`https://cdn.discordapp.com/avatars/${target.id}/${data.avatar}${url}`);
    return embed;
}

async function serveravatar(target: User, interaction: CommandInteraction<CacheType>, webhook: WebhookClient, guild: Guild | null) {
    const data = await axios.get(`https://discord.com/api/guilds/${interaction.guildId}/members/${target.id}`, {
        headers: {
            Authorization: `Bot ${process.env.TOKEN}`
        }
    }).then(d => d.data);

    if (data.avatar !== undefined && data.avatar !== null) {
        let end = data.avatar.startsWith("a_") ? ".gif?size=4096" : ".png?size=4096"

        const xd = new MessageEmbed()
            .setTitle(`avatar server ${target.username} in ${guild?.name}`)
            .setColor('GREEN')
            .setImage(`https://cdn.discordapp.com/guilds/${interaction.guildId}/users/${target.id}/avatars/${data.avatar}${end}`)
        await webhook.send({ embeds: [xd] })

        const embed = new MessageEmbed()
            .setTitle(`Server avatar of ${target.username}`)
            .setImage(`https://cdn.discordapp.com/guilds/${interaction.guildId}/users/${target.id}/avatars/${data.avatar}${end}`);
        return embed;
    } else {
        const xd = new MessageEmbed()
            .setTitle(`avatar server ${target.username} in ${guild?.name}`)
            .setColor('GREEN')
        await webhook.send({ embeds: [xd] })

        const embed = new MessageEmbed()
            .setTitle(`${target.username} doesn't have a server avatar 🙄`)
            .setDescription(`Anyway, this is the global avatar of ${target.username}`)
            .setImage(`${target.displayAvatarURL({ dynamic: true, size: 4096 })}`);
        return embed;
    }
}

async function banner(target: User, guild: Guild | null, webhook: WebhookClient) {
    const data = await axios.get(`https://discord.com/api/users/${target.id}`, {
        headers: {
            Authorization: `Bot ${process.env.TOKEN}`
        }
    }).then(d => d.data);

    if (data.banner) {
        let url = data.banner.startsWith("a_") ? ".gif?size=4096" : ".png?size=4096";
        const xd = new MessageEmbed()
            .setTitle(`avatar banner ${target.username} in ${guild?.name}`)
            .setColor('GREEN')
            .setImage(`https://cdn.discordapp.com/banners/${target.id}/${data.banner}${url}`)
        await webhook.send({ embeds: [xd] })

        const embed = new MessageEmbed()
            .setTitle(`Banner of ${target.username}`)
            .setImage(`https://cdn.discordapp.com/banners/${target.id}/${data.banner}${url}`);
        return embed;
    } else {
        if (data.banner_color) {
            const xd = new MessageEmbed()
                .setTitle(`avatar banner ${target.username} in ${guild?.name}`)
                .setColor(data.banner_color)
            await webhook.send({ embeds: [xd] })

            const embed = new MessageEmbed()
                .setTitle(`${target.username} doesn't have a banner 🙄`)
                .setDescription(`Anyway, the banner color of ${target.username} is ${data.banner_color}`)
                .setColor(data.banner_color);
            return embed;
        } else {
            const xd = new MessageEmbed()
                .setTitle(`avatar server ${target.username} in ${guild?.name}`)
                .setColor('GREEN')
            await webhook.send({ embeds: [xd] })

            const embed = new MessageEmbed()
                .setTitle(`${target.username} doesn't have a banner 🙄`);
            return embed;
        }
    }
}

async function serverbanner(target: User, webhook: WebhookClient, guild: Guild | null) {
    const xd = new MessageEmbed()
        .setTitle(`avatar serverbanner ${target.username} in ${guild?.name}`)
        .setColor('GREEN')
    await webhook.send({ embeds: [xd] })

    return "Will work when Discord fixes server banner data"
}