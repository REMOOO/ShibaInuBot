import { CacheType, CommandInteraction, GuildMember, Message, MessageEmbed, TextChannel } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Text',
    description: 'Find the furry user.',

    slash: 'both',

    callback: ({ message, interaction, channel }) => {
        let randomUser
        let randomFurryHater
        return whofurry(interaction, channel, message, randomUser, randomFurryHater)
    }
} as ICommand

function whofurry(interaction: CommandInteraction<CacheType>, channel: TextChannel, message: Message<boolean>, randomUser: undefined, randomFurryHater: undefined) {
    if (!interaction) {
        if (botHasPermissionsMessage(channel, message)) {
            ({ randomUser, randomFurryHater } = getRandomUserMessage(randomUser, message, randomFurryHater));
            return createEmbed(randomUser, randomFurryHater)
        }
    } else {
        if (botHasPermissionsInteraction(channel, interaction)) {
            ({ randomUser, randomFurryHater } = getRandomUserInteraction(randomUser, interaction, randomFurryHater));
            return createEmbed(randomUser, randomFurryHater)
        }
    }
}

function createEmbed(randomUser: any, randomFurryHater: any) {
    const embed = new MessageEmbed()
        .setTitle(`${randomUser.username} is a furry 😻`)
        .setDescription(`${randomFurryHater.username} is a furry hater 😾`)
        .setThumbnail(randomUser.displayAvatarURL({ dynamic: true, size: 4096 }));
    return embed;
}

function getRandomUserInteraction(randomUser: any, interaction: CommandInteraction<CacheType>, randomFurryHater: any) {
    randomUser = interaction.guild?.members.cache.random()?.user!;
    randomFurryHater = interaction.guild?.members.cache.random()?.user!;

    while (randomUser.bot === true) {
        randomUser = interaction.guild?.members.cache.random()?.user!;
    }

    while (randomFurryHater === randomUser) {
        randomFurryHater = interaction.guild?.members.cache.random()?.user!;
    }
    return { randomUser, randomFurryHater };
}

function getRandomUserMessage(randomUser: any, message: Message<boolean>, randomFurryHater: any) {
    randomUser = message.guild?.members.cache.random()?.user!;
    randomFurryHater = message.guild?.members.cache.random()?.user!;

    while (randomUser.bot === true) {
        randomUser = message.guild?.members.cache.random()?.user!;
    }

    while (randomFurryHater === randomUser) {
        randomFurryHater = message.guild?.members.cache.random()?.user!;
    }
    return { randomUser, randomFurryHater };
}

function botHasPermissionsInteraction(channel: TextChannel, interaction: CommandInteraction<CacheType>) {
    return channel.permissionsFor(interaction.guild?.me!).has("SEND_MESSAGES");
}

function botHasPermissionsMessage(channel: TextChannel, message: Message<boolean>) {
    return channel.permissionsFor(message.guild?.me!).has("SEND_MESSAGES");
}
