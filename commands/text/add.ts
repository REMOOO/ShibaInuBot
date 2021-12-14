import { CacheType, CommandInteraction, Message, MessageEmbed, TextChannel } from "discord.js";
import { ICommand } from "wokcommands"

export default {
    category: 'Text',
    description: 'Adds two numbers together.',

    slash: 'both',

    expectedArgs: '<number1> <number2>',
    minArgs: 2,
    maxArgs: 2,

    callback: ({ args, interaction, channel, message }) => {
        console.log(`add`)

        const number1 = parseInt(args[0])
        const number2 = parseInt(args[1])

        const sum = number1 + number2;

        return add(interaction, channel, message, number1, number2, sum)
    },
} as ICommand

function add(interaction: CommandInteraction<CacheType>, channel: TextChannel, message: Message<boolean>, number1: number, number2: number, sum: number) {
    if (!interaction) {
        if (botHasPermissionsMessage(channel, message)) {
            return createEmbed(number1, number2, sum)
        }
    } else {
        if (botHasPermissionsInteraction(channel, interaction)) {
            return createEmbed(number1, number2, sum)
        }
    }
}

function createEmbed(number1: number, number2: number, sum: number) {
    const embed = new MessageEmbed()
        .setTitle(`${number1} + ${number2} = ${sum}`);

    return embed;
}

function botHasPermissionsInteraction(channel: TextChannel, interaction: CommandInteraction<CacheType>) {
    return channel.permissionsFor(interaction.guild?.me!).has("SEND_MESSAGES");
}

function botHasPermissionsMessage(channel: TextChannel, message: Message<boolean>) {
    return channel.permissionsFor(message.guild?.me!).has("SEND_MESSAGES");
}

