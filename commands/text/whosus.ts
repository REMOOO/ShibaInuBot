import { CacheType, CommandInteraction, Message, MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Text',
    description: 'Find the sus user.',

    slash: 'both',

    callback: ({ guild, message, interaction }) => {
        console.log(`whosus in ${guild?.name}`)

        let randomUser
        return whosus(interaction, message, randomUser)
    }
} as ICommand

function whosus(interaction: CommandInteraction<CacheType>, message: Message<boolean>, randomUser: undefined) {
    if (!interaction) {
            ({ randomUser } = getRandomUserMessage(randomUser, message))
            return createEmbed(randomUser)
    } else {
            ({ randomUser } = getRandomUserInteraction(randomUser, interaction));
            return createEmbed(randomUser)
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
