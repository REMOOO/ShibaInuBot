import { MessageEmbed, MessageButton, MessageActionRow } from "discord.js";
import { ICommand } from "wokcommands";
import giveawaydb from '../../model/giveaway'
const ms = require('ms')

export default {
    category: 'Text',
    description: 'Start a giveaway. Only works as slash commmand.',
    permissions: ['MANAGE_MESSAGES'],

    slash: true,

    expectedArgs: '<prize> <winnersCount> <time> <enableWinInARow>',
    expectedArgsTypes: ['STRING', 'INTEGER', 'STRING', 'BOOLEAN'],
    minArgs: 4,
    maxArgs: 4,

    callback: async ({ guild, args, channel, interaction }) => {
        console.log(`giveaway ${args[0]} ${args[1]} ${args[2]} ${args[3]}`)

        const prize = args[0]
        const winnersCount = args[1]
        const time = args[2]
        const winInARow = args[3]
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
            } else if (db.winners.includes(button.user.id) && winInARow == "false") {
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

            if (parseInt(winnersCount) > entrantsArray.length) {
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

                for (let i = 0; i < parseInt(winnersCount); i++) {
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


} as ICommand
