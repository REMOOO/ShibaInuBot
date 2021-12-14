import { TextChannel, CommandInteraction, CacheType, Message, MessageEmbed, MessageActionRow, MessageButton, Interaction } from "discord.js";
import { ICommand } from "wokcommands";
import crypto from '../../model/cryptocurrency'

export default {
    category: 'Cryptocurrency',
    description: "Harvest some weed.",
    aliases: ['pickweed', 'farmweed'],

    slash: 'both',

    callback: async ({ message: msg, interaction: msgInt, channel }) => {
        console.log(`harvestweed`)

        if (!msgInt) {
            if (botHasPermissionsMessage(channel, msg)) {
                return harvestweedMsg(channel, msg)
            }
        } else {
            if (botHasPermissionsInteraction(channel, msgInt)) {
                return harvestweedInt(channel, msgInt)
            }
        }
    }
} as ICommand

async function harvestweedMsg(channel: TextChannel, msg: Message<boolean>) {
    let user = msg.author

    let db: { weed: number; weedBags: any; busyWeed: boolean; save: () => void; }

    try {
        db = await crypto.findOne({ userId: user.id })
        if (!db) db = await crypto.create({ userId: user.id })
    } catch (err) {
        console.log(err)
        return "Error"
    }

    if (db.weed + db.weedBags >= 60) {
        return "Inventory full."
    }

    if (db.busyWeed === true) {
        return "You're already doing a weed activity. Don't get too excited."
    }

    db.busyWeed = true
    db.save()

    const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('harvest_weed')
                .setEmoji('🌿')
                .setLabel('Harvest weed')
                .setStyle('SUCCESS')
        )

    const embed = new MessageEmbed()
        .setTitle('Harvest some weed')
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

    collector.on('collect', async (button) => {
        const embed = new MessageEmbed()
            .setTitle(`${button.user.username} is harvesting some weed...`)
            .setColor('RANDOM')

        collector.resetTimer({ time: 10000 })

        await botMsg.edit({
            embeds: [embed],
            components: [],
        })
    })

    collector.on('end', async (collection) => {
        if (collection.first()?.customId === 'harvest_weed') {
            const randomAmount = Math.floor(Math.random() * 3) + 1

            db.weed += randomAmount
            db.busyWeed = false
            db.save()

            const embed = new MessageEmbed()
                .setTitle(`${msg.author.username} has harvested ${randomAmount} weed`)
                .setColor('RANDOM')

            await botMsg.edit({
                embeds: [embed],
                components: [],
            });
        } else {
            const embed = new MessageEmbed()
                .setTitle('You waited too long, the weed has expired')
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

async function harvestweedInt(channel: TextChannel, msgInt: CommandInteraction<CacheType>) {
    let user = msgInt.user

    let db: { weed: number; weedBags: any; busyWeed: boolean; save: () => void; }

    try {
        db = await crypto.findOne({ userId: user.id })
        if (!db) db = await crypto.create({ userId: user.id })
    } catch (err) {
        console.log(err)
        return "Error"
    }

    if (db.weed + db.weedBags >= 60) {
        return "Inventory full."
    }

    if (db.busyWeed === true) {
        return "You're already doing a weed activity. Don't get too excited."
    }

    db.busyWeed = true
    db.save()

    const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('harvest_weed')
                .setEmoji('🌿')
                .setLabel('Harvest weed')
                .setStyle('SUCCESS')
        )

    const embed = new MessageEmbed()
        .setTitle('Harvest some weed')
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

    collector.on('collect', async (button) => {
        const embed = new MessageEmbed()
            .setTitle(`${button.user.username} is harvesting some weed...`)
            .setColor('RANDOM')

        collector.resetTimer({ time: 10000 })

        await msgInt.editReply({
            embeds: [embed],
            components: [],
        })
    })

    collector.on('end', async (collection) => {
        if (collection.first()?.customId === 'harvest_weed') {
            const randomAmount = Math.floor(Math.random() * 3) + 1

            db.weed += randomAmount
            db.busyWeed = false
            db.save()

            const embed = new MessageEmbed()
                .setTitle(`${msgInt.user.username} has harvested ${randomAmount} weed`)
                .setColor('RANDOM')

            await msgInt.editReply({
                embeds: [embed],
                components: [],
            });
        } else {
            const embed = new MessageEmbed()
                .setTitle('You waited too long, the weed has expired')
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