import { CacheType, CommandInteraction, Message, MessageEmbed, TextChannel } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Text',
    description: 'Sends an embed with a random color. Split title & description with comma (,).',

    permissions: ['ADMINISTRATOR'],

    slash: 'both',

    minArgs: 1,
    expectedArgs: '<title> [description]',
    expectedArgsTypes: ['STRING', 'STRING'],

    callback: async ({ message, interaction, channel, args, guild }) => {
        console.log(`embed ${args[0]} ${args[1]} in ${guild?.name}`)

        await embed(interaction, channel, message, args);
    }

} as ICommand

async function embed(interaction: CommandInteraction<CacheType>, channel: TextChannel, message: Message<boolean>, args: string[]) {
    if (!interaction) {
        await createEmbedMessage(message);

    } else {
        createEmbedInteraction(args, channel);

    }
}

function createEmbedInteraction(args: string[], channel: TextChannel) {
    const title = args[0];
    const description = args[1];
    let json;

    if (description === undefined) {
        json = JSON.parse(`{"title":"${title}"}`);
    } else {
        json = JSON.parse(`{"title":"${title}","description":"${description}"}`);
    }

    const embed = new MessageEmbed(json).setColor("RANDOM");

    channel.send({
        embeds: [embed]
    });
}

async function createEmbedMessage(message: Message<boolean>) {
    await message.delete();
    const title = message.content.slice(7).split(",")[0];
    const description = message.content.split(",")[1];
    let json;

    if (description === undefined) {
        json = JSON.parse(`{"title":"${title}"}`);
    } else {
        json = JSON.parse(`{"title":"${title}","description":"${description}"}`);
    }

    const embed = new MessageEmbed(json).setColor("RANDOM");

    message.channel.send({
        embeds: [embed]
    });
}
