import { CacheType, CommandInteraction, Interaction, MessageActionRow, MessageButton, MessageEmbed, TextChannel, WebhookClient } from "discord.js";
import { ICommand } from "wokcommands";
const redditFetch = require('reddit-fetch')
import { fortunes } from "../../lists/fortunes";
import { pickuplines } from "../../lists/pickuplines";

export default {
    category: 'Text',
    description: 'Get something random.',

    slash: true,

    options: [
        {
            type: 'SUB_COMMAND',
            name: 'copypasta',
            description: 'Get a random copypasta.'
        },
        {
            type: 'SUB_COMMAND',
            name: 'emojipasta',
            description: 'Get a random emojipasta.'
        },
        {
            type: 'SUB_COMMAND',
            name: 'joke',
            description: 'Get a random joke.'
        },
        {
            type: 'SUB_COMMAND',
            name: 'fortune',
            description: 'Get a random fortune cookie.'
        },
        {
            type: 'SUB_COMMAND',
            name: 'number',
            description: 'Get a random number in an inclusive interval.',
            options: [
                {
                    name: 'min',
                    type: 'INTEGER',
                    description: 'The minimum included number.',
                    required: true
                },
                {
                    name: 'max',
                    type: 'INTEGER',
                    description: 'The maximum included number.',
                    required: true
                }
            ]
        },
        {
            type: 'SUB_COMMAND',
            name: 'pickupline',
            description: 'Get a random pickupline.'
        },
    ],

    callback: async ({ guild, interaction, channel, args }) => {
        const subcommand = interaction.options.getSubcommand()
        const webhook = new WebhookClient({ url: process.env.COMMANDS_URL! })
        const embed = new MessageEmbed()
            .setTitle(`${subcommand} in ${guild?.name}`)
            .setColor('GREEN')
        await webhook.send({ embeds: [embed] })

        if (subcommand === 'copypasta') {
            return random(subcommand)

        } else if (subcommand === 'emojipasta') {
            return random(subcommand)
            
        } else if (subcommand === 'joke') {
            return random('jokes')

        } else if (subcommand === 'fortune') {
            await fortuneInt(interaction, channel)

        } else if (subcommand === 'number') {
            const min = interaction.options.getInteger('min')!
            const max = interaction.options.getInteger('max')!

            return randomnumber(min, max)
        } else if (subcommand === "pickupline") {
            const randomNumber = Math.floor(Math.random() * 2)

            if (randomNumber === 0) {
                return pickupline()
            } else {
                return random('pickuplines')
            }
        }
    },
} as ICommand


async function random(subject: string) {
    const res = await redditFetch({

        subreddit: subject,
        sort: 'hot',
        allowNSFW: true

    })

    const title = res.title
    const desc = res.selftext

    try {
        const embed = new MessageEmbed()
            .setTitle(title)
            .setDescription(desc)
            .setColor('RANDOM')
        return embed
    } catch (err) {
        return `Found ${subject} was too long... Try again.`
        
    }
}

async function fortuneInt(msgInt: CommandInteraction<CacheType>, channel: TextChannel) {
    const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('fortune_cookie')
                .setEmoji('🥠')
                .setLabel('Eat cookie')
                .setStyle('SUCCESS')
        )
        .addComponents(
            new MessageButton()
                .setCustomId('no_fortune_cookie')
                .setLabel("I don't like cookie")
                .setStyle('DANGER')
        );

    const embed = new MessageEmbed()
        .setTitle('Eat your fortune cookie to find your fortune')
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
        max: 1,
        time: 1000 * 15
    });

    collector.on('end', async (collection) => {
        if (collection.first()?.customId === 'fortune_cookie') {
            const embed = new MessageEmbed()
                .setTitle(getRandomFortune())
                .setColor('RANDOM')

            await msgInt.editReply({
                embeds: [embed],
                components: [],
            });
        } else {
            const embed = new MessageEmbed()
                .setTitle('shibe will eat your cookie 🙏')
                .setColor('RANDOM')
            await msgInt.editReply({
                embeds: [embed],
                components: [],
            });
        }
    });
}

function getRandomFortune() {
    const random = Math.floor(Math.random() * fortunes.length);
    return fortunes[random]
}

async function randomnumber(min: number, max: number) {
    if (max < min) {
        return "The max number should be higher than the min number... Obviously."
    }

    const random = getRandomInt(min, max)

    try {
        return createEmbedNumber(min, max, random);
    } catch (err) {
        console.log(err)
        return "Randomnumber error. Please report this in the support server if you want this to be fixed :)."
    }
}

function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function createEmbedNumber(min: number, max: number, random: number) {
    const embed = new MessageEmbed()
        .setTitle(`A random number between ${min} and ${max}:`)
        .setDescription(`${random}`)
        .setColor("RANDOM");
    return embed;
}

async function pickupline() {
    const embed = new MessageEmbed()
        .setTitle(getRandomPickupline())
        .setColor('RANDOM')
    return embed
}

function getRandomPickupline() {
    const random = Math.floor(Math.random() * pickuplines.length);
    return pickuplines[random]
}
