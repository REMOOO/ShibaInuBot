import { ICommand } from "wokcommands";
import { MessageEmbed } from "discord.js";
const getter = require("reddit-image-fetcher")

export default {
    category: 'Image',
    description: 'Get an image of a cute doggo.',

    slash: 'both',

    callback: async () => {
        console.log(`dog`)

        var { title, res } = await getImageFromReddit();

        return dog(title, res)
    }
} as ICommand

function dog( title: string, res: any) {
    return createEmbed(title, res)
}

function createEmbed(title: string, res: any) {
    const embed = new MessageEmbed()
        .setTitle(title)
        .setImage(res[0].image);
    return embed;
}

async function getImageFromReddit() {
    let subreddits = ["lookatmydog", "dogpictures"];

    const res = await getter.fetch({
        type: 'custom',
        subreddit: subreddits
    });

    let title = "";

    if (res[0].title.length > 256) {
        title = "Woof!";
    } else {
        title = res[0].title;
    }
    return { title, res };
}
