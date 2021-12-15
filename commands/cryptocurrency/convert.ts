import { MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";
const fetch = require('axios')

export default {
    category: 'Cryptocurrency',
    description: "Convert currency to another. Example: SHIB to USD",

    slash: 'both',

    expectedArgs: '<currency1> <currency2>',
    minArgs: 2,
    maxArgs: 2,

    callback: async ({ args, guild }) => {
        console.log(`convert ${args[0]} ${args[1]} in ${guild?.name}`)

        return convert(args)
    }
} as ICommand

async function convert(args: string[]) {
    const currency1 = args[0]
    const currency2 = args[1]
    let res

    try {
        res = await fetch(`https://min-api.cryptocompare.com/data/price?fsym=${currency1}&tsyms=${currency2}`)
    } catch (err) {
        return "Currency doesn't exist"
    }

    const data = res.data

    const coin = checkComma(data)

    try {
        return createEmbed(data, coin, currency1, currency2);
    } catch (err) {
        return "Shiba Inu coin error. Please report this in the support server if you want this to be fixed :)."
    }
}

function checkComma(data: any) {
    if (data[Object.keys(data)[0]].toString().substr(0, 2) === "0.") {
        return data[Object.keys(data)[0]]
    } else {
        return data[Object.keys(data)[0]].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}

function createEmbed(data: any, coin: any, currency1: string, currency2: string) {
    const embed = new MessageEmbed()
        .setTitle(`${currency1} to ${currency2}`)
        .setDescription(`1 ${currency1} = ${coin} ${currency2}`)
        .setColor("RANDOM");
    return embed;
}
