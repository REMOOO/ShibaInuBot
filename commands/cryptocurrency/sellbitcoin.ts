import { TextChannel, CommandInteraction, CacheType, Message, MessageEmbed, User } from "discord.js";
import { ICommand } from "wokcommands";
import crypto from '../../model/cryptocurrency'
const fetch = require('axios')

export default {
    category: 'Cryptocurrency',
    description: "Sell Bitcoins for dollars.",
    aliases: ['sellbtc'],

    slash: 'both',

    minArgs: 1,
    maxArgs: 1,
    expectedArgs: '<bitcoins>',
    expectedArgsTypes: ['NUMBER'],

    callback: async ({ args, interaction, channel, message }) => {
        const bitcoins = Number(args[0])

        if (!interaction) {
            if (botHasPermissionsMessage(channel, message)) {
                return sellbitcoins(bitcoins, message, interaction)
            }
        } else {
            if (botHasPermissionsInteraction(channel, interaction)) {
                return sellbitcoins(bitcoins, message, interaction)
            }
        }
    }
} as ICommand

async function sellbitcoins(bitcoins: number, message: Message<boolean>, interaction: CommandInteraction<CacheType>) {
    let user = message?.author
    if (!user) user = interaction?.user

    let res
    let db

    try {
        res = await fetch(`https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD`)
        db = await crypto.findOne({ userId: user.id })
        if (!db) db = await crypto.create({ userId: user.id })
    } catch (err) {
        console.log(err)
        return "Error"
    }

    const usd = res.data.USD
    const dollars = bitcoins * usd

    if (db.bitCoins >= bitcoins && bitcoins > 0) {
        db.bitCoins -= bitcoins
        db.dollars += dollars
        db.save()
    } else {
        return "Bitcoins invalid."
    }

    try {
        return createEmbed(db, dollars, bitcoins);
    } catch (err) {
        console.log(err)
        return "Buybitcoin error. Please report this in the support server if you want this to be fixed :)."
    }
}

async function createEmbed(db: any, dollars: number, bitcoins: number) {
    const dollar = await checkComma(db.dollars)
    const shibacoin = await checkComma(db.shibaInuCoins)
    const bitcoin = await checkComma(db.bitCoins)
    const bitcoinsComma = await checkComma(bitcoins)
    const dollarsComma = await checkComma(dollars)

    const embed = new MessageEmbed()
        .setTitle(`You sold ${bitcoinsComma} BTC for $${dollarsComma}`)
        .setDescription(`\n**__You now have__**\n**Dollars:** $${dollar}\n**Shiba Inu coins:** ${shibacoin} SHIB\n**Bitcoins:** ${bitcoin} BTC`)
        .setColor("RANDOM");
    return embed;
}

function checkComma(coin: any) {
    if (coin.toString().substr(0,2) === "0.") {
        return coin
    } else {
        return coin.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}

function botHasPermissionsInteraction(channel: TextChannel, interaction: CommandInteraction<CacheType>) {
    return channel.permissionsFor(interaction.guild?.me!).has("SEND_MESSAGES");
}

function botHasPermissionsMessage(channel: TextChannel, message: Message<boolean>) {
    return channel.permissionsFor(message.guild?.me!).has("SEND_MESSAGES");
}