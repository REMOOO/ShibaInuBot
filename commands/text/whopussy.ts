import { CacheType, CommandInteraction, Message, MessageEmbed, TextChannel } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Text',
    description: 'Find the biggest pussy.',

    slash: 'both',

    callback: ({ message, interaction, channel }) => {
        console.log(`whopussy`)

        let randomUser
        let randomGetsNoPussy
        return whopussy(interaction, channel, message, randomUser, randomGetsNoPussy)
    }
} as ICommand

function whopussy(interaction: CommandInteraction<CacheType>, channel: TextChannel, message: Message<boolean>, randomUser: undefined, randomGetsNoPussy: undefined) {
    if (!interaction) {
        if (botHasPermissionsMessage(channel, message)) {
            ({ randomUser, randomGetsNoPussy } = getRandomUserMessage(randomUser, message, randomGetsNoPussy))
            return createEmbed(randomUser, randomGetsNoPussy)
        }
    } else {
        if (botHasPermissionsInteraction(channel, interaction)) {
            ({ randomUser, randomGetsNoPussy } = getRandomUserInteraction(randomUser, interaction, randomGetsNoPussy));
            return createEmbed(randomUser, randomGetsNoPussy)
        }
    }
}
function createEmbed(randomUser: any, randomGetsNoPussy: any) {
    const embed = new MessageEmbed()
        .setTitle(`${randomUser.username} is the biggest pussy 😸`)
        .setDescription(`${randomGetsNoPussy.username} is the one who gets no pussy tho 💀`)
        .setThumbnail(randomUser.displayAvatarURL({ dynamic: true, size: 4096 }));
    return embed;
}

function getRandomUserInteraction(randomUser: any, interaction: CommandInteraction<CacheType>, randomGetsNoPussy: any) {
    randomUser = interaction.guild?.members.cache.random()?.user!;
    randomGetsNoPussy = interaction.guild?.members.cache.random()?.user!;

    while (randomUser.bot === true) {
        randomUser = interaction.guild?.members.cache.random()?.user!;
    }

    while (randomGetsNoPussy === randomUser) {
        randomGetsNoPussy = interaction.guild?.members.cache.random()?.user!;
    }
    return { randomUser, randomGetsNoPussy };
}

function getRandomUserMessage(randomUser: any, message: Message<boolean>, randomGetsNoPussy: any) {
    randomUser = message.guild?.members.cache.random()?.user!;
    randomGetsNoPussy = message.guild?.members.cache.random()?.user!;

    while (randomUser.bot === true) {
        randomUser = message.guild?.members.cache.random()?.user!;
    }

    while (randomGetsNoPussy === randomUser) {
        randomGetsNoPussy = message.guild?.members.cache.random()?.user!;
    }
    return { randomUser, randomGetsNoPussy };
}

function botHasPermissionsInteraction(channel: TextChannel, interaction: CommandInteraction<CacheType>) {
    return channel.permissionsFor(interaction.guild?.me!).has("SEND_MESSAGES");
}

function botHasPermissionsMessage(channel: TextChannel, message: Message<boolean>) {
    return channel.permissionsFor(message.guild?.me!).has("SEND_MESSAGES");
}

