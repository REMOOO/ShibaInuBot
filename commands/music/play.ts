import { ICommand } from "wokcommands";
const music = require("@koenie06/discord.js-music")
import { VoiceChannel } from "discord.js";

export default {
    category: "Music",
    description: "Play a song. This only works as a slash command.",

    slash: true,

    minArgs: 1,
    expectedArgs: '<song>',
    expectedArgsTypes: ['STRING'],

    callback: async ({ interaction}) => {
        const song = interaction.options.getString("song") as string
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
            })
        } catch(error) {
            interaction.channel?.send({ content: `There was no song found with the name/URL '${song}', please try again ${member?.user.username}`})
        }
    }
} as ICommand