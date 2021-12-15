import { CacheType, Collection, CommandInteraction, GuildMember, Message, MessageAttachment } from "discord.js";
import { ICommand } from "wokcommands";
const Canvas = require('canvas')

export default {
    category: 'Image',
    description: 'Make an image koekerond jung.',

    slash: 'both',

    maxArgs: 1,
    expectedArgs: '<user>',
    expectedArgsTypes: ['USER'],

    callback: async ({ message, interaction }) => {
        console.log(`koekerond`)

        const target = message ? message.mentions.members?.first() : interaction.options.getMember('user') as GuildMember

        await koekerond(target, interaction, message)
    }
} as ICommand

async function koekerond(target: GuildMember | undefined, interaction: CommandInteraction<CacheType>, message: Message<boolean>) {
    if (!target) {
        previousKoekerond(interaction, message)
    } else {
        await targetKoekerond(interaction, message, target)
    }
}

function previousKoekerond(interaction: CommandInteraction<CacheType>, message: Message<boolean>) {
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
    const height = 400
    const width = 400

    const canvas = Canvas.createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    const koekerond = await Canvas.loadImage("./images/koekerond.png");

    ctx.drawImage(koekerond, 0, 0, canvas.width, canvas.height)

    ctx.beginPath()
    ctx.arc(200, 185, 100, 0, Math.PI * 2, true)
    ctx.closePath()
    ctx.clip()
    ctx.drawImage(image, 100, 85, 200, 200)
    return canvas;
}

function createMessage(canvas: any, message: Message<boolean>) {
    const attachment = new MessageAttachment(canvas.toBuffer(), 'koekerond.png');

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
    const height = 400
    const width = 400

    const canvas = Canvas.createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    const koekerond = await Canvas.loadImage("./images/koekerond.png");

    ctx.drawImage(koekerond, 0, 0, canvas.width, canvas.height)

    ctx.beginPath()
    ctx.arc(200, 185, 100, 0, Math.PI * 2, true)
    ctx.closePath()
    ctx.clip()
    ctx.drawImage(image, 100, 85, 200, 200)
    return canvas;
}

function createInteraction(canvas: any, interaction: CommandInteraction<CacheType>) {
    const attachment = new MessageAttachment(canvas.toBuffer(), 'koekerond.png');

    interaction.reply({
        files: [attachment]
    });
}

async function targetKoekerond(interaction: CommandInteraction<CacheType>, message: Message<boolean>, target: GuildMember) {
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

    const canvas = Canvas.createCanvas(400, 400)
    const ctx = canvas.getContext('2d')

    const koekerond = await Canvas.loadImage("./images/koekerond.png")

    ctx.drawImage(koekerond, 0, 0, canvas.width, canvas.height)

    ctx.beginPath()
    ctx.arc(200, 185, 100, 0, Math.PI * 2, true)
    ctx.closePath()
    ctx.clip()
    ctx.drawImage(avatar, 100, 85, 200, 200)
    return canvas;
}

function createTarget(canvas: any, interaction: CommandInteraction<CacheType>, message: Message<boolean>) {
    const attachment = new MessageAttachment(canvas.toBuffer(), 'koekerond.png');

    if (!interaction) {
        message.channel.send({ files: [attachment] });
    } else {
        interaction.reply({
            files: [attachment]
        });
    }
}