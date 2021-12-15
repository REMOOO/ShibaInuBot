import { MessageEmbed, WebhookClient } from "discord.js";
import { ICommand } from "wokcommands";
const fetch = require('axios')

export default {
    category: 'Cryptocurrency',
    description: "Compare Shiba Inu coin to dollars.",
    aliases: ['shibacoin', 'shib'],

    slash: 'both',

    callback: async ({ guild }) => {
        const webhook = new WebhookClient({ url: process.env.COMMANDS_URL! })
        const embed = new MessageEmbed()
            .setTitle(`shibainucoin in ${guild?.name}`)
            .setColor('GREEN')
        await webhook.send({embeds: [embed]})

        return shibainucoin()
    }
} as ICommand

async function shibainucoin() {
    let res
    let res2

    try {
        res = await fetch(`https://min-api.cryptocompare.com/data/price?fsym=SHIB&tsyms=USD`)
        res2 = await fetch(`https://min-api.cryptocompare.com/data/price?fsym=USD&tsyms=SHIB`)
    } catch (err) {
        return "Error"
    }

    const data = res.data
    const data2 = res2.data

    const shibacoin = data2.SHIB.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

    try {
        return createEmbed(data, shibacoin);
    } catch (err) {
        return "Shiba Inu coin error. Please report this in the support server if you want this to be fixed :)."
    }
}

function createEmbed(data: any, shibacoin: any) {
    const embed = new MessageEmbed()
        .setTitle(`Shiba Inu coin currency`)
        .setDescription(`1 Shiba Inu coin = ${data.USD} dollars\n\n1 dollar = ${shibacoin} Shiba Inu coins`)
        .setColor("RANDOM");
    return embed;
}
