import DiscordJS, { Intents } from 'discord.js'
import dotenv from 'dotenv'
dotenv.config()

const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
})

client.on('ready', () => {
    console.log('The bot is ready')

    const commands = client.application?.commands

    commands?.create({
        name: 'shiba',
        description: 'Replies with shiba',
    })

    commands?.create({
        name: 'add',
        description: 'Adds two numbers',
        options: [
            {
                name: 'num1',
                description: 'The first number',
                required: true,
                type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER,
            },
            {
                name: 'num2',
                description: 'The second number',
                required: true,
                type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER,
            },
        ],
    })
})

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) {
        return
    }

    const { commandName, options } = interaction

    if (commandName === 'shiba') {
        interaction.reply({
            content: 'inu',
            ephemeral: true,
        })
    } else if (commandName === 'add') {
        const num1 = options.getNumber('num1')!
        const num2 = options.getNumber('num2')!

        interaction.reply({
            content: `The sum is ${num1 + num2}`
        })
    }
})

client.on('messageCreate', (message) => {
    if (message.content === 'shiba') {
        message.reply({
            content: 'inu',
        })
    }
})

client.on('messageCreate', (message) => {
    if (message.content === 'snapj') {
        message.reply({
            content: 'dagal',
        })
    }
})

client.login(process.env.TOKEN)