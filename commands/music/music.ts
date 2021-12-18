import { CacheType, CommandInteraction, MessageEmbed, VoiceChannel, WebhookClient } from "discord.js";
import { ICommand } from "wokcommands";
const music = require("@koenie06/discord.js-music")
import Genius from "genius-lyrics";
const Client = new Genius.Client

export default {
    category: 'Music',
    description: 'Play some music.',

    slash: true,

    options: [
        {
            type: 'SUB_COMMAND',
            name: 'jump',
            description: 'Jump to the given queue number song.',
            options: [
                {
                    name: 'number',
                    type: 'INTEGER',
                    description: 'Give the queue number you want to jump to.',
                    required: true
                }
            ]
        },
        {
            type: 'SUB_COMMAND',
            name: 'lyrics',
            description: 'Get the lyrics of a song.',
            options: [
                {
                    name: 'song',
                    type: 'STRING',
                    description: 'Define the song you want the lyrics of.',
                    required: true
                }
            ]
        },
        {
            type: 'SUB_COMMAND',
            name: 'pause',
            description: 'Pause a song.'
        },
        {
            type: 'SUB_COMMAND',
            name: 'play',
            description: 'Play a song.',
            options: [
                {
                    name: 'song',
                    type: 'STRING',
                    description: 'Define the song you want to hear.',
                    required: true
                }
            ]
        },
        {
            type: 'SUB_COMMAND',
            name: 'queue',
            description: 'Get the queue.'
        },
        {
            type: 'SUB_COMMAND',
            name: 'removequeue',
            description: 'Remove the given queue number song.',
            options: [
                {
                    name: 'number',
                    type: 'INTEGER',
                    description: 'Give the queue number you want to remove.',
                    required: true
                }
            ]
        },
        {
            type: 'SUB_COMMAND',
            name: 'repeat',
            description: 'Repeat the song.',
            options: [
                {
                    name: 'onoroff',
                    type: 'BOOLEAN',
                    description: 'Define if you want the song on repeat.',
                    required: true
                }
            ]
        },
        {
            type: 'SUB_COMMAND',
            name: 'resume',
            description: 'Resume a song.'
        },
        {
            type: 'SUB_COMMAND',
            name: 'skip',
            description: 'Skip a song.'
        },
        {
            type: 'SUB_COMMAND',
            name: 'stop',
            description: 'Stop a song.'
        },
        {
            type: 'SUB_COMMAND',
            name: 'volume',
            description: 'This is for trolling tbh, 1 is default.',
            options: [
                {
                    name: 'volume',
                    type: 'INTEGER',
                    description: 'Define how loud you want the music to blast.',
                    required: true
                }
            ]
        }
    ],

    callback: async ({ guild, interaction }) => {
        const subcommand = interaction.options.getSubcommand()
        const number = interaction.options.getInteger('number')
        const song = interaction.options.getString('song')
        const onoroff = interaction.options.getBoolean('onoroff')
        const volume = interaction.options.getInteger('volume')

        const webhook = new WebhookClient({ url: process.env.COMMANDS_URL! })

        if (subcommand === 'jump') {
            const embed = new MessageEmbed()
                .setTitle(`music ${subcommand} ${number} in ${guild?.name}`)
                .setColor('GREEN')
            await webhook.send({ embeds: [embed] })

            return jump(number!, interaction)

        } else if (subcommand === 'lyrics') {
            const embed = new MessageEmbed()
                .setTitle(`music ${subcommand} ${song} in ${guild?.name}`)
                .setColor('GREEN')
            await webhook.send({ embeds: [embed] })

            return lyrics(song!)

        } else if (subcommand === 'pause') {
            const embed = new MessageEmbed()
                .setTitle(`music ${subcommand} in ${guild?.name}`)
                .setColor('GREEN')
            await webhook.send({ embeds: [embed] })

            return pause(interaction)

        } else if (subcommand === 'play') {
            const embed = new MessageEmbed()
                .setTitle(`music ${subcommand} ${song} in ${guild?.name}`)
                .setColor('GREEN')
            await webhook.send({ embeds: [embed] })

            return play(song!, interaction)

        } else if (subcommand === 'queue') {
            const embed = new MessageEmbed()
                .setTitle(`music ${subcommand} in ${guild?.name}`)
                .setColor('GREEN')
            await webhook.send({ embeds: [embed] })

            return queue(interaction)

        } else if (subcommand === 'removequeue') {
            const embed = new MessageEmbed()
                .setTitle(`music ${subcommand} ${number} in ${guild?.name}`)
                .setColor('GREEN')
            await webhook.send({ embeds: [embed] })

            return removequeue(number!, interaction)

        } else if (subcommand === 'repeat') {
            const embed = new MessageEmbed()
                .setTitle(`music ${subcommand} ${onoroff} in ${guild?.name}`)
                .setColor('GREEN')
            await webhook.send({ embeds: [embed] })

            return repeat(onoroff!, interaction)

        } else if (subcommand === 'resume') {
            const embed = new MessageEmbed()
                .setTitle(`music ${subcommand} in ${guild?.name}`)
                .setColor('GREEN')
            await webhook.send({ embeds: [embed] })

            return resume(interaction)

        } else if (subcommand === 'skip') {
            const embed = new MessageEmbed()
                .setTitle(`music ${subcommand} in ${guild?.name}`)
                .setColor('GREEN')
            await webhook.send({ embeds: [embed] })

            return skip(interaction)

        } else if (subcommand === 'stop') {
            const embed = new MessageEmbed()
                .setTitle(`music ${subcommand} in ${guild?.name}`)
                .setColor('GREEN')
            await webhook.send({ embeds: [embed] })

            return stop(interaction)

        } else if (subcommand === 'volume') {
            const embed = new MessageEmbed()
                .setTitle(`music ${subcommand} ${volume} in ${guild?.name}`)
                .setColor('GREEN')
            await webhook.send({ embeds: [embed] })

            return volumeCmd(volume!, interaction)

        }
    }
} as ICommand

