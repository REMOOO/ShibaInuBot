import { CacheType, CommandInteraction, Message, MessageEmbed, WebhookClient } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Text',
    description: 'Find the sus user.',

    slash: 'both',

    callback: async ({ guild, message, interaction }) => {
        const webhook = new WebhookClient({ url: process.env.COMMANDS_URL! })
        const embed = new MessageEmbed()
            .setTitle(`whosus in ${guild?.name}`)
            .setColor('GREEN')
        await webhook.send({embeds: [embed]})

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
