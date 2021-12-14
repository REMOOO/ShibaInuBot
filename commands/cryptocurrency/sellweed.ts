import { TextChannel, CommandInteraction, CacheType, Message, MessageEmbed, MessageActionRow, MessageButton, Interaction } from "discord.js";
import { ICommand } from "wokcommands";
import crypto from '../../model/cryptocurrency'

export default {
    category: 'Cryptocurrency',
    description: "Sell some weed. You must have some weed bags already.",

    slash: 'both',

    callback: async ({ message: msg, interaction: msgInt, channel, args }) => {
        console.log(`sellweed ${args[0]}`)

        if (!msgInt) {
            if (botHasPermissionsMessage(channel, msg)) {
                return sellweedMsg(channel, msg)
            }
        } else {
            if (botHasPermissionsInteraction(channel, msgInt)) {
                return sellweedInt(channel, msgInt)
            }
        }
    }
} as ICommand

async function sellweedMsg(channel: TextChannel, msg: Message<boolean>) {
    let user = msg.author

    let db: { weedBags: number; busyWeed: boolean; save: () => void; dollars: number; }

    try {
        db = await crypto.findOne({ userId: user.id })
        if (!db) db = await crypto.create({ userId: user.id })
    } catch (err) {
        console.log(err)
        return "Error"
    }

    if (db.weedBags === 0) {
        return "You don't have weed bags bro."
    }

    if (db.busyWeed === true) {
        return "You're already doing a weed activity. Don't get too excited."
    }

    db.busyWeed = true
    db.save()

    const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('sell_weed')
                .setEmoji('💸')
                .setLabel('Sell weed')
                .setStyle('SUCCESS')
        )

    const embed = new MessageEmbed()
        .setTitle('Sell some weed')
        .setColor('RANDOM')

    const botMsg = await msg.reply({
        embeds: [embed],
        components: [row],
    });

    const filter = (btnInt: Interaction) => {
        return msg.author.id === btnInt.user.id;
    };

    const collector = channel.createMessageComponentCollector({
        filter,
        time: 1000 * 15
    });

    const weedbags = db.weedBags

    collector.on('collect', async (button) => {
        const embed = new MessageEmbed()
            .setTitle(`${button.user.username} is selling some weed...`)
            .setDescription("The more weed you have, the longer it takes.")
            .setColor('RANDOM')

        collector.resetTimer({ time: 1500 * weedbags })

        await botMsg.edit({
            embeds: [embed],
            components: [],
        })
    })

    collector.on('end', async (collection) => {
        const randomNumber = Math.floor(Math.random() * 20) + 1
        if (collection.first()?.customId === 'sell_weed') {
            if (randomNumber === 20) {
                db.weedBags -= weedbags
                db.dollars += 1
                db.busyWeed = false
                db.save()

                const embed = new MessageEmbed()
                    .setTitle(`${msg.author.username} got scammed by the seller & lost ${weedbags} weed bags 😭`)
                    .setDescription("I guess that's the risk doing dirty work 🤷. Shiba gives you 1 dollar tho, because shibe cares about you.")
                    .setColor('RANDOM')

                await botMsg.edit({
                    embeds: [embed],
                    components: [],
                });
            } else {
                const profit = weedbags * 329

                db.weedBags -= weedbags
                db.dollars += profit
                db.busyWeed = false
                db.save()

                const profitComma = checkComma(profit)

                const embed = new MessageEmbed()
                    .setTitle(`${msg.author.username} has sold ${weedbags} weed bags for ${profitComma} dollars 🤑`)
                    .setColor('RANDOM')

                await botMsg.edit({
                    embeds: [embed],
                    components: [],
                });
            }
        } else {
            const embed = new MessageEmbed()
                .setTitle('You waited too long, the selling session has expired')
                .setColor('RANDOM')

            db.busyWeed = false
            db.save()

            await botMsg.edit({
                embeds: [embed],
                components: [],
            });
        }
    });
}

function checkComma(coin: any) {
    if (coin.toString().substr(0, 2) === "0.") {
        return coin
    } else {
        return coin.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}

async function sellweedInt(channel: TextChannel, msgInt: CommandInteraction<CacheType>) {
    let user = msgInt.user

    let db: { weedBags: number; busyWeed: boolean; save: () => void; dollars: number; }

    try {
        db = await crypto.findOne({ userId: user.id })
        if (!db) db = await crypto.create({ userId: user.id })
    } catch (err) {
        console.log(err)
        return "Error"
    }

    if (db.weedBags === 0) {
        return "You don't have weed bags bro."
    }

    if (db.busyWeed === true) {
        return "You're already doing a weed activity. Don't get too excited."
    }

    db.busyWeed = true
    db.save()

    const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('sell_weed')
                .setEmoji('💸')
                .setLabel('Sell weed')
                .setStyle('SUCCESS')
        )

    const embed = new MessageEmbed()
        .setTitle('Sell some weed')
        .setColor('RANDOM')

    await msgInt.reply({
        embeds: [embed],
        components: [row],
    });

    const filter = (btnInt: Interaction) => {
        return msgInt.user.id === btnInt.user.id;
    };

    const collector = channel.createMessageComponentCollector({
        filter,
        time: 1000 * 15
    });

    const weedbags = db.weedBags

    collector.on('collect', async (button) => {
        const embed = new MessageEmbed()
            .setTitle(`${button.user.username} is selling some weed...`)
            .setDescription("The more weed you have, the longer it takes.")
            .setColor('RANDOM')

        collector.resetTimer({ time: 1500 * weedbags })

        await msgInt.editReply({
            embeds: [embed],
            components: [],
        })
    })

    collector.on('end', async (collection) => {
        const randomNumber = Math.floor(Math.random() * 20) + 1
        if (collection.first()?.customId === 'sell_weed') {
            if (randomNumber === 20) {
                db.weedBags -= weedbags
                db.dollars += 1
                db.busyWeed = false
                db.save()

                const embed = new MessageEmbed()
                    .setTitle(`${msgInt.user.username} got scammed by the seller & lost ${weedbags} weed bags 😭`)
                    .setDescription("I guess that's the risk doing dirty work 🤷. Shiba gives you 1 dollar tho, because shibe cares about you.")
                    .setColor('RANDOM')

                await msgInt.editReply({
                    embeds: [embed],
                    components: [],
                });
            } else {
                const profit = weedbags * 329

                db.weedBags -= weedbags
                db.dollars += profit
                db.busyWeed = false
                db.save()

                const profitComma = checkComma(profit)

                const embed = new MessageEmbed()
                    .setTitle(`${msgInt.user.username} has sold ${weedbags} weed bags for ${profitComma} dollars 🤑`)
                    .setColor('RANDOM')

                await msgInt.editReply({
                    embeds: [embed],
                    components: [],
                });
            }
        } else {
            const embed = new MessageEmbed()
                .setTitle('You waited too long, the selling session has expired')
                .setColor('RANDOM')

            db.busyWeed = false
            db.save()

            await msgInt.editReply({
                embeds: [embed],
                components: [],
            });
        }
    });
}

function botHasPermissionsInteraction(channel: TextChannel, interaction: CommandInteraction<CacheType>) {
    return channel.permissionsFor(interaction.guild?.me!).has("SEND_MESSAGES");
}

function botHasPermissionsMessage(channel: TextChannel, message: Message<boolean>) {
    return channel.permissionsFor(message.guild?.me!).has("SEND_MESSAGES");
}