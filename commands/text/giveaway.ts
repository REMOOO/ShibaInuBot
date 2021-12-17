import { CacheType, CommandInteraction, Guild, MessageActionRow, MessageButton, MessageEmbed, TextChannel, WebhookClient } from "discord.js";
import { ICommand } from "wokcommands";
import giveawaydb from '../../model/giveaway'
const ms = require('ms')

export default {
    category: 'Text',
    description: 'Run a giveaway.',
    permissions: ['MANAGE_MESSAGES'],

    slash: true,

    options: [
        {
            type: 'SUB_COMMAND',
            name: 'start',
            description: 'Start a giveaway.',
            options: [
                {
                    name: 'prize',
                    type: 'STRING',
                    description: 'Define the prize.',
                    required: true
                },
                {
                    name: 'winner_count',
                    type: 'INTEGER',
                    description: 'Define how many winners there will be.',
                    required: true
                },
                {
                    name: 'time',
                    type: 'STRING',
                    description: 'Define a time. For example: 1d, 30m, 2h...',
                    required: true
                },
                {
                    name: 'enable_win_in_a_row',
                    type: 'BOOLEAN',
                    description: 'Choose if you want previous winners to win again',
                    required: true
                }
            ]
        },
        {
            type: 'SUB_COMMAND',
            name: 'reroll',
            description: 'Reroll the last giveaway.',
            options: [
                {
                    name: 'winner_count',
                    type: 'INTEGER',
                    description: 'Define how many winners there will be.',
                    required: true
                }
            ]
        }
    ],

    callback: async ({ guild, interaction, channel }) => {
        const subcommand = interaction.options.getSubcommand()
        const prize = interaction.options.getString('prize')
        const winnerCount = interaction.options.getInteger('winner_count')
        const time = interaction.options.getString('time')
        const enableWinInARow = interaction.options.getBoolean('enable_win_in_a_row')

        const webhook = new WebhookClient({ url: process.env.COMMANDS_URL! })

        if (subcommand === 'start') {
            const embed = new MessageEmbed()
                .setTitle(`giveaway ${subcommand} ${prize} ${winnerCount} ${time} ${enableWinInARow} in ${guild?.name}`)
                .setColor('GREEN')
            await webhook.send({ embeds: [embed] })

            return start(time!, guild, prize!, channel, winnerCount!, enableWinInARow!, interaction)

        } else if (subcommand === 'reroll') {
            const embed = new MessageEmbed()
                .setTitle(`giveaway ${subcommand} ${winnerCount} in ${guild?.name}`)
                .setColor('GREEN')
            await webhook.send({ embeds: [embed] })

            return reroll(winnerCount!, guild, channel)
        }
    }
} as ICommand

