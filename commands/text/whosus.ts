import { CacheType, CommandInteraction, Message, MessageEmbed, TextChannel } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Text',
    description: 'Find the sus user.',

    slash: 'both',

    callback: ({ message, interaction, channel }) => {
        console.log(`whosus`)

        let randomUser
        return whosus(interaction, channel, message, randomUser)
    }
} as ICommand

function whosus(interaction: CommandInteraction<CacheType>, channel: TextChannel, message: Message<boolean>, randomUser: undefined) {
    if (!interaction) {
        if (botHasPermissionsMessage(channel, message)) {
            ({ randomUser } = getRandomUserMessage(randomUser, message))
            return createEmbed(randomUser)
        }
    } else {
        if (botHasPermissionsInteraction(channel, interaction)) {
            ({ randomUser } = getRandomUserInteraction(randomUser, interaction));
            return createEmbed(randomUser)
        }
    }
}
function createEmbed(randomUser: any) {
    const embed = new MessageEmbed()
        .setTitle(`${randomUser.username} is big sus ඞ🧐`)
        .setThumbnail(randomUser.displayAvatarURL({ dynamic: true, size: 4096 }));
    return embed;
}

function getRandomUserInteraction(randomUser: any, interaction: CommandInteraction<CacheType>) {
    randomUser = interaction.guild?.members.cache.random()?.user!;

    while (randomUser.bot === true) {
        randomUser = interaction.guild?.members.cache.random()?.user!;
    }
    return { randomUser };
}

function getRandomUserMessage(randomUser: any, message: Message<boolean>) {
    randomUser = message.guild?.members.cache.random()?.user!;

    while (randomUser.bot === true) {
        randomUser = message.guild?.members.cache.random()?.user!;
    }
    return { randomUser };
}

function botHasPermissionsInteraction(channel: TextChannel, interaction: CommandInteraction<CacheType>) {
    return channel.permissionsFor(interaction.guild?.me!).has("SEND_MESSAGES");
}

function botHasPermissionsMessage(channel: TextChannel, message: Message<boolean>) {
    return channel.permissionsFor(message.guild?.me!).has("SEND_MESSAGES");
}

