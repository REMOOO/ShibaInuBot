import { ICommand } from "wokcommands";
import { CacheType, CommandInteraction, Message, MessageEmbed, TextChannel } from "discord.js";
const getter = require("reddit-image-fetcher")

export default {
    category: 'Image',
    description: 'Get an image of a cute bunny.',

    slash: 'both',

    callback: async ({ message, interaction, channel}) => {
        var { title, res } = await getImageFromReddit();

        return bunny(interaction, channel, message, title, res)
    }
} as ICommand

function bunny(interaction: CommandInteraction<CacheType>, channel: TextChannel, message: Message<boolean>, title: string, res: any) {
    if (!interaction) {
        if (botHasPermissionsMessage(channel, message)) {
            return createEmbed(title, res)
        }
    } else {
        if (botHasPermissionsInteraction(channel, interaction)) {
            return createEmbed(title, res)
        }
    }
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

function botHasPermissionsInteraction(channel: TextChannel, interaction: CommandInteraction<CacheType>) {
    return channel.permissionsFor(interaction.guild?.me!).has("SEND_MESSAGES");
}

function botHasPermissionsMessage(channel: TextChannel, message: Message<boolean>) {
    return channel.permissionsFor(message.guild?.me!).has("SEND_MESSAGES");
}