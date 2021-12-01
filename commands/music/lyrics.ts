import { ICommand } from "wokcommands";
import Genius from "genius-lyrics";
import { MessageEmbed } from "discord.js";
const Client = new Genius.Client

export default {
    category: "Music",
    description: "Get the lyrics of a song",

    slash: "both",

    minArgs: 1,
    expectedArgs: '<song>',
    expectedArgsTypes: ['STRING'],

    callback: async ({ message, interaction }) => {
        let song
        if (!interaction) {
            song = message.content.slice(8)
        } else {
            song = interaction.options.getString("song")!
        }

        const searches = await Client.songs.search(song)

        const firstSong = searches[0]

        const title = firstSong.title
        const artist = firstSong.artist.name
        const albumImage = firstSong.image
        const lyrics = await firstSong.lyrics()

        const embed = new MessageEmbed()
            .setTitle(`${artist} - ${title}`)
            .setDescription(lyrics)
            .setThumbnail(albumImage)
        return embed
    }
} as ICommand