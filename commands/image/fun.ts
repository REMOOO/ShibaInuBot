import { WebhookClient, MessageEmbed, User, CacheType, CommandInteraction, MessageAttachment } from "discord.js";
import { ICommand } from "wokcommands";
const Canvas = require('canvas')
const gm = require("gm")

export default {
    category: 'Image',
    description: 'Get a fun image',

    slash: true,

    options: [
        {
            type: 'SUB_COMMAND',
            name: '3ds',
            description: 'Transform an image to a 3DS box cover art.',
            options: [
                {
                    name: 'user',
                    type: 'USER',
                    description: 'A user in the server.'
                }
            ]
        },
        {
            type: 'SUB_COMMAND',
            name: '9gag',
            description: 'Add via 9gag.com logo to an image.',
            options: [
                {
                    name: 'user',
                    type: 'USER',
                    description: 'A user in the server.'
                }
            ]
        },
        {
            type: 'SUB_COMMAND',
            name: 'addictive',
            description: 'Make an image the most addictive game of this year.',
            options: [
                {
                    name: 'user',
                    type: 'USER',
                    description: 'A user in the server.'
                }
            ]
        },
        {
            type: 'SUB_COMMAND',
            name: 'adidas',
            description: 'Add adidas logo to an image.',
            options: [
                {
                    name: 'user',
                    type: 'USER',
                    description: 'A user in the server.'
                }
            ]
        },
        {
            type: 'SUB_COMMAND',
            name: 'album',
            description: 'Make an image work on an album with Death Grips.',
            options: [
                {
                    name: 'user',
                    type: 'USER',
                    description: 'A user in the server.'
                }
            ]
        },
        {
            type: 'SUB_COMMAND',
            name: 'brazzers',
            description: 'Add brazzers logo to an image.',
            options: [
                {
                    name: 'user',
                    type: 'USER',
                    description: 'A user in the server.'
                }
            ]
        },
        {
            type: 'SUB_COMMAND',
            name: 'kanye',
            description: 'Let Ye hold an image.',
            options: [
                {
                    name: 'user',
                    type: 'USER',
                    description: 'A user in the server.'
                }
            ]
        },
        {
            type: 'SUB_COMMAND',
            name: 'koekerond',
            description: 'Make an image koekerond jung.',
            options: [
                {
                    name: 'user',
                    type: 'USER',
                    description: 'A user in the server.'
                }
            ]
        },
        {
            type: 'SUB_COMMAND',
            name: 'magik',
            description: 'Magik an image.',
            options: [
                {
                    name: 'user',
                    type: 'USER',
                    description: 'A user in the server.'
                }
            ]
        },
        {
            type: 'SUB_COMMAND',
            name: 'mirror',
            description: 'Mirror an image.',
            options: [
                {
                    name: 'user',
                    type: 'USER',
                    description: 'A user in the server.'
                }
            ]
        },
        {
            type: 'SUB_COMMAND',
            name: 'pornhub',
            description: 'Add pornhub logo to an image.',
            options: [
                {
                    name: 'user',
                    type: 'USER',
                    description: 'A user in the server.'
                }
            ]
        },
        {
            type: 'SUB_COMMAND',
            name: 'space',
            description: 'Add spacehotel.co logo to an image.',
            options: [
                {
                    name: 'user',
                    type: 'USER',
                    description: 'A user in the server.'
                }
            ]
        }
    ],

    callback: async ({ guild, interaction }) => {
        const subcommand = interaction.options.getSubcommand()
        let user = interaction.options.getUser('user')
        const webhook = new WebhookClient({ url: process.env.COMMANDS_URL! })

        const embed = new MessageEmbed()
            .setTitle(`fun ${subcommand} ${user?.username} in ${guild?.name}`)
            .setColor('GREEN')
        await webhook.send({ embeds: [embed] })

        if (subcommand === '3ds') {
            return threeds(user, interaction)

        } else if (subcommand === '9gag') {
            return ninegag(user, interaction)

        } else if (subcommand === 'addictive') {
            return addictive(user, interaction)

        } else if (subcommand === 'adidas') {
            return adidas(user, interaction)

        } else if (subcommand === 'album') {
            return album(user, interaction)

        } else if (subcommand === 'brazzers') {
            return brazzers(user, interaction)

        } else if (subcommand === 'kanye') {
            return kanye(user, interaction)

        } else if (subcommand === 'koekerond') {
            return koekerond(user, interaction)

        } else if (subcommand === 'magik') {
            return magik(user, interaction)

        } else if (subcommand === 'mirror') {
            return mirror(user, interaction)

        } else if (subcommand === 'pornhub') {
            return pornhub(user, interaction)

        } else if (subcommand === 'space') {
            return space(user, interaction)

        }
    }
} as ICommand

