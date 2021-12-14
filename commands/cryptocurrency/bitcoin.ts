import { TextChannel, CommandInteraction, CacheType, Message, MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";
const fetch = require('axios')

export default {
    category: 'Cryptocurrency',
    description: "Compare Bitcoin to dollars.",
    aliases: ['btc'],

    slash: 'both',

    callback: async ({ interaction, channel, message }) => {
        console.log(`bitcoin`)

        if (!interaction) {
            if (botHasPermissionsMessage(channel, message)) {
                return bitcoin()
            }
        } else {
            if (botHasPermissionsInteraction(channel, interaction)) {
                return bitcoin()
            }
        }
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

function botHasPermissionsInteraction(channel: TextChannel, interaction: CommandInteraction<CacheType>) {
    return channel.permissionsFor(interaction.guild?.me!).has("SEND_MESSAGES");
}

function botHasPermissionsMessage(channel: TextChannel, message: Message<boolean>) {
    return channel.permissionsFor(message.guild?.me!).has("SEND_MESSAGES");
}