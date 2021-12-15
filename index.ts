global.AbortController = require("abort-controller")
import DiscordJS, { Intents } from 'discord.js'
import WOKCommands from 'wokcommands'
import path from 'path'
import dotenv from 'dotenv'
const music = require("@koenie06/discord.js-music")
const Errorhandler = require("discord-error-handler")
dotenv.config()

const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_VOICE_STATES,
    ]
})

const handle = new Errorhandler(client, {
    webhook: {id: process.env.WEBHOOK_ID, token: process.env.WEBHOOK_TOKEN}
})

client.on('ready', () => {
    console.log(`Count servers: ${client.guilds.cache.size}`)

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
                name: 'NSFW',
                emoji: '🔞'
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

    setInterval(() => {
        client.user?.setActivity(`$help | barking in ${client.guilds.cache.size} servers`, {type: 'PLAYING'})
  }, 1000 * 60 * 5);
  
})

client.on('messageCreate', async message =>{
    try {
        if (message.author.bot) return;
    }catch(err){
        handle.createrr(client, message.guild?.id, message.content, err)
    }
})

client.on('interactionCreate', async interaction => {
    try {
        if (interaction.user.bot) return;
    }catch(err){
        handle.createrr(client, interaction.guild?.id, interaction.applicationId, err)
    }
})

client.login(process.env.TOKEN)
process.on('unhandledRejection', err => {
    handle.createrr(client,undefined, undefined, err)
})