async function threeds(user: User | null, interaction: CommandInteraction<CacheType>) {
    let image

    image = await defineImage(user, interaction, image);
    const { width, height } = defineFormat(820, 754);

    const { ctx, canvas } = defineCanvas(width, height);

    const threeds = await Canvas.loadImage("./images/3ds.png");
    const e = await Canvas.loadImage("./images/e_for_everyone.png")
    const nintendo = await Canvas.loadImage("./images/nintendo_logo.png")

    ctx.drawImage(threeds, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 13, 41, 710, 695);
    ctx.drawImage(e, 20, 571, 135, 150)
    ctx.drawImage(nintendo, 500, 650, 200, 100)
    
    createInt(canvas, interaction, '3ds');
}

async function ninegag(user: User | null, interaction: CommandInteraction<CacheType>) {
    let image
    image = await defineImage(user, interaction, image);
    const { width, height } = defineFormat(500, 500);
    const { ctx, canvas } = defineCanvas(width, height);

    const ninegag = await Canvas.loadImage("./images/9gag.png");
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(ninegag, 0, 0);

    createInt(canvas, interaction, '9gag');
}

async function addictive(user: User | null, interaction: CommandInteraction<CacheType>) {
    let image
    image = await defineImage(user, interaction, image);
    const { width, height } = defineFormat(388, 282);
    const { ctx, canvas } = defineCanvas(width, height);

    ctx.fillStyle = "#FFFFFF"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    ctx.fillStyle = "#000000"
    ctx.font = "20px Times New Roman"
    ctx.fillText("The Most Addictive Game Of The Year 2022", 10, 270)

    ctx.drawImage(image, 10, 20, 365, 225);

    createInt(canvas, interaction, 'addictive');
}

async function adidas(user: User | null, interaction: CommandInteraction<CacheType>) {
    let image
    image = await defineImage(user, interaction, image);

    const { width, height } = defineFormat(image.width, image.height);
    const { ctx, canvas } = defineCanvas(width, height);

    const adidas = await Canvas.loadImage("./images/adidas.png");

    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    ctx.drawImage(adidas, canvas.width - 140, canvas.height - 135, 120, 120);

    createInt(canvas, interaction, 'adidas');
}

async function album(user: User | null, interaction: CommandInteraction<CacheType>) {
    let image
    image = await defineImage(user, interaction, image);

    const { width, height } = defineFormat(960, 720);
    const { ctx, canvas } = defineCanvas(width, height);

    const album = await Canvas.loadImage("./images/album.png");

    ctx.drawImage(album, 0, 0, canvas.width, canvas.height);

    ctx.drawImage(image, 25, 145, 920, 650);

    ctx.beginPath()
    ctx.fillStyle = "white"
    ctx.fillRect(350, 100, 200, 40)
    
    ctx.fillStyle = "#000000"
    ctx.font = "24px Arial"
    if (user) {
        ctx.fillText(`${user?.username}`, 355, 131)
    }

    createInt(canvas, interaction, 'album');
}

async function brazzers(user: User | null, interaction: CommandInteraction<CacheType>) {
    let image
    image = await defineImage(user, interaction, image);

    const { width, height } = defineFormat(image.width, image.height);
    const { ctx, canvas } = defineCanvas(width, height);

    const brazzers = await Canvas.loadImage("./images/brazzers.png");

    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    ctx.drawImage(brazzers, canvas.width - 197, canvas.height - 80, 200, 120);

    createInt(canvas, interaction, 'brazzers');
}

