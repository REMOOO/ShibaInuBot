import { ICommand } from "wokcommands";
import { MessageEmbed } from "discord.js";
const getter = require("reddit-image-fetcher")

export default {
    category: 'Image',
    description: 'See some nudes.',
    aliases: ['nudes'],

    slash: 'both',

    callback: async ({ channel, guild }) => {
        console.log(`nude in ${guild?.name}`)

        if (!channel.nsfw) {
            return "🔞 This command can only be used in NSFW channels."
        }

        var { title, res } = await getImageFromReddit();

        return nude(title, res)
    }
} as ICommand

function nude(title: string, res: any) {
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
        "GoneWild",
        "NSFW",
        "RealGirls",
        "holdthemoan",
        "bustypetite",
        "LegalTeens",
        "PetiteGoneWild",
        "AdorablePorn",
        "AsiansGoneWild",
        "GirlsFinishingTheJob",
        "CollegeSluts",
        "Amateur",
        "BiggerThanYouThought",
        "porn",
        "happyembarrassedgirl",
        "onoff",
        "NSFWHardcore",
        "juicyasians",
        "18_19",
        "NSFW_Snapchat",
        "SheLikesItRough"
    ];

    const res = await getter.fetch({
        type: 'custom',
        subreddit: subreddits
    });

    let title = "";

    if (res[0].title.length > 256) {
        title = "nude";
    } else {
        title = res[0].title;
    }
    return { title, res };
}
