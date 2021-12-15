import { TextChannel, CommandInteraction, CacheType, Message, MessageEmbed, MessageActionRow, MessageButton, Interaction } from "discord.js";
import { ICommand } from "wokcommands";
import crypto from '../../model/cryptocurrency'

export default {
    category: 'Cryptocurrency',
    description: "Cut some weed. You must have some weed already.",
    aliases: ['packweed'],

    slash: 'both',

    callback: async ({ message: msg, interaction: msgInt, channel }) => {
        console.log(`cutweed`)

        if (!msgInt) {
            return cutweedMsg(channel, msg)

        } else {
            return cutweedInt(channel, msgInt)

        }
    }
} as ICommand

async function cutweedMsg(channel: TextChannel, msg: Message<boolean>) {
    let user = msg.author

    let db: { weed: number; busyWeed: boolean; save: () => void; weedBags: number; }

    try {
        db = await crypto.findOne({ userId: user.id })
        if (!db) db = await crypto.create({ userId: user.id })
    } catch (err) {
        console.log(err)
        return "Error"
    }

    if (db.weed < 5) {
        return "You don't have enough weed."
    }

    if (db.busyWeed === true) {
        return "You're already doing a weed activity. Don't get too excited."
    }

    db.busyWeed = true
    db.save()

    const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('cut_weed')
                .setEmoji('🔪')
                .setLabel('Cut weed')
                .setStyle('SUCCESS')
        )

    const embed = new MessageEmbed()
        .setTitle('Cut some weed')
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

    const weedbags = ~~(db.weed / 5)

    collector.on('collect', async (button) => {
        const embed = new MessageEmbed()
            .setTitle(`${button.user.username} is cutting some weed...`)
            .setDescription("The more weed you have, the longer it takes.")
            .setColor('RANDOM')

        collector.resetTimer({ time: 1000 * (weedbags * 5) })

        await botMsg.edit({
            embeds: [embed],
            components: [],
        })
    })

    collector.on('end', async (collection) => {
        if (collection.first()?.customId === 'cut_weed') {
            const weed = weedbags * 5

            db.weed -= weed
            db.weedBags += weedbags
            db.busyWeed = false
            db.save()

            const embed = new MessageEmbed()
                .setTitle(`${msg.author.username} has cut ${weed} weed and packed ${weedbags} weed bags`)
                .setColor('RANDOM')

            await botMsg.edit({
                embeds: [embed],
                components: [],
            });
        } else {
            const embed = new MessageEmbed()
                .setTitle('You waited too long, the cutting session has expired')
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

async function cutweedInt(channel: TextChannel, msgInt: CommandInteraction<CacheType>) {
    let user = msgInt.user

    let db: { weed: number; busyWeed: boolean; save: () => void; weedBags: number; }

    try {
        db = await crypto.findOne({ userId: user.id })
        if (!db) db = await crypto.create({ userId: user.id })
    } catch (err) {
        console.log(err)
        return "Error"
    }

    if (db.weed < 5) {
        return "You don't have enough weed."
    }

    if (db.busyWeed === true) {
        return "You're already doing a weed activity. Don't get too excited."
    }

    db.busyWeed = true
    db.save()

    const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('cut_weed')
                .setEmoji('🔪')
                .setLabel('Cut weed')
                .setStyle('SUCCESS')
        )

    const embed = new MessageEmbed()
        .setTitle('Cut some weed')
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

    const weedbags = ~~(db.weed / 5)

    collector.on('collect', async (button) => {
        const embed = new MessageEmbed()
            .setTitle(`${button.user.username} is cutting some weed...`)
            .setDescription("The more weed you have, the longer it takes.")
            .setColor('RANDOM')

        collector.resetTimer({ time: 1000 * (weedbags * 5) })

        await msgInt.editReply({
            embeds: [embed],
            components: [],
        })
    })

    collector.on('end', async (collection) => {
        if (collection.first()?.customId === 'cut_weed') {
            const weed = weedbags * 5

            db.weed -= weed
            db.weedBags += weedbags
            db.busyWeed = false
            db.save()

            const embed = new MessageEmbed()
                .setTitle(`${msgInt.user.username} has cut ${weed} weed and packed ${weedbags} weed bags`)
                .setColor('RANDOM')

            await msgInt.editReply({
                embeds: [embed],
                components: [],
            });
        } else {
            const embed = new MessageEmbed()
                .setTitle('You waited too long, the cutting session has expired')
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