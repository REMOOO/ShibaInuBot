import { CacheType, Collection, CommandInteraction, GuildMember, Message, MessageAttachment, TextChannel } from "discord.js";
import { ICommand } from "wokcommands";
const Canvas = require('canvas')

export default {
    category: 'Image',
    description: 'Add adidas logo to an image.',

    slash: 'both',

    maxArgs: 1,
    expectedArgs: '<user>',
    expectedArgsTypes: ['USER'],

    callback: async ({ channel, message, interaction }) => {
        console.log(`adidas`)

        const target = message ? message.mentions.members?.first() : interaction.options.getMember('user') as GuildMember

        await adidas(target, interaction, channel, message)
    }
} as ICommand

async function adidas(target: GuildMember | undefined, interaction: CommandInteraction<CacheType>, channel: TextChannel, message: Message<boolean>) {
    if (!target) {
        previousAdidas(interaction, channel, message)
    } else {
        await targetAdidas(interaction, channel, message, target)
    }
}

function previousAdidas(interaction: CommandInteraction<CacheType>, channel: TextChannel, message: Message<boolean>) {
    if (!interaction) {
        if (botHasPermissionsMessage(channel, message)) {
            previousMessage(message)
        }
    } else {
        if (botHasPermissionsInteraction(channel, interaction)) {
            previousInteraction(interaction)
        }
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
    const height = lastMessage?.attachments.first()?.height;
    const width = lastMessage?.attachments.first()?.width

    const canvas = Canvas.createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    const adidas = await Canvas.loadImage("./images/adidas.png");

    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    ctx.drawImage(adidas, canvas.width - 140, canvas.height - 135, 120, 120);
    return canvas;
}

function createMessage(canvas: any, message: Message<boolean>) {
    const attachment = new MessageAttachment(canvas.toBuffer(), 'adidas.png');

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
    const height = lastMessage?.attachments.first()?.height;
    const width = lastMessage?.attachments.first()?.width;

    const canvas = Canvas.createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    const adidas = await Canvas.loadImage("./images/adidas.png");

    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    ctx.drawImage(adidas, canvas.width - 140, canvas.height - 135, 120, 120);
    return canvas;
}

function createInteraction(canvas: any, interaction: CommandInteraction<CacheType>) {
    const attachment = new MessageAttachment(canvas.toBuffer(), 'adidas.png');

    interaction.reply({
        files: [attachment]
    });
}

async function targetAdidas(interaction: CommandInteraction<CacheType>, channel: TextChannel, message: Message<boolean>, target: GuildMember) {
    if (!interaction) {
        if (botHasPermissionsMessage(channel, message)) {
            const canvas = await createTargetCanvas(target)
            createTarget(canvas, interaction, message)
        }
    } else {
        if (botHasPermissionsInteraction(channel, interaction)) {
            const canvas = await createTargetCanvas(target)
            createTarget(canvas, interaction, message)
        }
    }
}

async function createTargetCanvas(target: GuildMember) {
    const avatar = await Canvas.loadImage(
        target.user.displayAvatarURL({
            format: 'png',
            size: 4096
        })
    );

    const canvas = Canvas.createCanvas(500, 500);
    const ctx = canvas.getContext('2d');

    const adidas = await Canvas.loadImage("./images/adidas.png");

    ctx.drawImage(avatar, 0, 0, canvas.width, canvas.height);

    ctx.drawImage(adidas, canvas.width - 140, canvas.height - 135, 120, 120);
    return canvas;
}

function createTarget(canvas: any, interaction: CommandInteraction<CacheType>, message: Message<boolean>) {
    const attachment = new MessageAttachment(canvas.toBuffer(), 'adidas.png');

    if (!interaction) {
        message.channel.send({ files: [attachment] });
    } else {
        interaction.reply({
            files: [attachment]
        });
    }
}

function botHasPermissionsInteraction(channel: TextChannel, interaction: CommandInteraction<CacheType>) {
    return channel.permissionsFor(interaction.guild?.me!).has("SEND_MESSAGES");
}

function botHasPermissionsMessage(channel: TextChannel, message: Message<boolean>) {
    return channel.permissionsFor(message.guild?.me!).has("SEND_MESSAGES");
}