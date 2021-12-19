import { CacheType, CommandInteraction, Guild, MessageEmbed, User, WebhookClient } from "discord.js";
import { ICommand } from "wokcommands";
import crypto from '../../model/cryptocurrency'
const fetch = require('axios')
const ms = require('parse-ms-js');
const Topgg = require(`@top-gg/sdk`)
const api = new Topgg.Api(process.env.TOPGG)

export default {
    category: 'Cryptocurrency',
    description: 'Run your simulation crypto business here.',

    slash: true,

    options: [
        {
            type: 'SUB_COMMAND',
            name: 'balance',
            description: 'Get the balance of a user.',
            options: [
                {
                    name: 'user',
                    type: 'USER',
                    description: 'A user in the server.'
                }
            ]
        },
        {
            type: 'SUB_COMMAND',
            name: 'bitcoin',
            description: 'Compare Bitcoin to dollars.'
        },
        {
            type: 'SUB_COMMAND',
            name: 'buybitcoin',
            description: 'Buy Bitcoins for dollars.',
            options: [
                {
                    name: 'dollars',
                    type: 'NUMBER',
                    description: 'Define how many dollars you want to invest.',
                    required: true
                }
            ]
        },
        {
            type: 'SUB_COMMAND',
            name: 'buyshiba',
            description: 'Buy Shiba Inu coins for dollars.',
            options: [
                {
                    name: 'dollars',
                    type: 'NUMBER',
                    description: 'Define how many dollars you want to invest.',
                    required: true
                }
            ]
        },
        {
            type: 'SUB_COMMAND',
            name: 'convert',
            description: 'Convert currency to another. Example: SHIB to USD',
            options: [
                {
                    name: 'currency1',
                    type: 'STRING',
                    description: 'Define the currency you want to convert.',
                    required: true
                },
                {
                    name: 'currency2',
                    type: 'STRING',
                    description: 'Define the currency you want the previous currency to be converted to.',
                    required: true
                }
            ]
        },
        {
            type: 'SUB_COMMAND',
            name: 'daily',
            description: 'Claim your daily gift in dollars.'
        },
        {
            type: 'SUB_COMMAND',
            name: 'rich',
            description: 'Get the richest users.'
        },
        {
            type: 'SUB_COMMAND',
            name: 'sellbitcoin',
            description: 'Sell Bitcoins for dollars.',
            options: [
                {
                    name: 'bitcoins',
                    type: 'NUMBER',
                    description: 'Define how many Bitcoins you want to sell.',
                    required: true
                }
            ]
        },
        {
            type: 'SUB_COMMAND',
            name: 'sellshiba',
            description: 'Sell Shiba Inu coins for dollars.',
            options: [
                {
                    name: 'shibainucoins',
                    type: 'NUMBER',
                    description: 'Define how many Shiba Inu coins you want to sell.',
                    required: true
                }
            ]
        },
        {
            type: 'SUB_COMMAND',
            name: 'shibainucoin',
            description: 'Compare Shiba Inu coin to dollars.'
        }
    ],

    callback: async ({ guild, interaction }) => {
        const subcommand = interaction.options.getSubcommand()
        let user = interaction.options.getUser('user')
        if (!user) user = interaction?.user
        const dollars = interaction.options.getNumber('dollars')
        const currency1 = interaction.options.getString('currency1')
        const currency2 = interaction.options.getString('currency2')
        const bitcoins = interaction.options.getNumber('bitcoins')
        const shibainucoins = interaction.options.getNumber('shibainucoins')

        const webhook = new WebhookClient({ url: process.env.COMMANDS_URL! })

        if (subcommand === 'balance') {
            const embed = new MessageEmbed()
                .setTitle(`crypto ${subcommand} ${user.username} in ${guild?.name}`)
                .setColor('GREEN')
            await webhook.send({ embeds: [embed] })
            return balance(user)

        } else if (subcommand === 'bitcoin') {
            const embed = new MessageEmbed()
                .setTitle(`crypto ${subcommand} in ${guild?.name}`)
                .setColor('GREEN')
            await webhook.send({ embeds: [embed] })
            return bitcoin()

        } else if (subcommand === 'buybitcoin') {
            const embed = new MessageEmbed()
                .setTitle(`crypto ${subcommand} ${dollars} in ${guild?.name}`)
                .setColor('GREEN')
            await webhook.send({ embeds: [embed] })
            return buybitcoin(dollars!, interaction)

        } else if (subcommand === 'buyshiba') {
            const embed = new MessageEmbed()
                .setTitle(`crypto ${subcommand} ${dollars} in ${guild?.name}`)
                .setColor('GREEN')
            await webhook.send({ embeds: [embed] })
            return buyshiba(dollars!, interaction)

        } else if (subcommand === 'convert') {
            const embed = new MessageEmbed()
                .setTitle(`crypto ${subcommand} ${currency1} ${currency2} in ${guild?.name}`)
                .setColor('GREEN')
            await webhook.send({ embeds: [embed] })
            return convert(currency1!, currency2!)

        } else if (subcommand === 'daily') {
            const embed = new MessageEmbed()
                .setTitle(`crypto ${subcommand} in ${guild?.name}`)
                .setColor('GREEN')
            await webhook.send({ embeds: [embed] })
            return daily(interaction)

        } else if (subcommand === 'rich') {
            const embed = new MessageEmbed()
                .setTitle(`crypto ${subcommand} in ${guild?.name}`)
                .setColor('GREEN')
            await webhook.send({ embeds: [embed] })
            return rich(interaction, guild)

        } else if (subcommand === 'sellbitcoin') {
            const embed = new MessageEmbed()
                .setTitle(`crypto ${subcommand} ${bitcoins} in ${guild?.name}`)
                .setColor('GREEN')
            await webhook.send({ embeds: [embed] })
            return sellbitcoin(bitcoins!, interaction)

        } else if (subcommand === 'sellshiba') {
            const embed = new MessageEmbed()
                .setTitle(`crypto ${subcommand} ${shibainucoins} in ${guild?.name}`)
                .setColor('GREEN')
            await webhook.send({ embeds: [embed] })
            return sellshiba(shibainucoins!, interaction)

        } else if (subcommand === 'shibainucoin') {
            const embed = new MessageEmbed()
                .setTitle(`crypto ${subcommand} in ${guild?.name}`)
                .setColor('GREEN')
            await webhook.send({ embeds: [embed] })
            return shibainucoin()

        }
    }
} as ICommand

