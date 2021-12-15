import { ICommand } from "wokcommands";
import { CacheType, CommandInteraction, Message, MessageEmbed, TextChannel } from "discord.js";
const getter = require("reddit-image-fetcher")

export default {
    category: 'Image',
    description: 'Get an image of a cute kitty.',

    slash: 'both',

    callback: async () => {
        console.log(`cat`)

        var { title, res } = await getImageFromReddit();

        return cat(title, res)
    }
} as ICommand

function cat(title: string, res: { image: string; }[]) {
    return createEmbed(title, res)
}

function createEmbed(title: string, res: { image: string; }[]) {
    const embed = new MessageEmbed()
                    .setTitle(title)
                    .setImage(res[0].image)
                return embed
}

async function getImageFromReddit() {
    let subreddits = ["catpictures", "catpics"];

    const res = await getter.fetch({
        type: 'custom',
        subreddit: subreddits
    });

    let title = "";

    if (res[0].title.length > 256) {
        title = "Meow";
    } else {
        title = res[0].title;
    }
    return { title, res };
}
