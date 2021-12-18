import { Message, MessageEmbed, TextChannel, WebhookClient } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Moderation',
    description: 'Use moderation tools.',

    permissions: ['ADMINISTRATOR'],

    slash: true,

    options: [
        {
            type: 'SUB_COMMAND',
            name: 'embed',
            description: 'Sends an embedded message.',
            options: [
                {
                    name: 'title',
                    type: 'STRING',
                    description: 'Define a title for the embedded message.',
                    required: true
                },
                {
                    name: 'description',
                    type: 'STRING',
                    description: 'Define a description for the embedded message.'
                }
            ]
        },
        {
            type: 'SUB_COMMAND',
            name: 'purge',
            description: 'Deletes multiple messages at once.',
            options: [
                {
                    name: 'amount',
                    type: 'INTEGER',
                    description: 'Define how many messages you want to delete.',
                    required: true
                }
            ]
        }
    ],

    callback: async ({ guild, interaction, channel, message }) => {
        const subcommand = interaction.options.getSubcommand()
        const title = interaction.options.getString('title')
        const description = interaction.options.getString('description')
        const amount = interaction.options.getInteger('amount')
        const webhook = new WebhookClient({ url: process.env.COMMANDS_URL! })

        if (subcommand === 'embed') {
            const embedOk = new MessageEmbed()
                .setTitle(`mod ${subcommand} ${title} ${description} in ${guild?.name}`)
                .setColor('GREEN')
            await webhook.send({ embeds: [embedOk] })

            return embed(title!, description!, channel)

        } else if (subcommand === 'purge') {
            const embedOk = new MessageEmbed()
                .setTitle(`mod ${subcommand} ${amount} in ${guild?.name}`)
                .setColor('GREEN')
            await webhook.send({ embeds: [embedOk] })

            return purge(amount!, message, channel)

        }
    }
} as ICommand

async function embed(title: string, description: string, channel: TextChannel) {
    let json;

    if (description === null) {
        json = JSON.parse(`{"title":"${title}"}`);
    } else {
        json = JSON.parse(`{"title":"${title}","description":"${description}"}`);
    }

    const embed = new MessageEmbed(json).setColor("RANDOM");

    channel.send({
        embeds: [embed]
    });
}

async function purge(amount: number, message: Message<boolean>, channel: TextChannel) {
    if (amount > 100) {
        return "Value should be less than or equal to 100."
    }

    if (amount < 1) {
        return "Amount should be higher than 0. pls"
    }

    if (message) {
        await message.delete();
    }

    const messages = await channel.messages.fetch({ limit: amount });

    messages.forEach((message: { delete: () => any; }) => message.delete());
}