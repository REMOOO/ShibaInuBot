import { CacheType, Collection, CommandInteraction, GuildMember, Message, MessageAttachment, MessageEmbed, TextChannel } from "discord.js";
import { ICommand } from "wokcommands";
const gm = require("gm"),
    imageMagick = gm.subClass({
        imageMagick: true,
    })
const Canvas = require('canvas')

export default {
    category: 'Image',
    description: 'Magik an image.',

    slash: 'both',

    maxArgs: 1,
    expectedArgs: '<user>',
    expectedArgsTypes: ['USER'],

    callback: async ({ channel, message, interaction }) => {
        const target = message ? message.mentions.members?.first() : interaction.options.getMember('user') as GuildMember
        await magik(target, interaction, channel, message);
    }
} as ICommand

async function magik(target: GuildMember | undefined, interaction: CommandInteraction<CacheType>, channel: TextChannel, message: Message<boolean>) {
    if (!target) {
        previousMagik(interaction, channel, message);
    } else {
        await targetMagik(target, interaction, channel, message);
    }
}

async function targetMagik(target: GuildMember, interaction: CommandInteraction<CacheType>, channel: TextChannel, message: Message<boolean>) {
    const canvas = await createTargetCanvas(target);

    if(!interaction) {
        if (botHasPermissionsMessage(channel, message)) {
            magikTarget(canvas, interaction, message);
        }
    } else {
        if (botHasPermissionsInteraction(channel, interaction)) {
            magikTarget(canvas, interaction, message);
        }
    }
}

function magikTarget(canvas: any, interaction: CommandInteraction<CacheType>, message: Message<boolean>) {
    gm(canvas.toBuffer())
        .implode(-0.2)
        .resize(500, 500)
        .spread(1)
        .region(randomNumber(), randomNumber(), randomNumber(), randomNumber())
        .swirl(50)
        .region(randomNumber(), randomNumber(), randomNumber(), randomNumber())
        .implode(0.2)
        .region(randomNumber(), randomNumber(), randomNumber(), randomNumber())
        .implode(0.3)
        .region(randomNumber(), randomNumber(), randomNumber(), randomNumber())
        .implode(0.2)
        .region(randomNumber(), randomNumber(), randomNumber(), randomNumber())
        .implode(0.1)
        .region(randomNumber(), randomNumber(), randomNumber(), randomNumber())
        .implode(0.2)
        .region(randomNumber(), randomNumber(), randomNumber(), randomNumber())
        .implode(0.1)
        .region(randomNumber(), randomNumber(), randomNumber(), randomNumber())
        .implode(-0.2)
        .region(randomNumber(), randomNumber(), randomNumber(), randomNumber())
        .implode(-0.3)
        .region(randomNumber(), randomNumber(), randomNumber(), randomNumber())
        .implode(-0.2)
        .region(randomNumber(), randomNumber(), randomNumber(), randomNumber())
        .implode(-0.1)
        .region(randomNumber(), randomNumber(), randomNumber(), randomNumber())
        .implode(-0.2)
        .region(randomNumber(), randomNumber(), randomNumber(), randomNumber())
        .implode(-0.1)
        .region(randomNumber(), randomNumber(), randomNumber(), randomNumber())
        .swirl(50)
        .region(randomNumber(), randomNumber(), randomNumber(), randomNumber())
        .implode(0.2)
        .region(randomNumber(), randomNumber(), randomNumber(), randomNumber())
        .implode(0.3)
        .region(randomNumber(), randomNumber(), randomNumber(), randomNumber())
        .implode(0.2)
        .region(randomNumber(), randomNumber(), randomNumber(), randomNumber())
        .implode(0.1)
        .region(randomNumber(), randomNumber(), randomNumber(), randomNumber())
        .implode(0.2)
        .region(randomNumber(), randomNumber(), randomNumber(), randomNumber())
        .implode(0.1)
        .region(randomNumber(), randomNumber(), randomNumber(), randomNumber())
        .implode(-0.2)
        .region(randomNumber(), randomNumber(), randomNumber(), randomNumber())
        .implode(-0.3)
        .region(randomNumber(), randomNumber(), randomNumber(), randomNumber())
        .implode(-0.2)
        .region(randomNumber(), randomNumber(), randomNumber(), randomNumber())
        .implode(-0.1)
        .region(randomNumber(), randomNumber(), randomNumber(), randomNumber())
        .implode(-0.2)
        .region(randomNumber(), randomNumber(), randomNumber(), randomNumber())
        .implode(-0.1)
        .region(randomNumber(), randomNumber(), randomNumber(), randomNumber())
        .swirl(50)
        .region(randomNumber(), randomNumber(), randomNumber(), randomNumber())
        .implode(0.2)
        .region(randomNumber(), randomNumber(), randomNumber(), randomNumber())
        .implode(0.3)
        .region(randomNumber(), randomNumber(), randomNumber(), randomNumber())
        .implode(0.2)
        .region(randomNumber(), randomNumber(), randomNumber(), randomNumber())
        .implode(0.1)
        .region(randomNumber(), randomNumber(), randomNumber(), randomNumber())
        .implode(0.2)
        .region(randomNumber(), randomNumber(), randomNumber(), randomNumber())
        .implode(0.1)
        .region(randomNumber(), randomNumber(), randomNumber(), randomNumber())
        .implode(-0.2)
        .region(randomNumber(), randomNumber(), randomNumber(), randomNumber())
        .implode(-0.3)
        .region(randomNumber(), randomNumber(), randomNumber(), randomNumber())
        .implode(-0.2)
        .region(randomNumber(), randomNumber(), randomNumber(), randomNumber())
        .implode(-0.1)
        .region(randomNumber(), randomNumber(), randomNumber(), randomNumber())
        .implode(-0.2)
        .region(randomNumber(), randomNumber(), randomNumber(), randomNumber())
        .implode(-0.1)
        .noProfile()
        .toBuffer('PNG', function (err: any, buffer: any) {
            createTarget(err, buffer, interaction, message);
        });
}

