import { GuildMember, MessageEmbed, WebhookClient } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Text',
    description: 'Measure the eboyness of a user.',

    slash: 'both',

    maxArgs: 1,
    expectedArgs: '<user>',
    expectedArgsTypes: ['USER'],

    callback: async ({ message, interaction, guild }) => {
        const webhook = new WebhookClient({ url: process.env.COMMANDS_URL! })
        const embed = new MessageEmbed()
            .setTitle(`eboyrate in ${guild?.name}`)
            .setColor('GREEN')
        await webhook.send({embeds: [embed]})

        const target = message ? message.mentions.members?.first() : interaction.options.getMember('user') as GuildMember

        return eboyrate(target)
    }
} as ICommand

function eboyrate(target: GuildMember | undefined) {
    return createEmbed(target)
}

function createEmbed(target: GuildMember | undefined) {
    if (!target) {
        return createOwnEmbed();
    } else {
        return createTargetEmbed(target);
    }
}

function createTargetEmbed(target: GuildMember) {
    const embed = new MessageEmbed()
        .setTitle(`${target.user.username} is ${getEboyRate()}% e-boy ⛓️💀🖤`);
    return embed;
}

function createOwnEmbed() {
    const embed = new MessageEmbed()
        .setTitle(`You are ${getEboyRate()}% e-boy ⛓️💀🖤`);
    return embed;
}

function getEboyRate() {
    return Math.floor(Math.random() * 101)
}
