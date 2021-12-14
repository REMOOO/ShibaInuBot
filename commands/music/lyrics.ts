import { ICommand } from "wokcommands";
import Genius from "genius-lyrics";
import { CacheType, CommandInteraction, Message, MessageEmbed, TextChannel } from "discord.js";
const Client = new Genius.Client

export default {
    category: "Music",
    description: "Get the lyrics of a song",

    slash: "both",

    minArgs: 1,
    expectedArgs: '<song>',
    expectedArgsTypes: ['STRING'],

    callback: async ({ message, interaction, args, channel }) => {
        console.log(`lyrics`)

        let song
        if (!interaction) {
            song = message.content.slice(8)
        } else {
            song = args[0]!
        }

        let searches

        try {
            searches = await Client.songs.search(song)
        } catch(error) {
            const embed = new MessageEmbed()
                .setTitle(`No result was found.`)
            return embed
        }

        const firstSong = searches[0]

        const title = firstSong.title
        const artist = firstSong.artist.name
        const albumImage = firstSong.image
        const lyrics = await firstSong.lyrics()

        if (!interaction) {
            if (botHasPermissionsMessage(channel, message)) {
                return createEmbed(artist, title, lyrics, albumImage)
            }
        } else {
            if (botHasPermissionsInteraction(channel, interaction)) {
                return createEmbed(artist, title, lyrics, albumImage)
            }
        }
    }
} as ICommand

function createEmbed(artist: string, title: string, lyrics: string, albumImage: string) {
    const embed = new MessageEmbed()
        .setTitle(`${artist} - ${title}`)
        .setDescription(lyrics)
        .setThumbnail(albumImage);
    return embed;
}

function botHasPermissionsInteraction(channel: TextChannel, interaction: CommandInteraction<CacheType>) {
    return channel.permissionsFor(interaction.guild?.me!).has("SEND_MESSAGES");
}

function botHasPermissionsMessage(channel: TextChannel, message: Message<boolean>) {
    return channel.permissionsFor(message.guild?.me!).has("SEND_MESSAGES");
}
