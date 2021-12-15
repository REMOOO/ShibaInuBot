import { TextChannel, CommandInteraction, CacheType, Message, MessageEmbed, User, WebhookClient } from "discord.js";
import { ICommand } from "wokcommands";
import crypto from '../../model/cryptocurrency'
const fetch = require('axios')

export default {
    category: 'Cryptocurrency',
    description: "Buy Bitcoins for dollars.",
    aliases: ['buybtc'],

    slash: 'both',

    minArgs: 1,
    maxArgs: 1,
    expectedArgs: '<dollars>',
    expectedArgsTypes: ['NUMBER'],

    callback: async ({ args, interaction, message, guild }) => {
        const webhook = new WebhookClient({ url: process.env.COMMANDS_URL! })
        const embed = new MessageEmbed()
            .setTitle(`buybitcoin ${args[0]} in ${guild?.name}`)
            .setColor('GREEN')
        await webhook.send({embeds: [embed]})

        const dollars = Number(args[0])

        return buybitcoin(dollars, message, interaction)
    }
} as ICommand

async function buybitcoin(dollars: number, message: Message<boolean>, interaction: CommandInteraction<CacheType>) {
    let user = message?.author
    if (!user) user = interaction?.user

    let res
    let db

    try {
        res = await fetch(`https://min-api.cryptocompare.com/data/price?fsym=USD&tsyms=BTC`)
        db = await crypto.findOne({ userId: user.id })
        if (!db) db = await crypto.create({ userId: user.id })
    } catch (err) {
        console.log(err)
        return "Error"
    }

    const btc = res.data.BTC
    const bitcoins = dollars * btc

    if (db.dollars >= dollars && dollars > 0) {
        db.dollars -= dollars
        db.bitCoins += bitcoins
        db.save()
    } else {
        return "Dollars invalid."
    }

    try {
        return createEmbed(db, bitcoins, dollars);
    } catch (err) {
        console.log(err)
        return "Buybitcoin error. Please report this in the support server if you want this to be fixed :)."
    }
}

async function createEmbed(db: any, bitcoins: number, dollars: number) {
    const dollar = await checkComma(db.dollars)
    const shibacoin = await checkComma(db.shibaInuCoins)
    const bitcoin = await checkComma(db.bitCoins)
    const bitcoinsComma = await checkComma(bitcoins)
    const dollarsComma = await checkComma(dollars)

    const embed = new MessageEmbed()
        .setTitle(`You bought ${bitcoinsComma} BTC for $${dollarsComma}`)
        .setDescription(`\n**__You now have__**\n**Dollars:** $${dollar}\n**Shiba Inu coins:** ${shibacoin} SHIB\n**Bitcoins:** ${bitcoin} BTC`)
        .setColor("RANDOM");
    return embed;
}

function checkComma(coin: any) {
    if (coin.toString().substr(0, 2) === "0.") {
        return coin
    } else {
        return coin.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}
