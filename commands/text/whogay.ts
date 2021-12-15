import { CacheType, CommandInteraction, Message, MessageEmbed, WebhookClient } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Text',
    description: 'Find the gay user.',

    slash: 'both',

    callback: async ({ message, interaction, guild }) => {
        const webhook = new WebhookClient({ url: process.env.COMMANDS_URL! })
        const embed = new MessageEmbed()
            .setTitle(`whogay in ${guild?.name}`)
            .setColor('GREEN')
        await webhook.send({embeds: [embed]})

        let randomUser
        let randomCrush

        return whogay(interaction, message, randomUser, randomCrush)
    }
} as ICommand

function whogay(interaction: CommandInteraction<CacheType>, message: Message<boolean>, randomUser: undefined, randomCrush: undefined) {
    if (!interaction) {
        ({ randomUser, randomCrush } = getRandomUserMessage(randomUser, message, randomCrush))
        return createEmbed(randomUser, randomCrush)

    } else {
        ({ randomUser, randomCrush } = getRandomUserInteraction(randomUser, interaction, randomCrush))
        return createEmbed(randomUser, randomCrush)
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