async function balance(user: User) {
    let data

    try {
        data = await crypto.findOne({ userId: user.id })
        if (!data) data = await crypto.create({ userId: user.id })
    } catch (err) {
        console.log(err)
        return "Error"
    }

    try {
        const dollar = await checkComma(data.dollars.toFixed(2))
        const shibacoin = await checkComma(data.shibaInuCoins)
        const bitcoin = await checkComma(data.bitCoins)

        const embed = new MessageEmbed()
            .setTitle(`Balance of ${user.username}`)
            .setDescription(`**Dollars:** $${dollar}\n**Shiba Inu coins:** ${shibacoin} SHIB\n**Bitcoins:** ${bitcoin} BTC`)
            .setColor("RANDOM");
        return embed;
    } catch (err) {
        return "Balance error. Please report this in the support server if you want this to be fixed :)."
    }
}

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
        const embed = new MessageEmbed()
            .setTitle(`Bitcoin currency`)
            .setDescription(`1 Bitcoin = ${usd} dollars\n\n1 dollar = ${data2.BTC} Bitcoins`)
            .setColor("RANDOM");
        return embed;
    } catch (err) {
        return "Bitcoin error. Please report this in the support server if you want this to be fixed :)."
    }
}

async function buybitcoin(dollars: number, interaction: CommandInteraction<CacheType>) {
    let user = interaction?.user

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
        return "You don't have enough dollars. Do /crypto daily or /work for earning more dollars."
    }

    try {
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
    } catch (err) {
        console.log(err)
        return "Buybitcoin error. Please report this in the support server if you want this to be fixed :)."
    }
}

async function buyshiba(dollars: number, interaction: CommandInteraction<CacheType>) {
    let user = interaction?.user

    let res
    let db

    try {
        res = await fetch(`https://min-api.cryptocompare.com/data/price?fsym=USD&tsyms=SHIB`)
        db = await crypto.findOne({ userId: user.id })
        if (!db) db = await crypto.create({ userId: user.id })
    } catch (err) {
        console.log(err)
        return "Error"
    }

    const shiba = res.data.SHIB
    const shibacoins = dollars * shiba

    if (db.dollars >= dollars && dollars > 0) {
        db.dollars -= dollars
        db.shibaInuCoins += shibacoins
        db.save()
    } else {
        return "You don't have enough dollars. Do /crypto daily or /work for earning more dollars."
    }

    try {
        const dollar = await checkComma(db.dollars)
        const shibacoin = await checkComma(db.shibaInuCoins)
        const bitcoin = await checkComma(db.bitCoins)
        const shibacoinsComma = await checkComma(shibacoins)
        const dollarsComma = await checkComma(dollars)

        const embed = new MessageEmbed()
            .setTitle(`You bought ${shibacoinsComma} SHIB for $${dollarsComma}`)
            .setDescription(`\n**__You now have__**\n**Dollars:** $${dollar}\n**Shiba Inu coins:** ${shibacoin} SHIB\n**Bitcoins:** ${bitcoin} BTC`)
            .setColor("RANDOM");
        return embed;
    } catch (err) {
        console.log(err)
        return "Buyshiba error. Please report this in the support server if you want this to be fixed :)."
    }
}

