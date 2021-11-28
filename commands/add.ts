import { MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands"

export default {
    category: 'Text',
    description: 'Adds two numbers together',

    permissions: ['ADMINISTRATOR'],

    slash: 'both',

    expectedArgs: '<number1> <number2>',
    minArgs: 2,
    maxArgs: 2,

    callback: ({ args }) => {
        const number1 = parseInt(args[0])
        const number2 = parseInt(args[1])

        const sum = number1 + number2;

        const embed = new MessageEmbed()
            .setTitle(`${number1} + ${number2} = ${sum}`)

        return embed
    },
} as ICommand
