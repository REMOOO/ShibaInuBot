import { ICommand } from "wokcommands";
import { MessageEmbed, WebhookClient } from "discord.js";
const getter = require("reddit-image-fetcher")

export default {
    category: 'Image',
    description: 'Get a random picture.',
    aliases : ['pic'],

    slash: 'both',

    callback: async ({guild}) => {
        const webhook = new WebhookClient({ url: process.env.COMMANDS_URL! })
        const embed = new MessageEmbed()
            .setTitle(`picture in ${guild?.name}`)
            .setColor('GREEN')
        await webhook.send({embeds: [embed]})

        var { title, res } = await getImageFromReddit();

        return picture(title, res)
    }
} as ICommand

function picture(title: string, res: any) {
    return createEmbed(title, res)
}

function createEmbed(title: string, res: any) {
    const embed = new MessageEmbed()
        .setTitle(title)
        .setImage(res[0].image);
    return embed;
}

async function getImageFromReddit() {
    let subreddits = ["pics", "pic", "images"];

    const res = await getter.fetch({
        type: 'custom',
        subreddit: subreddits
    });

    let title = "";

    if (res[0].title.length > 256) {
        title = "Nice picture";
    } else {
        title = res[0].title;
    }
    return { title, res };
}
