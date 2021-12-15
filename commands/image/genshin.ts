import { ICommand } from "wokcommands";
import { MessageEmbed } from "discord.js";
const getter = require("reddit-image-fetcher")

export default {
    category: 'Image',
    description: 'Get a genshin impact related image.',

    slash: 'both',

    callback: async ({guild}) => {
        console.log(`genshin in ${guild?.name}`)

        var { title, res } = await getImageFromReddit();

        return genshin(title, res)
    }
} as ICommand

function genshin(title: string, res: any) {
    return createEmbed(title, res)
}

function createEmbed(title: string, res: any) {
    const embed = new MessageEmbed()
        .setTitle(title)
        .setImage(res[0].image);
    return embed;
}

async function getImageFromReddit() {
    let subreddits = ["Genshin_Impact"];

    const res = await getter.fetch({
        type: 'custom',
        subreddit: subreddits
    });

    let title = "";

    if (res[0].title.length > 256) {
        title = "Genshin Impact";
    } else {
        title = res[0].title;
    }
    return { title, res };
}