async function kanye(user: User | null, interaction: CommandInteraction<CacheType>) {
    let image
    image = await defineImage(user, interaction, image);

    const { width, height } = defineFormat(500, 667);
    const { ctx, canvas } = defineCanvas(width, height);

    const kanye = await Canvas.loadImage("./images/kanye.png");

    ctx.drawImage(kanye, 0, 0, canvas.width, canvas.height);

    ctx.rotate(1.5 * Math.PI / 180)
    ctx.drawImage(image, 135, 275, 248, 301);

    createInt(canvas, interaction, 'kanye');
}

async function koekerond(user: User | null, interaction: CommandInteraction<CacheType>) {
    let image
    image = await defineImage(user, interaction, image);

    const { width, height } = defineFormat(400, 400);
    const { ctx, canvas } = defineCanvas(width, height);

    const koekerond = await Canvas.loadImage("./images/koekerond.png");

    ctx.drawImage(koekerond, 0, 0, canvas.width, canvas.height)

    ctx.beginPath()
    ctx.arc(200, 185, 100, 0, Math.PI * 2, true)
    ctx.closePath()
    ctx.clip()
    ctx.drawImage(image, 100, 85, 200, 200)

    createInt(canvas, interaction, 'koekerond');
}

async function magik(user: User | null, interaction: CommandInteraction<CacheType>) {
    let image
    image = await defineImage(user, interaction, image);

    const { width, height } = defineFormat(image.width, image.height);
    const { ctx, canvas } = defineCanvas(width, height);

    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

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
            createIntGm(buffer, interaction, 'magik');
        })
}

async function mirror(user: User | null, interaction: CommandInteraction<CacheType>) {
    let image
    image = await defineImage(user, interaction, image);

    const { width, height } = defineFormat(image.width, image.height);
    const { ctx, canvas } = defineCanvas(width, height);

    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    createInt(canvas, interaction, 'mirror');
}

async function pornhub(user: User | null, interaction: CommandInteraction<CacheType>) {
    let image
    image = await defineImage(user, interaction, image);

    const { width, height } = defineFormat(image.width, image.height);
    const { ctx, canvas } = defineCanvas(width, height);

    const pornhub = await Canvas.loadImage("./images/pornhub.png");
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(pornhub, canvas.width - 197, canvas.height - 100, 200, 120);

    createInt(canvas, interaction, 'pornhub');
}

async function space(user: User | null, interaction: CommandInteraction<CacheType>) {
    let image
    image = await defineImage(user, interaction, image);

    const { width, height } = defineFormat(image.width, image.height);
    const { ctx, canvas } = defineCanvas(width, height);

    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    const space = await Canvas.loadImage("./images/space.png");
    ctx.drawImage(space, canvas.width - 200, canvas.height - 70);

    createInt(canvas, interaction, 'space');
}

function createIntGm(canvas: any, interaction: CommandInteraction<CacheType>, imagename: string) {
    const attachment = new MessageAttachment(canvas, `${imagename}.png`);
    try {
        interaction.reply({
            files: [attachment]
        });
    } catch(err) {
        return "Couldn't process image :("
    }
}

function createInt(canvas: any, interaction: CommandInteraction<CacheType>, imagename: string) {
    const attachment = new MessageAttachment(canvas.toBuffer(), `${imagename}.png`);
    try {
        interaction.reply({
            files: [attachment]
        });
    } catch(err) {
        return "Couldn't process image :("
    }
}

function defineCanvas(width: number, height: number) {
    const canvas = Canvas.createCanvas(width, height);
    const ctx = canvas.getContext('2d');
    return { ctx, canvas };
}

function defineFormat(widthInput: number, heightInput: number) {
    const width = widthInput;
    const height = heightInput;
    return { width, height };
}

async function defineImage(user: User | null, interaction: CommandInteraction<CacheType>, image: any) {
    if (user === null) {
        const messages = await interaction.channel?.messages.fetch()!;
        const lastMessage = messages.sort((a, b) => b.createdTimestamp - a.createdTimestamp).filter((m) => m.attachments.size > 0).first();
        const url = lastMessage?.attachments.first()?.url;
        image = await Canvas.loadImage(url);
    } else {
        image = await Canvas.loadImage(
            user.displayAvatarURL({
                format: 'png',
                size: 4096
            })
        );
    }
    return image;
}

function randomNumber() {
    return Math.floor(Math.random() * 501)
}
