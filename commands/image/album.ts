import { CacheType, Collection, CommandInteraction, GuildMember, Message, MessageAttachment, MessageEmbed, WebhookClient } from "discord.js";
import { ICommand } from "wokcommands";
const Canvas = require('canvas')

export default {
    category: 'Image',
    description: 'Make an image work on an album with Death Grips.',

    slash: 'both',

    maxArgs: 1,
    expectedArgs: '<user>',
    expectedArgsTypes: ['USER'],

    callback: async ({ message, interaction, guild }) => {
        const webhook = new WebhookClient({ url: process.env.COMMANDS_URL! })
        const embed = new MessageEmbed()
            .setTitle(`album in ${guild?.name}`)
            .setColor('GREEN')
        await webhook.send({embeds: [embed]})

        const target = message ? message.mentions.members?.first() : interaction.options.getMember('user') as GuildMember

        await album(target, interaction, message)
    }
} as ICommand

async function album(target: GuildMember | undefined, interaction: CommandInteraction<CacheType>, message: Message<boolean>) {
    if (!target) {
        previousAlbum(interaction, message)
    } else {
        await targetAlbum(interaction, message, target)
    }
}

function previousAlbum(interaction: CommandInteraction<CacheType>, message: Message<boolean>) {
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
    const height = 720
    const width = 960

    const canvas = Canvas.createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    const album = await Canvas.loadImage("./images/album.png");

    ctx.drawImage(album, 0, 0, canvas.width, canvas.height);

    ctx.drawImage(image, 25, 145, 920, 650);

    ctx.beginPath()
    ctx.fillStyle = "white"
    ctx.fillRect(350, 100, 200, 40)
    return canvas;
}

function createMessage(canvas: any, message: Message<boolean>) {
    const attachment = new MessageAttachment(canvas.toBuffer(), 'album.png');

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
    const height = 720
    const width = 960

    const canvas = Canvas.createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    const album = await Canvas.loadImage("./images/album.png");

    ctx.drawImage(album, 0, 0, canvas.width, canvas.height);

    ctx.drawImage(image, 25, 145, 920, 650);

    ctx.beginPath()
    ctx.fillStyle = "white"
    ctx.fillRect(350, 100, 200, 40)
    return canvas;
}

function createInteraction(canvas: any, interaction: CommandInteraction<CacheType>) {
    const attachment = new MessageAttachment(canvas.toBuffer(), 'album.png');

    interaction.reply({
        files: [attachment]
    });
}

async function targetAlbum(interaction: CommandInteraction<CacheType>, message: Message<boolean>, target: GuildMember) {
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

    const canvas = Canvas.createCanvas(960, 720);
    const ctx = canvas.getContext('2d');

    const album = await Canvas.loadImage("./images/album.png");

    ctx.drawImage(album, 0, 0, canvas.width, canvas.height);

    ctx.drawImage(avatar, 25, 145, 920, 650);

    ctx.beginPath()
    ctx.fillStyle = "white"
    ctx.fillRect(350, 100, 200, 40)
    
    ctx.fillStyle = "#000000"
    ctx.font = "24px Arial"
    ctx.fillText(`${target.user.username}`, 355, 131)
    return canvas;
}

function createTarget(canvas: any, interaction: CommandInteraction<CacheType>, message: Message<boolean>) {
    const attachment = new MessageAttachment(canvas.toBuffer(), 'album.png');

    if (!interaction) {
        message.channel.send({ files: [attachment] });
    } else {
        interaction.reply({
            files: [attachment]
        });
    }
}
