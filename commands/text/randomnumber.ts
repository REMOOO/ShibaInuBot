import { TextChannel, CommandInteraction, CacheType, Message, MessageEmbed, User } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Text',
    description: "Get a random number in an inclusive interval.",

    slash: 'both',

    minArgs: 2,
    maxArgs: 2,
    expectedArgs: '<min> <max>',
    expectedArgsTypes: ['INTEGER', 'INTEGER'],

    callback: async ({ args, interaction, channel, message }) => {
        const min = parseInt(args[0])
        const max = parseInt(args[1])

        if (!interaction) {
            if (botHasPermissionsMessage(channel, message)) {
                return randomnumber(min, max, message, interaction)
            }
        } else {
            if (botHasPermissionsInteraction(channel, interaction)) {
                return randomnumber(min, max, message, interaction)
            }
        }
    }
} as ICommand

async function randomnumber(min: number, max: number, message: Message<boolean>, interaction: CommandInteraction<CacheType>) {
    let user = message?.author
    if (!user) user = interaction?.user

    if (max < min) {
        return "The max number should be higher than the min number... Obviously."
    }

    const random = getRandomInt(min, max)

    try {
        return createEmbed(min, max, random);
    } catch (err) {
        console.log(err)
        return "Randomnumber error. Please report this in the support server if you want this to be fixed :)."
    }
}

function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function createEmbed(min: number, max: number, random: number) {
    const embed = new MessageEmbed()
        .setTitle(`A random number between ${min} and ${max}:`)
        .setDescription(`${random}`)
        .setColor("RANDOM");
    return embed;
}

function botHasPermissionsInteraction(channel: TextChannel, interaction: CommandInteraction<CacheType>) {
    return channel.permissionsFor(interaction.guild?.me!).has("SEND_MESSAGES");
}

function botHasPermissionsMessage(channel: TextChannel, message: Message<boolean>) {
    return channel.permissionsFor(message.guild?.me!).has("SEND_MESSAGES");
}