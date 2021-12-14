import { ICommand } from "wokcommands";
import { CacheType, CommandInteraction, Message, MessageEmbed, TextChannel } from "discord.js";
const getter = require("reddit-image-fetcher")

export default {
    category: 'Image',
    description: 'Get a random picture.',
    aliases : ['pic'],

    slash: 'both',

    callback: async ({ interaction, channel, message}) => {
        console.log(`picture`)

        var { title, res } = await getImageFromReddit();

        return picture(interaction, channel, message, title, res)
    }
} as ICommand

function picture(interaction: CommandInteraction<CacheType>, channel: TextChannel, message: Message<boolean>, title: string, res: any) {
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

function botHasPermissionsInteraction(channel: TextChannel, interaction: CommandInteraction<CacheType>) {
    return channel.permissionsFor(interaction.guild?.me!).has("SEND_MESSAGES");
}

function botHasPermissionsMessage(channel: TextChannel, message: Message<boolean>) {
    return channel.permissionsFor(message.guild?.me!).has("SEND_MESSAGES");
}