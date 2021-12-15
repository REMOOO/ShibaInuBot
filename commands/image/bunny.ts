import { ICommand } from "wokcommands";
import { MessageEmbed } from "discord.js";
const getter = require("reddit-image-fetcher")

export default {
    category: 'Image',
    description: 'Get an image of a cute bunny.',

    slash: 'both',

    callback: async ({guild}) => {
        console.log(`bunny in ${guild?.name}`)

        var { title, res } = await getImageFromReddit();

        return bunny(title, res)
    }
} as ICommand

function bunny(title: string, res: any) {
    return createEmbed(title, res)
}

async function getImageFromReddit() {
    let subreddits = ["rabbits", "bunnies"];

    const res = await getter.fetch({
        type: 'custom',
        subreddit: subreddits
    });

    let title = "";

    if (res[0].title.length > 256) {
        title = "Cute bunny";
    } else {
        title = res[0].title;
    }
    return { title, res };
}

function createEmbed(title: string, res: any) {
    const embed = new MessageEmbed()
        .setTitle(title)
        .setImage(res[0].image);
    return embed;
}