async function start(time: string, guild: Guild | null, prize: string, channel: TextChannel, winnersCount: number, winInARow: string | boolean, interaction: CommandInteraction<CacheType>) {
    let entrants = 0

    const timeMs = await ms(time)
    const timeNow = new Date().getTime()
    const timeCalculated = timeNow + timeMs
    const date = new Date(timeCalculated)

    let db: { isBusy: boolean; prize: string; end: Date; save: () => void; winners: string | string[]; entrants: string[]; }
    db = await giveawaydb.findOne({ guildId: guild!.id, channelId: channel.id })
    if (db) {
        if (db.isBusy) {
            return "There's already a giveaway atm."
        } else {
            db.prize = prize
            db.end = date
            db.isBusy = true
            db.save()
        }
    } else {
        db = await giveawaydb.create({ guildId: guild!.id, channelId: channel.id, prize: prize, end: date, isBusy: true })
    }

    const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId("giveaway")
                .setEmoji("🎉")
                .setLabel("Enter")
                .setStyle("SUCCESS")
        )
        .addComponents(
            new MessageButton()
                .setCustomId("entrants")
                .setLabel(`Entrants: ${entrants}`)
                .setStyle('PRIMARY')
                .setDisabled(true)
        )

    const startEmbed = new MessageEmbed()
        .setTitle(`GIVEAWAY: ${prize}`)
        .setDescription(`Click the green button to enter!\n\nWinners: ${winnersCount}\nEnds: ${date.toLocaleString()}\nHosted by: ${interaction.user}`)
        .setColor("RANDOM")

    const giveawayinteraction = await interaction!.channel?.send({
        embeds: [startEmbed],
        components: [row]
    })

    const collector = channel.createMessageComponentCollector({
        time: timeMs
    })
    let entrantsArray: string[] = []

    collector.on('collect', async (button) => {
        if (entrantsArray.includes(button.user.id)) {
            await button.reply({
                content: "You've already entered the giveaway!",
                ephemeral: true
            })
        } else if (db.winners.includes(button.user.id) && winInARow === false) {
            await button.reply({
                content: "You've already won the previous giveaway!",
                ephemeral: true
            })
        } else {
            entrantsArray.push(button.user.id)
            entrants += 1
            db.entrants = entrantsArray
            db.save()

            const updatedRow = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId("giveaway")
                        .setEmoji("🎉")
                        .setLabel("Enter")
                        .setStyle("SUCCESS")
                )
                .addComponents(
                    new MessageButton()
                        .setCustomId("entrants")
                        .setLabel(`Entrants: ${entrants}`)
                        .setStyle('PRIMARY')
                        .setDisabled(true)
                )

            await button.update({
                components: [updatedRow]
            })
        }
    })

    collector.on('end', async () => {
        const endRow = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId("entrants")
                    .setLabel(`Entrants: ${entrants}`)
                    .setStyle('PRIMARY')
                    .setDisabled(true)
            )

        if (winnersCount > entrantsArray.length) {
            const embed = new MessageEmbed()
                .setTitle(`Not enough entrants for giveaway: ${prize}`)
                .setColor("RANDOM")

            db.isBusy = false
            db.save()

            await giveawayinteraction?.edit({
                embeds: [embed],
                components: [endRow]
            })
        } else {
            let winners: string[] = []

            for (let i = 0; i < winnersCount; i++) {
                const winner = entrantsArray[Math.floor(Math.random() * entrantsArray.length)]

                if (winners.includes(winner)) {
                    i--
                } else {
                    winners.push(winner)
                }
            }

            db.winners = winners
            db.isBusy = false
            db.save()

            let message = ""

            for (let i = 0; i < winners.length; i++) {
                message += `<@${winners[i]}>\n`
            }

            let channelmessage = ""

            for (let i = 0; i < winners.length; i++) {
                channelmessage += `<@${winners[i]}>, `
            }

            const endEmbed = new MessageEmbed()
                .setTitle(`Winners giveaway: ${prize}`)
                .setDescription(`${message}`)
                .setColor("RANDOM")

            await giveawayinteraction?.edit({
                embeds: [endEmbed],
                components: [endRow]
            })

            await channel.send(`Congratulations ${channelmessage}you won the **${prize}**!`)
        }
    })
}

async function reroll(winnersCount: number, guild: Guild | null, channel: TextChannel) {
    let db
    db = await giveawaydb.findOne({ guildId: guild!.id, channelId: channel.id })
    if (db) {
        if (db.end < Date.now()) {
            db.isBusy = false
        } else {
            return "Giveaway has not ended yet."
        }
    } else {
        return "There has no been giveaway in this channel yet."
    }

    const entrants = db.entrants
    const prize = db.prize

    const endRow = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId("entrants")
                .setLabel(`Entrants: ${entrants.length}`)
                .setStyle('PRIMARY')
                .setDisabled(true)
        )

    if (winnersCount > entrants.length) {
        await channel.send(`Not enough entrants for giveaway: **${prize}**`)
    } else {
        let winners: string[] = []

        for (let i = 0; i < winnersCount; i++) {
            const winner = entrants[Math.floor(Math.random() * entrants.length)]

            if (winners.includes(winner)) {
                i--
            } else {
                winners.push(winner)
            }
        }

        db.winners = winners
        db.save()

        let channelmessage = ""

        for (let i = 0; i < winners.length; i++) {
            channelmessage += `<@${winners[i]}>, `
        }

        await channel.send(`Congratulations ${channelmessage}you won the **${prize}**! (Entrants: ${entrants.length})`)
    }
}