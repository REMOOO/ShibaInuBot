import { TextChannel, CommandInteraction, CacheType, Message, MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";
import crypto from '../../model/cryptocurrency'
const ms = require('parse-ms-js');
const Topgg = require(`@top-gg/sdk`)
const api = new Topgg.Api(process.env.TOPGG)

export default {
    category: 'Cryptocurrency',
    description: "Claim your daily gift in dollars.",

    slash: 'both',

    callback: async ({ interaction, channel, message }) => {

        if (!interaction) {
            if (botHasPermissionsMessage(channel, message)) {
                return daily(message, interaction)
            }
        } else {
            if (botHasPermissionsInteraction(channel, interaction)) {
                return daily(message, interaction)
            }
        }
    }
} as ICommand

async function daily(message: Message<boolean>, interaction: CommandInteraction<CacheType>) {
    let user = message?.author
    if (!user) user = interaction?.user

    const voted = await api.hasVoted(user.id)

    if (!voted) {
        const embed = new MessageEmbed()
            .setTitle("You have not voted yet for a daily reward.")
            .setDescription("**[Vote here for a daily reward!](https://top.gg/bot/914195557529047120/vote)**")
        return embed
    }

    let db

    try {
        db = await crypto.findOne({ userId: user.id })
        if (!db) db = await crypto.create({ userId: user.id })
    } catch (err) {
        console.log(err)
        return "Error"
    }

    let timeout = 86400000
    let randomAmount = Math.floor(Math.random() * 4000) + 1000

    if (timeout - (Date.now() - db.daily) > 0) {
        let timeleft = ms(timeout - (Date.now() - db.daily))
        return `You already claimed your daily gift.\nTry again after ${timeleft.hours} hours, ${timeleft.minutes} minutes and ${timeleft.seconds} seconds`
    }

    db.daily = Date.now()
    db.dollars += randomAmount
    await db.save()

    try {
        return createEmbed(db, randomAmount);
    } catch (err) {
        console.log(err)
        return "Daily error. Please report this in the support server if you want this to be fixed :)."
    }
}

async function createEmbed(db: any, randomAmount: number) {
    const dollar = await checkComma(db.dollars)
    const shibacoin = await checkComma(db.shibaInuCoins)
    const bitcoin = await checkComma(db.bitCoins)

    const embed = new MessageEmbed()
        .setTitle(`You successfully claimed your daily gift: $${randomAmount}. Invest with it!`)
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

function botHasPermissionsInteraction(channel: TextChannel, interaction: CommandInteraction<CacheType>) {
    return channel.permissionsFor(interaction.guild?.me!).has("SEND_MESSAGES");
}

function botHasPermissionsMessage(channel: TextChannel, message: Message<boolean>) {
    return channel.permissionsFor(message.guild?.me!).has("SEND_MESSAGES");
}