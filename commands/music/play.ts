import { ICommand } from "wokcommands";
const music = require("@koenie06/discord.js-music")
import { CacheType, CommandInteraction, GuildMember, MessageEmbed, VoiceChannel, WebhookClient } from "discord.js";

export default {
    category: "Music",
    description: "Play a song. This only works as a slash command.",

    slash: true,

    minArgs: 1,
    expectedArgs: '<song>',
    expectedArgsTypes: ['STRING'],

    callback: async ({ args, interaction, guild }) => {
        const webhook = new WebhookClient({ url: process.env.COMMANDS_URL! })
        const embed = new MessageEmbed()
            .setTitle(`play ${args[0]} in ${guild?.name}`)
            .setColor('GREEN')
        await webhook.send({embeds: [embed]})

        const song = interaction.options.getString("song") as string
        const member = interaction.guild?.members.cache.get(interaction.member.user.id)
        const voiceChannel = member?.voice.channel as VoiceChannel

        reply(voiceChannel, interaction)

        await play(interaction, voiceChannel, song, member)
    }
} as ICommand

async function play(interaction: CommandInteraction<CacheType>, voiceChannel: VoiceChannel, song: string, member: GuildMember | undefined) {
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

function reply(voiceChannel: VoiceChannel, interaction: CommandInteraction<CacheType>) {
    if (!voiceChannel) return interaction.reply({
        content: "You need to be in a voice channel!",
        ephemeral: true
    })

    interaction.reply({ content: "Song added", ephemeral: true})
}
