import { CacheType, CommandInteraction, GuildMember, Message, MessageEmbed, TextChannel } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Text',
    description: 'Measure the penis of a user.',
    aliases : ['peepee', 'pp', 'dick', 'howlong'],

    slash: 'both',

    maxArgs: 1,
    expectedArgs: '<user>',
    expectedArgsTypes: ['USER'],

    callback: ({ message, interaction, channel }) => {
        console.log(`penis`)

        const target = message ? message.mentions.members?.first() : interaction.options.getMember('user') as GuildMember
        return penis(interaction, channel, message, target)
    }
} as ICommand

function botHasPermissionsInteraction(channel: TextChannel, interaction: CommandInteraction<CacheType>) {
    return channel.permissionsFor(interaction.guild?.me!).has("SEND_MESSAGES");
}

function botHasPermissionsMessage(channel: TextChannel, message: Message<boolean>) {
    return channel.permissionsFor(message.guild?.me!).has("SEND_MESSAGES");
}

function penis(interaction: CommandInteraction<CacheType>, channel: TextChannel, message: Message<boolean>, target: GuildMember | undefined) {
    if (!interaction) {
        if ( botHasPermissionsMessage(channel, message)) {
            return createEmbed(target)
        }
    } else {
        if (botHasPermissionsInteraction(channel, interaction)) {
            return createEmbed(target)
        }
    }
}

function createEmbed(target: GuildMember | undefined) {
    if (!target) {
        const embed = new MessageEmbed()
            .setTitle(`Your penis`)
            .setDescription(`8${getPenisSize()}D`)
        return embed
    } else {
        const embed = new MessageEmbed()
            .setTitle(`${target.user.username}'s penis`)
            .setDescription(`8${getPenisSize()}D`)
        return embed
    }
}

function getPenisSize() {
    let penis = ""
    for (let i = 0; i<=Math.floor(Math.random() * 101);i++) {
        penis += "="
    }
    return penis
}