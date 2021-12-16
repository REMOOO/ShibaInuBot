import { CacheType, Collection, CommandInteraction, GuildMember, Message, MessageAttachment, MessageEmbed, WebhookClient } from "discord.js";
import { ICommand } from "wokcommands";
const Canvas = require('canvas')

export default {
    category: 'Image',
    description: 'Let Ye hold an image.',
    aliases: ['ye'],

    slash: 'both',

    maxArgs: 1,
    expectedArgs: '<user>',
    expectedArgsTypes: ['USER'],

    callback: async ({ message, interaction, guild }) => {
        const webhook = new WebhookClient({ url: process.env.COMMANDS_URL! })
        const embed = new MessageEmbed()
            .setTitle(`kanye in ${guild?.name}`)
            .setColor('GREEN')
        await webhook.send({embeds: [embed]})

        const target = message ? message.mentions.members?.first() : interaction.options.getMember('user') as GuildMember

        await kanye(target, interaction, message)
    }
} as ICommand

async function kanye(target: GuildMember | undefined, interaction: CommandInteraction<CacheType>, message: Message<boolean>) {
    if (!target) {
        previousKanye(interaction, message)
    } else {
        await targetKanye(interaction, message, target)
    }
}

function previousKanye(interaction: CommandInteraction<CacheType>, message: Message<boolean>) {
    if (!interaction) {
            previousMessage(message)
        
    } else {
            previousInteraction(interaction)
        
    }
}

function previousMessage(message: Message<boolean>) {
    message.channel.messages.fetch().then(async (messages) => {
        const canvas = await createMessageCanvas(messages);
        createMessage(canvas, message);
    });
}

async function createMessageCanvas(messages: Collection<string, Message<boolean>>) {
    const lastMessage = messages.sort((a, b) => b.createdTimestamp - a.createdTimestamp).filter((m) => m.attachments.size > 0).first();
    const url = lastMessage?.attachments.first()?.url;
    const image = await Canvas.loadImage(url);
    const height = 667
    const width = 500

    const canvas = Canvas.createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    const kanye = await Canvas.loadImage("./images/kanye.png");

    ctx.drawImage(kanye, 0, 0, canvas.width, canvas.height);

    ctx.rotate(1.5 * Math.PI / 180)
    ctx.drawImage(image, 135, 275, 248, 301);
    return canvas;
}

function createMessage(canvas: any, message: Message<boolean>) {
    const attachment = new MessageAttachment(canvas.toBuffer(), 'kanye.png');

    message.channel.send({ files: [attachment] });
}

function previousInteraction(interaction: CommandInteraction<CacheType>) {
    interaction.channel?.messages.fetch().then(async (messages) => {
        const canvas = await createInteractionCanvas(messages);
        createInteraction(canvas, interaction);
    });
}

async function createInteractionCanvas(messages: Collection<string, Message<boolean>>) {
    const lastMessage = messages.sort((a, b) => b.createdTimestamp - a.createdTimestamp).filter((m) => m.attachments.size > 0).first();
    const url = lastMessage?.attachments.first()?.url;
    const image = await Canvas.loadImage(url);
    const height = 667
    const width = 500

    const canvas = Canvas.createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    const kanye = await Canvas.loadImage("./images/kanye.png");

    ctx.drawImage(kanye, 0, 0, canvas.width, canvas.height);

    ctx.rotate(1.5 * Math.PI / 180)
    ctx.drawImage(image, 135, 275, 248, 301);
    return canvas;
}

function createInteraction(canvas: any, interaction: CommandInteraction<CacheType>) {
    const attachment = new MessageAttachment(canvas.toBuffer(), 'kanye.png');

    interaction.reply({
        files: [attachment]
    });
}

async function targetKanye(interaction: CommandInteraction<CacheType>, message: Message<boolean>, target: GuildMember) {
    const canvas = await createTargetCanvas(target)
            createTarget(canvas, interaction, message)
}

async function createTargetCanvas(target: GuildMember) {
    const avatar = await Canvas.loadImage(
        target.user.displayAvatarURL({
            format: 'png',
            size: 4096
        })
    );

    const canvas = Canvas.createCanvas(500, 667);
    const ctx = canvas.getContext('2d');

    const kanye = await Canvas.loadImage("./images/kanye.png");

    ctx.drawImage(kanye, 0, 0, canvas.width, canvas.height);

    ctx.rotate(1.5 * Math.PI / 180)
    ctx.drawImage(avatar, 135, 275, 248, 301);
    return canvas;
}

function createTarget(canvas: any, interaction: CommandInteraction<CacheType>, message: Message<boolean>) {
    const attachment = new MessageAttachment(canvas.toBuffer(), 'kanye.png');

    if (!interaction) {
        message.channel.send({ files: [attachment] });
    } else {
        interaction.reply({
            files: [attachment]
        });
    }
}
