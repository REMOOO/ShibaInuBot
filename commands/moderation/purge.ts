import { CacheType, CommandInteraction, Message, TextChannel } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Moderation',
    description: 'Deletes multiple messages at once. Only works for administrators.',

    permissions: ['ADMINISTRATOR'],
    
    minArgs: 1,
    maxArgs: 1,
    expectedArgs: '<amount>',
    expectedArgsTypes: ['INTEGER'],

    slash: 'both',

    callback: async ({ message, interaction, channel, args }) => {
        if (parseInt(args[0]) > 100) {
            return "Value should be less than or equal to 100."
        }
        purge(interaction, channel, message, args);
    }
} as ICommand

async function purge(interaction: CommandInteraction<CacheType>, channel: TextChannel, message: Message<boolean>, args: string[]) {
    if (!interaction) {
        if (botHasPermissionsMessage(channel, message)) {
            await deleteMessages(args, message, channel)
        }
    } else {
        if (botHasPermissionsInteraction(channel, interaction)) {
            await deleteMessages(args, message, channel)
        }
    }
}

async function deleteMessages(args: string[], message: Message<boolean>, channel: TextChannel) {
    const amount = args.length ? parseInt(args.shift()!) : 10;

    if (amount < 1) {
        return "Amount should be higher than 0. pls"
    }

    if (message) {
        await message.delete();
    }

    const messages = await channel.messages.fetch({ limit: amount });

    messages.forEach((message: { delete: () => any; }) => message.delete());
}

function botHasPermissionsInteraction(channel: TextChannel, interaction: CommandInteraction<CacheType>) {
    return ((channel.permissionsFor(interaction.guild?.me!).has("SEND_MESSAGES")) && (channel.permissionsFor(interaction.guild?.me!).has("MANAGE_MESSAGES")))
}

function botHasPermissionsMessage(channel: TextChannel, message: Message<boolean>) {
    return ((channel.permissionsFor(message.guild?.me!).has("SEND_MESSAGES")) && (channel.permissionsFor(message.guild?.me!).has("MANAGE_MESSAGES")))
}
