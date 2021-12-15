import { MessageEmbed, WebhookClient } from "discord.js";
import { ICommand } from "wokcommands";
const fetch = require('axios')

export default {
    category: 'Cryptocurrency',
    description: "Compare Bitcoin to dollars.",
    aliases: ['btc'],

    slash: 'both',

    callback: async ({ guild }) => {
        const webhook = new WebhookClient({ url: process.env.COMMANDS_URL! })
        const embed = new MessageEmbed()
            .setTitle(`bitcoin in ${guild?.name}`)
            .setColor('GREEN')
        await webhook.send({embeds: [embed]})

        return bitcoin()
    }
} as ICommand

async function bitcoin() {
    let res
    let res2

    try {
        res = await fetch(`https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD`)
        res2 = await fetch(`https://min-api.cryptocompare.com/data/price?fsym=USD&tsyms=BTC`)
    } catch (err) {
        return "Error"
    }

    const data = res.data
    const data2 = res2.data

    const usd = data.USD.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

    try {
        return createEmbed(data2, usd);
    } catch (err) {
        return "Bitcoin error. Please report this in the support server if you want this to be fixed :)."
    }
}

function createEmbed(data2: any, usd: any) {
    const embed = new MessageEmbed()
        .setTitle(`Bitcoin currency`)
        .setDescription(`1 Bitcoin = ${usd} dollars\n\n1 dollar = ${data2.BTC} Bitcoins`)
        .setColor("RANDOM");
    return embed;
}
