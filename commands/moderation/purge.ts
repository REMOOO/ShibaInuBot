import { Message, TextChannel } from "discord.js";
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

    callback: async ({ message, channel, args, guild }) => {
        console.log(`purge ${args[0]} in ${guild?.name}`)

        if (parseInt(args[0]) > 100) {
            return "Value should be less than or equal to 100."
        }
        purge(channel, message, args);
    }
} as ICommand

async function purge(channel: TextChannel, message: Message<boolean>, args: string[]) {
    await deleteMessages(args, message, channel)
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
