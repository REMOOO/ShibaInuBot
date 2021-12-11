import { TextChannel, CommandInteraction, CacheType, Message, MessageEmbed, GuildMember, User } from "discord.js";
import { ICommand } from "wokcommands";
import crypto from '../../model/cryptocurrency'

export default {
    category: 'Cryptocurrency',
    description: "Get the balance of a user.",
    aliases: ['bal'],

    slash: 'both',

    maxArgs: 1,
    expectedArgs: '<user>',
    expectedArgsTypes: ['USER'],

    callback: async ({ interaction, channel, message }) => {
        const target = message ? message.mentions.members?.first() : interaction.options.getMember('user') as GuildMember

        if (!interaction) {
            if (botHasPermissionsMessage(channel, message)) {
                return balance(target, message, interaction)
            }
        } else {
            if (botHasPermissionsInteraction(channel, interaction)) {
                return balance(target, message, interaction)
            }
        }
    }
} as ICommand

async function balance(target: GuildMember | undefined, message: Message<boolean>, interaction: CommandInteraction<CacheType>) {
    let user = target?.user!
    if(!user) user = message?.author
    if (!user) user = interaction?.user
    let data

    try {
        data = await crypto.findOne({ userId: user.id})
        if (!data) data = await crypto.create({ userId: user.id })
    } catch (err) {
        console.log(err)
        return "Error"
    }


    try {
        return createEmbed(user, data);
    } catch (err) {
        return "Balance error. Please report this in the support server if you want this to be fixed :)."
    }
}

async function createEmbed(user: User, data: any) {
    const dollar = await checkComma(data.dollars)
    const shibacoin = await checkComma(data.shibaInuCoins)
    const bitcoin = await checkComma(data.bitCoins)

    const embed = new MessageEmbed()
        .setTitle(`Balance of ${user.username}`)
        .setDescription(`**Dollars:** $${parseFloat(dollar).toFixed(2)}\n**Shiba Inu coins:** ${shibacoin} SHIB\n**Bitcoins:** ${bitcoin} BTC`)
        .setColor("RANDOM");
    return embed;
}

function checkComma(coin: any) {
    if (coin.toString().substr(0,2) === "0.") {
        return coin
    } else {
        return coin.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}

function botHasPermissionsInteraction(channel: TextChannel, interaction: CommandInteraction<CacheType>) {
    return channel.permissionsFor(interaction.guild?.me!).has("SEND_MESSAGES");
}

function botHasPermissionsMessage(channel: TextChannel, message: Message<boolean>) {
    return channel.permissionsFor(message.guild?.me!).has("SEND_MESSAGES");
}