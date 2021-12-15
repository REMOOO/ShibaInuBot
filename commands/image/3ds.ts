import { CacheType, Collection, CommandInteraction, GuildMember, Message, MessageAttachment } from "discord.js";
import { ICommand } from "wokcommands";
const Canvas = require('canvas')

export default {
    category: 'Image',
    description: 'Transform an image to a 3DS box cover art.',

    slash: 'both',

    maxArgs: 1,
    expectedArgs: '<user>',
    expectedArgsTypes: ['USER'],

    callback: async ({ message, interaction, guild }) => {
        console.log(`3ds in ${guild?.name}`)

        const target = message ? message.mentions.members?.first() : interaction.options.getMember('user') as GuildMember

        await threeDs(target, interaction, message)
    }
} as ICommand

async function threeDs(target: GuildMember | undefined, interaction: CommandInteraction<CacheType>, message: Message<boolean>) {
    if (!target) {
        previousThreeDs(interaction, message)
    } else {
        await targetThreeDs(interaction, message, target)
    }
}

function previousThreeDs(interaction: CommandInteraction<CacheType>, message: Message<boolean>) {
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
    const height = 754
    const width = 820

    const canvas = Canvas.createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    const threeds = await Canvas.loadImage("./images/3ds.png");
    const e = await Canvas.loadImage("./images/e_for_everyone.png")
    const nintendo = await Canvas.loadImage("./images/nintendo_logo.png")

    ctx.drawImage(threeds, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 13, 41, 710, 695);
    ctx.drawImage(e, 20, 571, 135, 150)
    ctx.drawImage(nintendo, 500, 650, 200, 100)
    return canvas;
}

function createMessage(canvas: any, message: Message<boolean>) {
    const attachment = new MessageAttachment(canvas.toBuffer(), '3ds.png');

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
    const height = 754
    const width = 820

    const canvas = Canvas.createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    const threeds = await Canvas.loadImage("./images/3ds.png");
    const e = await Canvas.loadImage("./images/e_for_everyone.png")
    const nintendo = await Canvas.loadImage("./images/nintendo_logo.png")

    ctx.drawImage(threeds, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 13, 41, 710, 695);
    ctx.drawImage(e, 20, 571, 135, 150)
    ctx.drawImage(nintendo, 500, 650, 200, 100)
    return canvas;
}

function createInteraction(canvas: any, interaction: CommandInteraction<CacheType>) {
    const attachment = new MessageAttachment(canvas.toBuffer(), '3ds.png');

    interaction.reply({
        files: [attachment]
    });
}

async function targetThreeDs(interaction: CommandInteraction<CacheType>, message: Message<boolean>, target: GuildMember) {
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

    const canvas = Canvas.createCanvas(820, 754);
    const ctx = canvas.getContext('2d');

    const threeds = await Canvas.loadImage("./images/3ds.png");
    const e = await Canvas.loadImage("./images/e_for_everyone.png")
    const nintendo = await Canvas.loadImage("./images/nintendo_logo.png")

    ctx.drawImage(threeds, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(avatar, 13, 41, 710, 695);
    ctx.drawImage(e, 20, 571, 135, 150)
    ctx.drawImage(nintendo, 500, 650, 200, 100)
    return canvas;
}

function createTarget(canvas: any, interaction: CommandInteraction<CacheType>, message: Message<boolean>) {
    const attachment = new MessageAttachment(canvas.toBuffer(), '3ds.png');

    if (!interaction) {
        message.channel.send({ files: [attachment] });
    } else {
        interaction.reply({
            files: [attachment]
        });
    }
}
