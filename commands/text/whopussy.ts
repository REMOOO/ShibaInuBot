import { CacheType, CommandInteraction, Message, MessageEmbed, WebhookClient } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Text',
    description: 'Find the biggest pussy.',

    slash: 'both',

    callback: async ({ guild, message, interaction }) => {
        const webhook = new WebhookClient({ url: process.env.COMMANDS_URL! })
        const embed = new MessageEmbed()
            .setTitle(`whopussy in ${guild?.name}`)
            .setColor('GREEN')
        await webhook.send({embeds: [embed]})

        let randomUser
        let randomGetsNoPussy
        return whopussy(interaction, message, randomUser, randomGetsNoPussy)
    }
} as ICommand

function whopussy(interaction: CommandInteraction<CacheType>, message: Message<boolean>, randomUser: undefined, randomGetsNoPussy: undefined) {
    if (!interaction) {
            ({ randomUser, randomGetsNoPussy } = getRandomUserMessage(randomUser, message, randomGetsNoPussy))
            return createEmbed(randomUser, randomGetsNoPussy)
    } else {
            ({ randomUser, randomGetsNoPussy } = getRandomUserInteraction(randomUser, interaction, randomGetsNoPussy));
            return createEmbed(randomUser, randomGetsNoPussy)
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
