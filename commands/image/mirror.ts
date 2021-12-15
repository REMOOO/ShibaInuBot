import { CacheType, Collection, CommandInteraction, GuildMember, Message, MessageAttachment, MessageEmbed, WebhookClient } from "discord.js";
import { ICommand } from "wokcommands";
const Canvas = require('canvas')

export default {
    category: 'Image',
    description: 'Mirror an image.',

    slash: 'both',

    maxArgs: 1,
    expectedArgs: '<user>',
    expectedArgsTypes: ['USER'],

    callback: async ({ message, interaction, guild }) => {
        const webhook = new WebhookClient({ url: process.env.COMMANDS_URL! })
        const embed = new MessageEmbed()
            .setTitle(`mirror in ${guild?.name}`)
            .setColor('GREEN')
        await webhook.send({embeds: [embed]})

        const target = message ? message.mentions.members?.first() : interaction.options.getMember('user') as GuildMember

        await mirror(target, interaction, message);
    }
} as ICommand

async function mirror(target: GuildMember | undefined, interaction: CommandInteraction<CacheType>, message: Message<boolean>) {
    if (!target) {
        previousMirror(interaction, message);
    } else {
        await targetMirror(target, interaction, message);
    }
}

async function targetMirror(target: GuildMember, interaction: CommandInteraction<CacheType>, message: Message<boolean>) {
    const canvas = await createTargetMessage(target);

    createTarget(canvas, interaction, message);
}

function createTarget(canvas: any, interaction: CommandInteraction<CacheType>, message: Message<boolean>) {
    const attachment = new MessageAttachment(canvas.toBuffer(), 'mirror.png');

    if (!interaction) {
        message.channel.send({ files: [attachment] });

    } else {
        interaction.reply({
            files: [attachment]
        });

    }
}

async function createTargetMessage(target: GuildMember) {
    const avatar = await Canvas.loadImage(
        target.user.displayAvatarURL({
            format: 'png',
            size: 4096
        })
    );

    const canvas = Canvas.createCanvas(500, 500);
    const ctx = canvas.getContext('2d');

    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(avatar, 0, 0, canvas.width, canvas.height);
    return canvas;
}

function previousMirror(interaction: CommandInteraction<CacheType>, message: Message<boolean>) {
    if (!interaction) {
        message.channel.messages.fetch().then(async (messages) => {
            const canvas = await createMessageCanvas(messages);
            createMessage(canvas, message);
        });

    } else {
        interaction.channel?.messages.fetch().then(async (messages) => {
            const canvas = await createInteractionCanvas(messages);
            createInteraction(canvas, interaction);
        });

    }
}

function createInteraction(canvas: any, interaction: CommandInteraction<CacheType>) {
    const attachment = new MessageAttachment(canvas.toBuffer(), 'mirror.png');

    interaction.reply({
        files: [attachment]
    });
}

async function createInteractionCanvas(messages: Collection<string, Message<boolean>>) {
    const lastMessage = messages.sort((a, b) => b.createdTimestamp - a.createdTimestamp).filter((m) => m.attachments.size > 0).first();
    const url = lastMessage?.attachments.first()?.url;
    const image = await Canvas.loadImage(url);
    const height = lastMessage?.attachments.first()?.height;
    const width = lastMessage?.attachments.first()?.width;

    const canvas = Canvas.createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    return canvas;
}

function createMessage(canvas: any, message: Message<boolean>) {
    const attachment = new MessageAttachment(canvas.toBuffer(), 'mirror.png');

    message.channel.send({ files: [attachment] });
}

async function createMessageCanvas(messages: Collection<string, Message<boolean>>) {
    const lastMessage = messages.sort((a, b) => b.createdTimestamp - a.createdTimestamp).filter((m) => m.attachments.size > 0).first();
    const url = lastMessage?.attachments.first()?.url;
    const image = await Canvas.loadImage(url);
    const height = lastMessage?.attachments.first()?.height;
    const width = lastMessage?.attachments.first()?.width;

    const canvas = Canvas.createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    return canvas;
}
