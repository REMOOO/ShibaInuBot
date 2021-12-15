import { TextChannel, CommandInteraction, CacheType, Message, MessageEmbed, Guild, WebhookClient } from "discord.js";
import { ICommand } from "wokcommands";
import crypto from '../../model/cryptocurrency'

export default {
    category: 'Cryptocurrency',
    description: "Get the richest users.",

    slash: 'both',

    callback: async ({ guild, interaction, channel, message }) => {
        const webhook = new WebhookClient({ url: process.env.COMMANDS_URL! })
        const embed = new MessageEmbed()
            .setTitle(`rich in ${guild?.name}`)
            .setColor('GREEN')
        await webhook.send({embeds: [embed]})

        return rich(message, interaction, guild, channel)

    }
} as ICommand

async function rich(message: Message<boolean>, interaction: CommandInteraction<CacheType>, guild: Guild | null, channel: TextChannel) {
    let user = message?.author
    if (!user) user = interaction?.user

    try {
        const dollarEmbed = await createDollarEmbed(guild);
        const shibEmbed = await createShibEmbed(guild)
        const btcEmbed = await createBtcEmbed(guild)

        channel.send({
            embeds: [dollarEmbed, shibEmbed, btcEmbed]
        })

    } catch (err) {
        console.log(err)
        return "Error"
    }
}

async function createBtcEmbed(guild: Guild | null) {
    let btcdb = await crypto.find({}).sort({ bitCoins: "desc" });
    let richestInBtc = "";
    let lastUser = "";

    for (let i = 0; i < 5; i++) {
        if (!btcdb[i]) {
            i++;
        }
        else if (guild?.members.cache.has(btcdb[i].userId)) {
            richestInBtc += `${i + 1}. **${btcdb[i].bitCoins} BTC** - <@${btcdb[i].userId}>\n`;
        } else {
            if (lastUser = btcdb[i].userId) {
                i++;
            } else {
                lastUser = btcdb[i].userId;
                i--;
            }
        }
    }

    const btcEmbed = new MessageEmbed()
        .setTitle("Richest users in Bitcoins")
        .setDescription(richestInBtc)
        .setColor("RANDOM");
    return btcEmbed;
}

async function createShibEmbed(guild: Guild | null) {
    let shibdb = await crypto.find({}).sort({ shibaInuCoins: "desc" });
    let richestInShib = "";
    let lastUser = "";

    for (let i = 0; i < 5; i++) {
        if (!shibdb[i]) {
            i++;
        }
        else if (guild?.members.cache.has(shibdb[i].userId)) {
            richestInShib += `${i + 1}. **${await checkComma(shibdb[i].shibaInuCoins)} SHIB** - <@${shibdb[i].userId}>\n`;
        } else {
            if (lastUser = shibdb[i].userId) {
                i++;
            } else {
                lastUser = shibdb[i].userId;
                i--;
            }
        }
    }

    const shibEmbed = new MessageEmbed()
        .setTitle("Richest users in Shiba Inu coins")
        .setDescription(richestInShib)
        .setColor("RANDOM");
    return shibEmbed;
}

async function createDollarEmbed(guild: Guild | null) {
    let dollardb = await crypto.find({}).sort({ dollars: "desc" });
    let richestInDollars = "";
    let lastUser = "";

    for (let i = 0; i < 5; i++) {
        if (!dollardb[i]) {
            i++;
        }
        else if (guild?.members.cache.has(dollardb[i].userId)) {
            richestInDollars += `${i + 1}. **$${await checkComma(dollardb[i].dollars.toFixed(2))}** - <@${dollardb[i].userId}>\n`;
        } else {
            if (lastUser = dollardb[i].userId) {
                i++;
            } else {
                lastUser = dollardb[i].userId;
                i--;
            }
        }
    }

    const dollarEmbed = new MessageEmbed()
        .setTitle("Richest users in dollars")
        .setDescription(richestInDollars)
        .setColor("RANDOM");
    return dollarEmbed;
}

function checkComma(coin: any) {
    if (coin.toString().substr(0,2) === "0.") {
        return coin
    } else {
        return coin.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}
