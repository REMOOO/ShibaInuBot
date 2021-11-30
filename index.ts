import DiscordJS, { Intents } from 'discord.js'
import WOKCommands from 'wokcommands'
import path from 'path'
import dotenv from 'dotenv'
dotenv.config()

const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    ]
})

client.on('ready', () => {
    const guilds = [""]
    client.guilds.cache.forEach(guild => {
        guilds.push(guild.name)
    })
    console.log(guilds)
    console.log(`Count servers: ${guilds.length - 1}`)

    new WOKCommands(client, {
        commandsDir: path.join(__dirname, 'commands'),
        typeScript: true,
        testServers: '914555144039972944',
        botOwners: '267411432339931137',
    })
        .setDefaultPrefix('$')
        .setCategorySettings([
            {
                name: 'Text',
                emoji: '👩‍💻'
            },
            {
                name: 'Image',
                emoji: '📷'
            },
            {
                name: 'Moderation',
                emoji : '🛡️'
            }
        ])
})

client.login(process.env.TOKEN)