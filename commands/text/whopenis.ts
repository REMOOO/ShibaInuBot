import { CacheType, CommandInteraction, Message, MessageEmbed, TextChannel } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Text',
    description: 'Find the user with the biggest penis.',
    aliases: ['whopp', 'whopeepee', 'whodick'],

    slash: 'both',

    callback: ({ message, interaction, channel }) => {
        console.log(`whopenis`)

        let randomUser
        let randomSmallPenisUser
        return whopenis(interaction, channel, message, randomUser, randomSmallPenisUser)
    }
} as ICommand

function whopenis(interaction: CommandInteraction<CacheType>, channel: TextChannel, message: Message<boolean>, randomUser: undefined, randomSmallPenisUser: undefined) {
    if (!interaction) {
        if (botHasPermissionsMessage(channel, message)) {
            ({ randomUser, randomSmallPenisUser } = getRandomUserMessage(randomUser, message, randomSmallPenisUser))
            return createEmbed(randomUser, randomSmallPenisUser)
        }
    } else {
        if (botHasPermissionsInteraction(channel, interaction)) {
            ({ randomUser, randomSmallPenisUser } = getRandomUserInteraction(randomUser, interaction, randomSmallPenisUser));
            return createEmbed(randomUser, randomSmallPenisUser)
        }
    }
}
function createEmbed(randomUser: any, randomSmallPenisUser: any) {
    const embed = new MessageEmbed()
        .setTitle(`${randomUser.username} has the biggest penis 😩`)
        .setDescription(`${randomSmallPenisUser.username} has the smallest penis 🤏`)
        .setThumbnail(randomUser.displayAvatarURL({ dynamic: true, size: 4096 }));
    return embed;
}

function getRandomUserInteraction(randomUser: any, interaction: CommandInteraction<CacheType>, randomSmallPenisUser: any) {
    randomUser = interaction.guild?.members.cache.random()?.user!;
    randomSmallPenisUser = interaction.guild?.members.cache.random()?.user!;

    while (randomUser.bot === true) {
        randomUser = interaction.guild?.members.cache.random()?.user!;
    }

    while (randomSmallPenisUser === randomUser) {
        randomSmallPenisUser = interaction.guild?.members.cache.random()?.user!;
    }
    return { randomUser, randomSmallPenisUser };
}

function getRandomUserMessage(randomUser: any, message: Message<boolean>, randomSmallPenisUser: any) {
    randomUser = message.guild?.members.cache.random()?.user!;
    randomSmallPenisUser = message.guild?.members.cache.random()?.user!;

    while (randomUser.bot === true) {
        randomUser = message.guild?.members.cache.random()?.user!;
    }

    while (randomSmallPenisUser === randomUser) {
        randomSmallPenisUser = message.guild?.members.cache.random()?.user!;
    }
    return { randomUser, randomSmallPenisUser };
}

function botHasPermissionsInteraction(channel: TextChannel, interaction: CommandInteraction<CacheType>) {
    return channel.permissionsFor(interaction.guild?.me!).has("SEND_MESSAGES");
}

function botHasPermissionsMessage(channel: TextChannel, message: Message<boolean>) {
    return channel.permissionsFor(message.guild?.me!).has("SEND_MESSAGES");
}