async function jump(number: number, interaction: CommandInteraction<CacheType>) {
    const isConnected = await music.isConnected({
        interaction: interaction
    })

    if (!isConnected) return interaction.reply({ content: "There are no songs playing, noob.", ephemeral: true })

    const queue = await music.getQueue({
        interaction: interaction
    })

    if (number === queue.length) return interaction.reply({ content: "Can't jump that far. ok", ephemeral: true })

    try {
        await music.jump({
            interaction: interaction,
            number: number
        })

        interaction.reply({ content: "Jumping the song to the given queue number." })
    } catch {
        interaction.reply({ content: "Can't jump that far. ok", ephemeral: true })
    }
}

async function lyrics(song: string) {
    let searches

    try {
        searches = await Client.songs.search(song)
    } catch (error) {
        const embed = new MessageEmbed()
            .setTitle(`No result was found.`)
        return embed
    }

    const firstSong = searches[0]

    const title = firstSong.title
    const artist = firstSong.artist.name
    const albumImage = firstSong.image
    const lyrics = await firstSong.lyrics()

    const embed = new MessageEmbed()
        .setTitle(`${artist} - ${title}`)
        .setDescription(lyrics)
        .setThumbnail(albumImage);
    return embed;
}

async function pause(interaction: CommandInteraction<CacheType>) {
    const isConnected = await music.isConnected({
        interaction: interaction
    })

    if (!isConnected) return interaction.reply({ content: "There are no songs playing, noob.", ephemeral: true})

    music.pause({
        interaction: interaction
    })

    interaction.reply({
        content: "Paused this shit."
    })
}

async function play(song: string, interaction: CommandInteraction<CacheType>) {
    const member = interaction.guild?.members.cache.get(interaction.member.user.id)
    const voiceChannel = member?.voice.channel as VoiceChannel

    if (!voiceChannel) return interaction.reply({
        content: "You need to be in a voice channel!",
        ephemeral: true
    })

    interaction.reply({ content: "Song added", ephemeral: true})

    try {
        await music.play({
            interaction: interaction,
            channel: voiceChannel,
            song: song
        });
    } catch (error) {
        interaction.channel?.send({ content: `There was no song found with the name/URL '${song}', please try again ${member?.user.username}` });
    }
}

