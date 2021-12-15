import { ICommand } from "wokcommands";
import { MessageEmbed } from "discord.js";
const getter = require("reddit-image-fetcher")

export default {
    category: 'NSFW',
    description: 'See some boobs.',
    aliases: ['tits', 'titties'],

    slash: 'both',

    callback: async ({ channel, guild }) => {
        console.log(`boobs in ${guild?.name}`)

        if (!channel.nsfw) {
            return "🔞 This command can only be used in NSFW channels."
        }

        var { title, res } = await getImageFromReddit();

        return boobs(title, res)
    }
} as ICommand

function boobs(title: string, res: any) {
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
        "boobs",
        "boobies",
        "boobbounce",
        "BigBoobsGoneWild",
        "hugeboobs",
        "TheUnderboob",
        "bigtitsinbikinis",
        "Bigtitssmalltits",
        "boltedontits",
        "naturaltitties",
        "tinytits",
        "tits",
        "tittydrop",
        "ghostnipples"
    ];

    const res = await getter.fetch({
        type: 'custom',
        subreddit: subreddits
    });

    let title = "";

    if (res[0].title.length > 256) {
        title = "boobs";
    } else {
        title = res[0].title;
    }
    return { title, res };
}
