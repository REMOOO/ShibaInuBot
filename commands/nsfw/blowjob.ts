import { ICommand } from "wokcommands";
import { MessageEmbed, WebhookClient } from "discord.js";
const getter = require("reddit-image-fetcher")

export default {
    category: 'NSFW',
    description: 'See some blowjobs.',
    aliases: ['bj'],

    slash: 'both',

    callback: async ({ channel, guild }) => {
        const webhook = new WebhookClient({ url: process.env.COMMANDS_URL! })
        const embed = new MessageEmbed()
            .setTitle(`blowjob in ${guild?.name}`)
            .setColor('GREEN')
        await webhook.send({embeds: [embed]})

        if (!channel.nsfw) {
            return "🔞 This command can only be used in NSFW channels."
        }

        var { title, res } = await getImageFromReddit();

        return blowjob(title, res)
    }
} as ICommand

function blowjob(title: string, res: any) {
    return createEmbed(title, res)
}

function createEmbed(title: string, res: any) {
    const embed = new MessageEmbed()
        .setTitle(title)
        .setImage(res[0].image);
    return embed;
}

async function getImageFromReddit() {
    let subreddits = [
        "blowjobs"
    ];

    const res = await getter.fetch({
        type: 'custom',
        subreddit: subreddits
    });

    let title = "";

    if (res[0].title.length > 256) {
        title = "blowjob";
    } else {
        title = res[0].title;
    }
    return { title, res };
}