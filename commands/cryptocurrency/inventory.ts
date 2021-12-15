import { TextChannel, CommandInteraction, CacheType, Message, MessageEmbed, GuildMember, User } from "discord.js";
import { ICommand } from "wokcommands";
import crypto from '../../model/cryptocurrency'

export default {
    category: 'Cryptocurrency',
    description: "Check your inventory.",
    aliases: ['inv'],

    slash: 'both',

    callback: async ({ interaction, message }) => {
        console.log(`inventory`)

        return inventory(message, interaction)
    }
} as ICommand

async function inventory(message: Message<boolean>, interaction: CommandInteraction<CacheType>) {
    let  user = message?.author
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
        return "Inventory error. Please report this in the support server if you want this to be fixed :)."
    }
}

async function createEmbed(user: User, data: any) {
    const weed = data.weed
    const weedBags = data.weedBags

    const embed = new MessageEmbed()
        .setTitle(`Inventory of ${user.username}`)
        .setDescription(`**Weed:** ${weed}\n**Weed bags:** ${weedBags}`)
        .setColor("RANDOM");
    return embed;
}
