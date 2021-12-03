import { CacheType, CommandInteraction, GuildMember, Message, MessageEmbed, TextChannel } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Text',
    description: 'Find the gay user.',

    slash: 'both',

    callback: ({ message, interaction, channel }) => {
        let randomUser
        let randomCrush

        return whogay(interaction, channel, message, randomUser, randomCrush)
    }
} as ICommand

function whogay(interaction: CommandInteraction<CacheType>, channel: TextChannel, message: Message<boolean>, randomUser: undefined, randomCrush: undefined) {
    if (!interaction) {
        if (botHasPermissionsMessage(channel, message)) {
            ({ randomUser, randomCrush } = getRandomUserMessage(randomUser, message, randomCrush))
            return createEmbed(randomUser, randomCrush)
        }
    } else {
        if (botHasPermissionsInteraction(channel, interaction)) {
            ({ randomUser, randomCrush } = getRandomUserInteraction(randomUser, interaction, randomCrush))
            return createEmbed(randomUser, randomCrush)
        }
    }
}

function createEmbed(randomUser: any, randomCrush: any) {
    const embed = new MessageEmbed()
        .setTitle(`${randomUser.username} is gay 🌈`)
        .setDescription(`And has a crush on ${randomCrush.username} 👀`)
        .setThumbnail(randomUser.displayAvatarURL({ dynamic: true, size: 4096 }));
    return embed;
}

function getRandomUserInteraction(randomUser: any, interaction: CommandInteraction<CacheType>, randomCrush: any) {
    randomUser = interaction.guild?.members.cache.random()?.user!;
    randomCrush = interaction.guild?.members.cache.random()?.user!;

    while (randomUser.bot === true) {
        randomUser = interaction.guild?.members.cache.random()?.user!;
    }

    while (randomCrush === randomUser) {
        randomCrush = interaction.guild?.members.cache.random()?.user!;
    }
    return { randomUser, randomCrush };
}

function getRandomUserMessage(randomUser: any, message: Message<boolean>, randomCrush: any) {
    randomUser = message.guild?.members.cache.random()?.user!;
    randomCrush = message.guild?.members.cache.random()?.user!;

    while (randomUser.bot === true) {
        randomUser = message.guild?.members.cache.random()?.user!;
    }

    while (randomCrush === randomUser) {
        randomCrush = message.guild?.members.cache.random()?.user!;
    }
    return { randomUser, randomCrush };
}

function botHasPermissionsInteraction(channel: TextChannel, interaction: CommandInteraction<CacheType>) {
    return channel.permissionsFor(interaction.guild?.me!).has("SEND_MESSAGES");
}

function botHasPermissionsMessage(channel: TextChannel, message: Message<boolean>) {
    return channel.permissionsFor(message.guild?.me!).has("SEND_MESSAGES");
}