async function queue(interaction: CommandInteraction<CacheType>) {
    const isConnected = await music.isConnected({
        interaction: interaction
    })

    if (!isConnected) return interaction.reply({ content: "There are no songs playing, noob.", ephemeral: true})
    
    let queue
    try {
        queue = await music.getQueue({
            interaction: interaction
        })
    } catch (error) {
        return "Queue is empty."
    }

    let response = ``

    for (let i = 1; i < queue.length; i++) {
        response += `${i}. ${queue[i].info.title} - ${queue[i].info.duration}\n`
    }

    try {
        await interaction.reply({ content: response})
    } catch(error) {
        return "Queue is empty."
    }
}

async function removequeue(number: number, interaction: CommandInteraction<CacheType>) {
    const isConnected = await music.isConnected({
        interaction: interaction
    })

    if (!isConnected) return interaction.reply({ content: "There are no songs playing, noob.", ephemeral: true})

    const queue = await music.getQueue({
        interaction: interaction
    })
    if(!queue[number - 1]) return interaction.reply({ content: "That number of the queue doesn't exist. dumb", ephemeral: true})

    try {
        await music.removeQueue({
            interaction: interaction,
            number: number+1
        })
    } catch(error) {
        return "Queue is empty."
    }
    
    interaction.reply({ content: `Removed the ${number}th song of the queue.`})
}

async function repeat(realBoolean: boolean, interaction: CommandInteraction<CacheType>) {
    let boolean
        if (realBoolean === true) {
            boolean = "on"
        } else {
            boolean = "off"
        }
        const isConnected = await music.isConnected({
            interaction: interaction
        })

        if (!isConnected) return interaction.reply({ content: "There are no songs playing, noob.", ephemeral: true})

        const isRepeated = music.isRepeated({
            interaction: interaction
        })

        if (isRepeated === boolean) return interaction.reply({ content: `Repeat mode is already on ${boolean}`, ephemeral: true})

        music.repeat({
            interaction: interaction,
            value: realBoolean
        })

        interaction.reply({ content: `Turned repeat mode to ${boolean}`})
}

async function resume(interaction: CommandInteraction<CacheType>) {
    const isConnected = await music.isConnected({
        interaction: interaction
    })

    if (!isConnected) return interaction.reply({ content: "There are no songs playing, noob.", ephemeral: true})

    music.resume({
        interaction: interaction
    })

    interaction.reply({ content: "Resumed the fire song"})
}

async function skip(interaction: CommandInteraction<CacheType>) {
    const isConnected = await music.isConnected({
        interaction: interaction
    })

    if (!isConnected) return interaction.reply({ content: "There are no songs playing, noob.", ephemeral: true})

    music.skip({
        interaction: interaction
    })

    interaction.reply({ content: "Skipped the trash song" })
}

async function stop(interaction: CommandInteraction<CacheType>) {
    const isConnected = await music.isConnected({
        interaction: interaction
    })

    if (!isConnected) return interaction.reply({ content: "There are no songs playing, noob.", ephemeral: true})

    const queue = music.getQueue({
        interaction: interaction
    })
    if (queue.length === 0) return interaction.reply({ content: "No music is playing.", ephemeral: true})

    interaction.reply({
        content: "Thank you for stopping this shit."
    })

    music.stop({
        interaction: interaction
    })
}

async function volumeCmd(volume: number, interaction: CommandInteraction<CacheType>) {
    if(volume > 100) return interaction.reply({ content: "Can't go higher than 100%. Especially you.", ephemeral: true})
        if (volume === 0) return interaction.reply({ content: "Shiba never plays music at zero volume", ephemeral: true})

        const isConnected = await music.isConnected({
            interaction: interaction
        })

        if (!isConnected) return interaction.reply({ content: "There are no songs playing, noob.", ephemeral: true})

        music.volume({
            interaction: interaction,
            volume: volume
        })
        
        interaction.reply({ content: `Set the volume to ${volume}`})
}