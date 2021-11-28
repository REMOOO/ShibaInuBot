import { ICommand } from "wokcommands"

export default {
    category: 'Text',
    description: 'Adds two numbers together',

    slash: 'both',

    expectedArgs: '<number1> <number2>',
    minArgs: 2,
    maxArgs: 2,

    callback: ({ args }) => {
        const number1 = parseInt(args[0])
        const number2 = parseInt(args[1])

        const sum = number1 + number2;

        return `${number1} + ${number2} = ${sum}`
    },
} as ICommand
