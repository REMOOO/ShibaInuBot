import { CacheType, CommandInteraction, GuildMember, Message, MessageEmbed, TextChannel } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Image',
    description: 'Get the avatar image of a user.',
    aliases: ['av', 'pfp'],

    slash: 'both',
    
    maxArgs: 1,
    expectedArgs: '<user>',
    expectedArgsTypes: ['USER'],

    callback: ({ message, interaction }) => {
        console.log(`avatar`)

        const target = message ? message.mentions.members?.first() : interaction.options.getMember('user') as GuildMember
        if (!target) {
            return ownAvatar(interaction, message)
        } else {
            return targetAvatar(target)
        }
    }
} as ICommand

function targetAvatar(target: GuildMember) {
    return createTargetEmbed(target);
}

function ownAvatar(interaction: CommandInteraction<CacheType>, message: Message<boolean>) {
    if (!interaction) {
            return createOwnMessageEmbed(message);
        
    } else {
            return createOwnInteractionEmbed(interaction);
        
    }
}

function createOwnInteractionEmbed(interaction: CommandInteraction<CacheType>) {
    const embed = new MessageEmbed()
        .setTitle(`Your avatar`)
        .setImage(`${interaction.user.displayAvatarURL({ dynamic: true, size: 4096 })}`);
    return embed;
}

function createOwnMessageEmbed(message: Message<boolean>) {
    const embed = new MessageEmbed()
        .setTitle(`Your avatar`)
        .setImage(`${message.author.displayAvatarURL({ dynamic: true, size: 4096 })}`);
    return embed;
}

function createTargetEmbed(target: GuildMember) {
    const embed = new MessageEmbed()
        .setTitle(`Avatar of ${target.user.username}`)
        .setImage(`${target.user.displayAvatarURL({ dynamic: true, size: 4096 })}`);
    return embed;
}
