import { MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands"

export default {
    category: 'Text',
    description: 'Adds two numbers together.',

    slash: 'both',

    expectedArgs: '<number1> <number2>',
    minArgs: 2,
    maxArgs: 2,

    callback: ({ args, guild }) => {
        console.log(`add ${args[0]} ${args[1]} in ${guild?.name}`)

        const number1 = parseInt(args[0])
        const number2 = parseInt(args[1])

        const sum = number1 + number2;

        return add(number1, number2, sum)
    },
} as ICommand

function add(number1: number, number2: number, sum: number) {
    return createEmbed(number1, number2, sum)
}

function createEmbed(number1: number, number2: number, sum: number) {
    const embed = new MessageEmbed()
        .setTitle(`${number1} + ${number2} = ${sum}`);

    return embed;
}