async function convert(currency1: string, currency2: string) {
    let res

    try {
        res = await fetch(`https://min-api.cryptocompare.com/data/price?fsym=${currency1}&tsyms=${currency2}`)
    } catch (err) {
        return "Currency doesn't exist"
    }

    const data = res.data[Object.keys(res.data)[0]]

    const coin = checkComma(data)

    try {
        const embed = new MessageEmbed()
            .setTitle(`${currency1} to ${currency2}`)
            .setDescription(`1 ${currency1} = ${coin} ${currency2}`)
            .setColor("RANDOM");
        return embed;
    } catch (err) {
        return "Shiba Inu coin error. Please report this in the support server if you want this to be fixed :)."
    }
}

async function daily(interaction: CommandInteraction<CacheType>) {
    let user = interaction?.user

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
        const dollar = await checkComma(db.dollars)
        const shibacoin = await checkComma(db.shibaInuCoins)
        const bitcoin = await checkComma(db.bitCoins)

        const embed = new MessageEmbed()
            .setTitle(`You successfully claimed your daily gift: $${randomAmount}. Invest with it!`)
            .setDescription(`\n**__You now have__**\n**Dollars:** $${dollar}\n**Shiba Inu coins:** ${shibacoin} SHIB\n**Bitcoins:** ${bitcoin} BTC`)
            .setColor("RANDOM");
        return embed;
    } catch (err) {
        console.log(err)
        return "Daily error. Please report this in the support server if you want this to be fixed :)."
    }
}

async function rich(interaction: CommandInteraction<CacheType>, guild: Guild | null) {
    try {
        const dollarEmbed = await createDollarEmbed(guild);
        const shibEmbed = await createShibEmbed(guild)
        const btcEmbed = await createBtcEmbed(guild)

        interaction.reply({
            embeds: [dollarEmbed, shibEmbed, btcEmbed]
        })

    } catch (err) {
        console.log(err)
        return "Error"
    }
}

async function sellbitcoin(bitcoins: number, interaction: CommandInteraction<CacheType>) {
    let user = interaction?.user

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
    } catch (err) {
        console.log(err)
        return "Buybitcoin error. Please report this in the support server if you want this to be fixed :)."
    }
}

async function sellshiba(shibainucoins: number, interaction: CommandInteraction<CacheType>) {
    let user = interaction?.user

    let res
    let db

    try {
        res = await fetch(`https://min-api.cryptocompare.com/data/price?fsym=SHIB&tsyms=USD`)
        db = await crypto.findOne({ userId: user.id })
        if (!db) db = await crypto.create({ userId: user.id })
    } catch (err) {
        console.log(err)
        return "Error"
    }

    const usd = res.data.USD
    const dollars = shibainucoins * usd

    if (db.shibaInuCoins >= shibainucoins && shibainucoins > 0) {
        db.shibaInuCoins -= shibainucoins
        db.dollars += dollars
        db.save()
    } else {
        return "Shiba Inu coins invalid."
    }

    try {
        const dollar = await checkComma(db.dollars)
        const shibacoin = await checkComma(db.shibaInuCoins)
        const bitcoin = await checkComma(db.bitCoins)
        const shibacoinsComma = await checkComma(shibainucoins)
        const dollarsComma = await checkComma(dollars)

        const embed = new MessageEmbed()
            .setTitle(`You sold ${shibacoinsComma} SHIB for $${dollarsComma}`)
            .setDescription(`\n**__You now have__**\n**Dollars:** $${dollar}\n**Shiba Inu coins:** ${shibacoin} SHIB\n**Bitcoins:** ${bitcoin} BTC`)
            .setColor("RANDOM");
        return embed
    } catch (err) {
        console.log(err)
        return "Sellshiba error. Please report this in the support server if you want this to be fixed :)."
    }
}

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
        const embed = new MessageEmbed()
        .setTitle(`Shiba Inu coin currency`)
        .setDescription(`1 Shiba Inu coin = ${data.USD} dollars\n\n1 dollar = ${shibacoin} Shiba Inu coins`)
        .setColor("RANDOM");
    return embed;
    } catch (err) {
        return "Shiba Inu coin error. Please report this in the support server if you want this to be fixed :)."
    }
}

function checkComma(coin: any) {
    if (coin.toString().substr(0, 2) === "0.") {
        return coin
    } else {
        return coin.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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