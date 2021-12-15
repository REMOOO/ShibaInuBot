import { CacheType, CommandInteraction, Message, MessageEmbed, WebhookClient } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Text',
    description: 'Find the furry user.',

    slash: 'both',

    callback: async ({ message, interaction, guild }) => {
        const webhook = new WebhookClient({ url: process.env.COMMANDS_URL! })
        const embed = new MessageEmbed()
            .setTitle(`whofurry in ${guild?.name}`)
            .setColor('GREEN')
        await webhook.send({embeds: [embed]})

        let randomUser
        let randomFurryHater
        return whofurry(interaction, message, randomUser, randomFurryHater)
    }
} as ICommand

function whofurry(interaction: CommandInteraction<CacheType>, message: Message<boolean>, randomUser: undefined, randomFurryHater: undefined) {
    if (!interaction) {
        ({ randomUser, randomFurryHater } = getRandomUserMessage(randomUser, message, randomFurryHater));
        return createEmbed(randomUser, randomFurryHater)

    } else {
        ({ randomUser, randomFurryHater } = getRandomUserInteraction(randomUser, interaction, randomFurryHater));
        return createEmbed(randomUser, randomFurryHater)

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
