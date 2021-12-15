import { MessageButton, MessageActionRow } from "discord.js";
import { ICommand } from "wokcommands";
import giveawaydb from '../../model/giveaway'

export default {
    category: 'Text',
    description: 'Reroll the last giveaway. Only works as slash commmand.',
    permissions: ['MANAGE_MESSAGES'],

    slash: true,

    expectedArgs: '<winnersCount>',
    expectedArgsTypes: ['INTEGER'],
    minArgs: 1,
    maxArgs: 1,

    callback: async ({ guild, args, channel }) => {
        console.log(`reroll ${args[0]}`)

        const winnersCount = args[0]

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

        if (parseInt(winnersCount) > entrants.length) {
            await channel.send(`Not enough entrants for giveaway: **${prize}**`)
        } else {
            let winners: string[] = []

            for (let i = 0; i < parseInt(winnersCount); i++) {
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


} as ICommand
