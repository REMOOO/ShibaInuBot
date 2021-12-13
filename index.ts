global.AbortController = require("abort-controller")
import DiscordJS, { Intents } from 'discord.js'
import WOKCommands from 'wokcommands'
import path from 'path'
import dotenv from 'dotenv'
const music = require("@koenie06/discord.js-music")
dotenv.config()

const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_VOICE_STATES,
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
        mongoUri: process.env.MONGO,
        dbOptions: {
            keepAlive: true
        }
    })
        .setDefaultPrefix('$')
        .setCategorySettings([
            {
                name: 'Text',
                emoji: '👩‍💻'
            },
            {
                name: 'Cryptocurrency',
                emoji: '💰'
            },
            {
                name: 'Image',
                emoji: '📷'
            },
            {
                name: 'Music',
                emoji: '🎶'
            },
            {
                name: 'Moderation',
                emoji : '🛡️'
            }
        ])
    
    music.event.on('playSong', async (channel: { send: (arg0: { content: string }) => void }, songInfo: { title: any, duration: any, url: any }, requester: { tag: any }) => {
        channel.send({ content: `Now playing: **${songInfo.title}**\nRequested by \`${requester.tag}\`\nDuration: ${songInfo.duration}\n(${songInfo.url})`})
    })

    music.event.on('addSong', async (channel: { send: (arg0: { content: string }) => void }, songInfo: { title: any; duration: any; url: any }, requester: { tag: any }) => {
        channel.send({ content: `Added the song: **${songInfo.title}**\nRequested by \`${requester.tag}\`\nDuration: ${songInfo.duration}\n(${songInfo.url})`})
    })

    music.event.on('playList', async (channel: { send: (arg0: { content: string }) => void }, playlist: { title: any }, songInfo: { title: any; author: any; duration: any; url: any }, requester: { tag: any }) => {
        channel.send({
            content: `Now playing: **${songInfo.title}** by **${songInfo.author}**\nPlaylist: ${playlist.title}\nRequested by \`${requester.tag}\`\n(${songInfo.url})`
        })
    })

    music.event.on('addList', async (channel: { send: (arg0: { content: string }) => void }, playlist: { title: any; videos: string | any[]; url: any }, requester: { tag: any }) => {
        channel.send({
            content: `Added the playlist: **${playlist.title}**\nRequested by \`${requester.tag}\`\nAmount of videos: ${playlist.videos.length}\n(${playlist.url})}`
        })
    })

    music.event.on('finish', async (channel: { send: (arg0: { content: string }) => void }) => {
        try {
            channel.send({ content: "All music has been played, bye." })
        } catch(err) {
            console.log(err)
            return "Music finish error. Please report this ty"
        }
    })
})

client.login(process.env.TOKEN)