function createTarget(err: any, buffer: any, interaction: CommandInteraction<CacheType>, message: Message<boolean>) {
    if (err)
        console.log(err);

    const attachment = new MessageAttachment(buffer, 'magik.png');

    if (!interaction) {
        if (buffer === null) {
            message.channel.send("Error, much sad. I couldn't fetch the image in time, please try again.");
        } else {
            message.channel.send({ files: [attachment] });
        }
    } else {
        if (buffer === null) {
            interaction.reply("Error, much sad. I couldn't fetch the image in time, please try again.");
        } else {
            interaction.reply({
                files: [attachment]
            });
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
    ctx.drawImage(avatar, 0, 0, canvas.width, canvas.height);
    return canvas;
}

function previousMagik(interaction: CommandInteraction<CacheType>, channel: TextChannel, message: Message<boolean>) {
    if (!interaction) {
        if (botHasPermissionsMessage(channel, message)) {
            message.channel.messages.fetch().then(async (messages) => {
                const canvas = await createMessageCanvas(messages);
                magikMessage(canvas, message);
            });
        }
    } else {
        if (botHasPermissionsInteraction(channel, interaction)) {
            interaction.channel?.messages.fetch().then(async (messages) => {
                const canvas = await createInteractionCanvas(messages);
                magikInteraction(canvas, interaction);
            });
        }
    }
}

function magikInteraction(canvas: any, interaction: CommandInteraction<CacheType>) {
    gm(canvas.toBuffer())
        .implode(-0.2)
        .resize(500, 500)
        .spread(1)
        .region(randomNumber(), randomNumber(), randomNumber(), randomNumber())
        .swirl(50)
        .region(randomNumber(), randomNumber(), randomNumber(), randomNumber())
        .implode(0.2)
        .region(randomNumber(), randomNumber(), randomNumber(), randomNumber())
        .implode(0.3)
        .region(randomNumber(), randomNumber(), randomNumber(), randomNumber())
        .implode(0.2)
        .region(randomNumber(), randomNumber(), randomNumber(), randomNumber())
        .implode(0.1)
        .region(randomNumber(), randomNumber(), randomNumber(), randomNumber())
        .implode(0.2)
        .region(randomNumber(), randomNumber(), randomNumber(), randomNumber())
        .implode(0.1)
        .region(randomNumber(), randomNumber(), randomNumber(), randomNumber())
        .implode(-0.2)
        .region(randomNumber(), randomNumber(), randomNumber(), randomNumber())
        .implode(-0.3)
        .region(randomNumber(), randomNumber(), randomNumber(), randomNumber())
        .implode(-0.2)
        .region(randomNumber(), randomNumber(), randomNumber(), randomNumber())
        .implode(-0.1)
        .region(randomNumber(), randomNumber(), randomNumber(), randomNumber())
        .implode(-0.2)
        .region(randomNumber(), randomNumber(), randomNumber(), randomNumber())
        .implode(-0.1)
        .region(randomNumber(), randomNumber(), randomNumber(), randomNumber())
        .swirl(50)
        .region(randomNumber(), randomNumber(), randomNumber(), randomNumber())
        .implode(0.2)
        .region(randomNumber(), randomNumber(), randomNumber(), randomNumber())
        .implode(0.3)
        .region(randomNumber(), randomNumber(), randomNumber(), randomNumber())
        .implode(0.2)
        .region(randomNumber(), randomNumber(), randomNumber(), randomNumber())
        .implode(0.1)
        .region(randomNumber(), randomNumber(), randomNumber(), randomNumber())
        .implode(0.2)
        .region(randomNumber(), randomNumber(), randomNumber(), randomNumber())
        .implode(0.1)
        .region(randomNumber(), randomNumber(), randomNumber(), randomNumber())
        .implode(-0.2)
        .region(randomNumber(), randomNumber(), randomNumber(), randomNumber())
        .implode(-0.3)
        .region(randomNumber(), randomNumber(), randomNumber(), randomNumber())
        .implode(-0.2)
        .region(randomNumber(), randomNumber(), randomNumber(), randomNumber())
        .implode(-0.1)
        .region(randomNumber(), randomNumber(), randomNumber(), randomNumber())
        .implode(-0.2)
        .region(randomNumber(), randomNumber(), randomNumber(), randomNumber())
        .implode(-0.1)
        .region(randomNumber(), randomNumber(), randomNumber(), randomNumber())
        .swirl(50)
        .region(randomNumber(), randomNumber(), randomNumber(), randomNumber())
        .implode(0.2)
        .region(randomNumber(), randomNumber(), randomNumber(), randomNumber())
        .implode(0.3)
        .region(randomNumber(), randomNumber(), randomNumber(), randomNumber())
        .implode(0.2)
        .region(randomNumber(), randomNumber(), randomNumber(), randomNumber())
        .implode(0.1)
        .region(randomNumber(), randomNumber(), randomNumber(), randomNumber())
        .implode(0.2)
        .region(randomNumber(), randomNumber(), randomNumber(), randomNumber())
        .implode(0.1)
        .region(randomNumber(), randomNumber(), randomNumber(), randomNumber())
        .implode(-0.2)
        .region(randomNumber(), randomNumber(), randomNumber(), randomNumber())
        .implode(-0.3)
        .region(randomNumber(), randomNumber(), randomNumber(), randomNumber())
        .implode(-0.2)
        .region(randomNumber(), randomNumber(), randomNumber(), randomNumber())
        .implode(-0.1)
        .region(randomNumber(), randomNumber(), randomNumber(), randomNumber())
        .implode(-0.2)
        .region(randomNumber(), randomNumber(), randomNumber(), randomNumber())
        .implode(-0.1)
        .noProfile()
        .toBuffer('PNG', function (err: any, buffer: any) {
            createInteraction(err, buffer, interaction);
        });
}

function createInteraction(err: any, buffer: any, interaction: CommandInteraction<CacheType>) {
    if (err)
        console.log(err);

    const attachment = new MessageAttachment(buffer, 'magik.png');

    if (buffer === null) {
        interaction.reply("Error, much sad. I couldn't fetch the image in time, please try again.");
    } else {
        interaction.reply({
            files: [attachment]
        });
    }
}

async function createInteractionCanvas(messages: Collection<string, Message<boolean>>) {
    const lastMessage = messages.sort((a, b) => b.createdTimestamp - a.createdTimestamp).filter((m) => m.attachments.size > 0).first();
    const url = lastMessage?.attachments.first()?.url;
    const image = await Canvas.loadImage(url);
    const height = lastMessage?.attachments.first()?.height;
    const width = lastMessage?.attachments.first()?.width;

    const canvas = Canvas.createCanvas(width, height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    return canvas;
}

function magikMessage(canvas: any, message: Message<boolean>) {
    gm(canvas.toBuffer())
        .implode(-0.2)
        .resize(500, 500)
        .spread(1)
        .region(randomNumber(), randomNumber(), randomNumber(), randomNumber())
        .swirl(50)
        .region(randomNumber(), randomNumber(), randomNumber(), randomNumber())
        .implode(0.2)
        .region(randomNumber(), randomNumber(), randomNumber(), randomNumber())
        .implode(0.3)
        .region(randomNumber(), randomNumber(), randomNumber(), randomNumber())
        .implode(0.2)
        .region(randomNumber(), randomNumber(), randomNumber(), randomNumber())
        .implode(0.1)
        .region(randomNumber(), randomNumber(), randomNumber(), randomNumber())
        .implode(0.2)
        .region(randomNumber(), randomNumber(), randomNumber(), randomNumber())
        .implode(0.1)
        .region(randomNumber(), randomNumber(), randomNumber(), randomNumber())
        .implode(-0.2)
        .region(randomNumber(), randomNumber(), randomNumber(), randomNumber())
        .implode(-0.3)
        .region(randomNumber(), randomNumber(), randomNumber(), randomNumber())
        .implode(-0.2)
        .region(randomNumber(), randomNumber(), randomNumber(), randomNumber())
        .implode(-0.1)
        .region(randomNumber(), randomNumber(), randomNumber(), randomNumber())
        .implode(-0.2)
        .region(randomNumber(), randomNumber(), randomNumber(), randomNumber())
        .implode(-0.1)
        .region(randomNumber(), randomNumber(), randomNumber(), randomNumber())
        .swirl(50)
        .region(randomNumber(), randomNumber(), randomNumber(), randomNumber())
        .implode(0.2)
        .region(randomNumber(), randomNumber(), randomNumber(), randomNumber())
        .implode(0.3)
        .region(randomNumber(), randomNumber(), randomNumber(), randomNumber())
        .implode(0.2)
        .region(randomNumber(), randomNumber(), randomNumber(), randomNumber())
        .implode(0.1)
        .region(randomNumber(), randomNumber(), randomNumber(), randomNumber())
        .implode(0.2)
        .region(randomNumber(), randomNumber(), randomNumber(), randomNumber())
        .implode(0.1)
        .region(randomNumber(), randomNumber(), randomNumber(), randomNumber())
        .implode(-0.2)
        .region(randomNumber(), randomNumber(), randomNumber(), randomNumber())
        .implode(-0.3)
        .region(randomNumber(), randomNumber(), randomNumber(), randomNumber())
        .implode(-0.2)
        .region(randomNumber(), randomNumber(), randomNumber(), randomNumber())
        .implode(-0.1)
        .region(randomNumber(), randomNumber(), randomNumber(), randomNumber())
        .implode(-0.2)
        .region(randomNumber(), randomNumber(), randomNumber(), randomNumber())
        .implode(-0.1)
        .region(randomNumber(), randomNumber(), randomNumber(), randomNumber())
        .swirl(50)
        .region(randomNumber(), randomNumber(), randomNumber(), randomNumber())
        .implode(0.2)
        .region(randomNumber(), randomNumber(), randomNumber(), randomNumber())
        .implode(0.3)
        .region(randomNumber(), randomNumber(), randomNumber(), randomNumber())
        .implode(0.2)
        .region(randomNumber(), randomNumber(), randomNumber(), randomNumber())
        .implode(0.1)
        .region(randomNumber(), randomNumber(), randomNumber(), randomNumber())
        .implode(0.2)
        .region(randomNumber(), randomNumber(), randomNumber(), randomNumber())
        .implode(0.1)
        .region(randomNumber(), randomNumber(), randomNumber(), randomNumber())
        .implode(-0.2)
        .region(randomNumber(), randomNumber(), randomNumber(), randomNumber())
        .implode(-0.3)
        .region(randomNumber(), randomNumber(), randomNumber(), randomNumber())
        .implode(-0.2)
        .region(randomNumber(), randomNumber(), randomNumber(), randomNumber())
        .implode(-0.1)
        .region(randomNumber(), randomNumber(), randomNumber(), randomNumber())
        .implode(-0.2)
        .region(randomNumber(), randomNumber(), randomNumber(), randomNumber())
        .implode(-0.1)
        .noProfile()
        .toBuffer('PNG', function (err: any, buffer: any) {
            createMessage(err, buffer, message);
        });
}

function createMessage(err: any, buffer: any, message: Message<boolean>) {
    if (err)
        console.log(err);

    const attachment = new MessageAttachment(buffer, 'magik.png');

    if (buffer === null) {
        message.channel.send("Error, much sad. I couldn't fetch the image in time, please try again.");
    } else {
        message.channel.send({ files: [attachment] });
    }
}

async function createMessageCanvas(messages: Collection<string, Message<boolean>>) {
    const lastMessage = messages.sort((a, b) => b.createdTimestamp - a.createdTimestamp).filter((m) => m.attachments.size > 0).first();
    const url = lastMessage?.attachments.first()?.url;
    const image = await Canvas.loadImage(url);
    const height = lastMessage?.attachments.first()?.height;
    const width = lastMessage?.attachments.first()?.width;

    const canvas = Canvas.createCanvas(width, height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    return canvas;
}

function randomNumber() {
    return Math.floor(Math.random() * 501)
}

function botHasPermissionsInteraction(channel: TextChannel, interaction: CommandInteraction<CacheType>) {
    return channel.permissionsFor(interaction.guild?.me!).has("SEND_MESSAGES");
}

function botHasPermissionsMessage(channel: TextChannel, message: Message<boolean>) {
    return channel.permissionsFor(message.guild?.me!).has("SEND_MESSAGES");
}