import { CacheType, Collection, CommandInteraction, GuildMember, Message, MessageAttachment } from "discord.js";
import { ICommand } from "wokcommands";
const Canvas = require('canvas')

export default {
    category: 'Image',
    description: 'Add spacehotel.co logo to an image.',
    aliases: ['spacehotel'],

    slash: 'both',

    maxArgs: 1,
    expectedArgs: '<user>',
    expectedArgsTypes: ['USER'],

    callback: async ({ message, interaction, guild }) => {
        console.log(`space in ${guild?.name}`)

        const target = message ? message.mentions.members?.first() : interaction.options.getMember('user') as GuildMember
        
        await space(target, interaction, message);
    }
} as ICommand

async function space(target: GuildMember | undefined, interaction: CommandInteraction<CacheType>, message: Message<boolean>) {
    if (!target) {
        previousSpace(interaction, message);
    } else {
        await targetSpace(interaction, message, target);
    }
}

async function targetSpace(interaction: CommandInteraction<CacheType>, message: Message<boolean>, target: GuildMember) {
    const canvas = await createTargetCanvas(target);
            createTarget(canvas, interaction, message);
}

function previousSpace(interaction: CommandInteraction<CacheType>, message: Message<boolean>) {
    if (!interaction) {
            previousMessage(message);
        
    } else {
            previousInteraction(interaction);
        
    }
}

function previousInteraction(interaction: CommandInteraction<CacheType>) {
    interaction.channel?.messages.fetch().then(async (messages) => {
        const canvas = await createInteractionCanvas(messages);
        createInteraction(canvas, interaction);
    });
}

function previousMessage(message: Message<boolean>) {
    message.channel.messages.fetch().then(async (messages) => {
        const canvas = await createMessageCanvas(messages);
        createMessage(canvas, message);
    });
}

function createTarget(canvas: any, interaction: CommandInteraction<CacheType>, message: Message<boolean>) {
    const attachment = new MessageAttachment(canvas.toBuffer(), 'spacehotel.png');

    if (!interaction) {
        message.channel.send({ files: [attachment] });
    } else {
        interaction.reply({
            files: [attachment]
        });
    }
}

function createInteraction(canvas: any, interaction: CommandInteraction<CacheType>) {
    const attachment = new MessageAttachment(canvas.toBuffer(), 'spacehotel.png');

    interaction.reply({
        files: [attachment]
    });
}

function createMessage(canvas: any, message: Message<boolean>) {
    const attachment = new MessageAttachment(canvas.toBuffer(), 'spacehotel.png');

    message.channel.send({ files: [attachment] });
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

    const space = await Canvas.loadImage("./images/space.png");

    ctx.drawImage(space, canvas.width - 200, canvas.height - 70);
    return canvas;
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

    const space = await Canvas.loadImage("./images/space.png");

    ctx.drawImage(space, canvas.width - 200, canvas.height - 70);
    return canvas;
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

    const space = await Canvas.loadImage("./images/space.png");

    ctx.drawImage(space, canvas.width - 200, canvas.height - 70);
    return canvas;
}
