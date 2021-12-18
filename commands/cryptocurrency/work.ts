import { CacheType, CommandInteraction, Interaction, MessageActionRow, MessageButton, MessageEmbed, TextChannel, User, WebhookClient } from "discord.js";
import { ICommand } from "wokcommands";
import crypto from '../../model/cryptocurrency'

export default {
    category: 'Cryptocurrency',
    description: 'Work.',

    slash: true,

    options: [
        {
            type: 'SUB_COMMAND',
            name: 'cutweed',
            description: 'Cut some weed. You must have some weed already.'
        },
        {
            type: 'SUB_COMMAND',
            name: 'harvestweed',
            description: 'Harvest some weed.'
        },
        {
            type: 'SUB_COMMAND',
            name: 'inventory',
            description: 'Check your inventory.'
        },
        {
            type: 'SUB_COMMAND',
            name: 'sellweed',
            description: 'Sell some weed. You must have some weed bags already.'
        },
    ],

    callback: async ({ guild, interaction, channel }) => {
        const subcommand = interaction.options.getSubcommand()
        const user = interaction.user
        const webhook = new WebhookClient({ url: process.env.COMMANDS_URL! })
        const embed = new MessageEmbed()
            .setTitle(`work ${subcommand} by ${user.username} in ${guild?.name}`)
            .setColor('GREEN')
        await webhook.send({ embeds: [embed] })

        if (subcommand === 'cutweed') {
            return cutweed(user, interaction, channel)

        } else if (subcommand === 'harvestweed') {
            return harvestweed(user, interaction, channel)

        } else if (subcommand === 'inventory') {
            return inventory(user)

        } else if (subcommand === 'sellweed') {
            return sellweed(user, interaction, channel)

        }
    }
} as ICommand

async function cutweed(user: User, interaction: CommandInteraction<CacheType>, channel: TextChannel) {
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

    await interaction.reply({
        embeds: [embed],
        components: [row],
    });

    const filter = (btnInt: Interaction) => {
        return interaction.user.id === btnInt.user.id;
    };

    const collector = channel.createMessageComponentCollector({
        filter,
        time: 1000 * 15
    });

    const weedbags = ~~(db.weed / 5)

    collector.on('collect', async (button: { user: { username: any; }; }) => {
        const embed = new MessageEmbed()
            .setTitle(`${button.user.username} is cutting some weed...`)
            .setDescription("The more weed you have, the longer it takes.")
            .setColor('RANDOM')

        collector.resetTimer({ time: 1000 * (weedbags * 5) })

        await interaction.editReply({
            embeds: [embed],
            components: [],
        })
    })

    collector.on('end', async (collection: { first: () => { (): any; new(): any; customId: string; }; }) => {
        if (collection.first()?.customId === 'cut_weed') {
            const weed = weedbags * 5

            db.weed -= weed
            db.weedBags += weedbags
            db.busyWeed = false
            db.save()

            const embed = new MessageEmbed()
                .setTitle(`${interaction.user.username} has cut ${weed} weed and packed ${weedbags} weed bags`)
                .setColor('RANDOM')

            await interaction.editReply({
                embeds: [embed],
                components: [],
            });
        } else {
            const embed = new MessageEmbed()
                .setTitle('You waited too long, the cutting session has expired')
                .setColor('RANDOM')

            db.busyWeed = false
            db.save()

            await interaction.editReply({
                embeds: [embed],
                components: [],
            });
        }
    });
}

async function harvestweed(user: User, msgInt: CommandInteraction<CacheType>, channel: TextChannel) {
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

async function inventory(user: User) {
    let data

    try {
        data = await crypto.findOne({ userId: user.id })
        if (!data) data = await crypto.create({ userId: user.id })
    } catch (err) {
        console.log(err)
        return "Error"
    }


    try {
        const weed = data.weed
        const weedBags = data.weedBags

        const embed = new MessageEmbed()
            .setTitle(`Inventory of ${user.username}`)
            .setDescription(`**Weed:** ${weed}\n**Weed bags:** ${weedBags}`)
            .setColor("RANDOM");
        return embed;
    } catch (err) {
        return "Inventory error. Please report this in the support server if you want this to be fixed :)."
    }
}

async function sellweed(user: User, msgInt: CommandInteraction<CacheType>, channel: TextChannel) {
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

function checkComma(coin: any) {
    if (coin.toString().substr(0, 2) === "0.") {
        return coin
    } else {
        return coin.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}