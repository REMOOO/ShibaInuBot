import { CacheType, CommandInteraction, MessageEmbed, User, WebhookClient } from "discord.js";
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

        const embed = new MessageEmbed()
            .setTitle(`avatar ${subcommand} ${user.username} in ${guild?.name}`)
            .setColor('GREEN')
        await webhook.send({ embeds: [embed] })

        if (subcommand === 'get') {
            return avatar(user)

        } else if (subcommand === 'server') {
            return serveravatar(user, interaction)

        } else if (subcommand === 'banner') {
            return banner(user)

        } else if (subcommand === 'serverbanner') {
            return serverbanner(user)

        }
    }
} as ICommand

async function avatar(target: User) {
    const embed = new MessageEmbed()
        .setTitle(`Avatar of ${target.username}`)
        .setImage(`${target.displayAvatarURL({ dynamic: true, size: 4096 })}`);
    return embed;
}

async function serveravatar(target: User, interaction: CommandInteraction<CacheType>) {
    const data = await axios.get(`https://discord.com/api/guilds/${interaction.guildId}/members/${target.id}`, {
        headers: {
            Authorization: `Bot ${process.env.TOKEN}`
        }
    }).then(d => d.data);

    if (data.avatar !== undefined && data.avatar !== null) {
        let end = data.avatar.startsWith("a_") ? ".gif?size=4096" : ".png?size=4096"

        const embed = new MessageEmbed()
            .setTitle(`Server avatar of ${target.username}`)
            .setImage(`https://cdn.discordapp.com/guilds/${interaction.guildId}/users/${target.id}/avatars/${data.avatar}${end}`);
        return embed;
    } else {
        const embed = new MessageEmbed()
            .setTitle(`${target.username} doesn't have a server avatar 🙄`)
            .setDescription(`Anyway, this is the global avatar of ${target.username}`)
            .setImage(`${target.displayAvatarURL({ dynamic: true, size: 4096 })}`);
        return embed;
    }
}

async function banner(target: User) {
    const data = await axios.get(`https://discord.com/api/users/${target.id}`, {
        headers: {
            Authorization: `Bot ${process.env.TOKEN}`
        }
    }).then(d => d.data);

    if (data.banner) {
        let url = data.banner.startsWith("a_") ? ".gif?size=4096" : ".png?size=4096";
        const embed = new MessageEmbed()
            .setTitle(`Banner of ${target.username}`)
            .setImage(`https://cdn.discordapp.com/banners/${target.id}/${data.banner}${url}`);
        return embed;
    } else {
        if (data.banner_color) {
            const embed = new MessageEmbed()
                .setTitle(`${target.username} doesn't have a banner 🙄`)
                .setDescription(`Anyway, the banner color of ${target.username} is ${data.banner_color}`)
                .setColor(data.banner_color);
            return embed;
        } else {
            const embed = new MessageEmbed()
                .setTitle(`${target.username} doesn't have a banner 🙄`);
            return embed;
        }
    }
}

async function serverbanner(target: User) {
    return "Will work when Discord fixes server banner data"
}