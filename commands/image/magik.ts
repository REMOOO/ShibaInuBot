import { GuildMember, MessageAttachment, MessageEmbed } from "discord.js";
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

    callback: async ({ message, interaction }) => {
        const target = message ? message.mentions.members?.first() : interaction.options.getMember('user') as GuildMember
        
        if (!target) {
            if (!interaction) {
                message.channel.messages.fetch().then(async (messages) => {
                    const lastMessage = messages.sort((a, b) => b.createdTimestamp - a.createdTimestamp).filter((m) => m.attachments.size > 0).first()
                    const url = lastMessage?.attachments.first()?.url
                    const image = await Canvas.loadImage(url)
                    const height = lastMessage?.attachments.first()?.height
                    const width = lastMessage?.attachments.first()?.width
    
                    const canvas = Canvas.createCanvas(width, height)
                    const ctx = canvas.getContext('2d')
                    ctx.drawImage(image, 0, 0, canvas.width, canvas.height)

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
                    .toBuffer('PNG', function(err: any, buffer: any){
                        if (err) console.log(err)

                        const attachment = new MessageAttachment(buffer, 'magik.png')

                        if (buffer === null) {
                            message.channel.send("Error, much sad. I couldn't fetch the image in time, please try again.")
                        } else {
                            message.channel.send({files:[attachment]})
                        }
                    })
                })
            } else {
                interaction.channel?.messages.fetch().then(async (messages) => {
                    const lastMessage = messages.sort((a, b) => b.createdTimestamp - a.createdTimestamp).filter((m) => m.attachments.size > 0).first()
                    const url = lastMessage?.attachments.first()?.url
                    const image = await Canvas.loadImage(url)
                    const height = lastMessage?.attachments.first()?.height
                    const width = lastMessage?.attachments.first()?.width
    
                    const canvas = Canvas.createCanvas(width, height)
                    const ctx = canvas.getContext('2d')
                    ctx.drawImage(image, 0, 0, canvas.width, canvas.height)

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
                    .toBuffer('PNG', function(err: any, buffer: any){
                        if (err) console.log(err)

                        const attachment = new MessageAttachment(buffer, 'magik.png')

                        if (buffer === null) {
                            interaction.reply("Error, much sad. I couldn't fetch the image in time, please try again.")
                        } else {
                            interaction.reply({
                                files: [attachment]
                            })
                        }
                    })
                })
            }
        } else {
            const avatar = await Canvas.loadImage(
                target.user.displayAvatarURL({
                    format: 'png',
                    size: 4096
                })
            )

            const canvas = Canvas.createCanvas(500, 500)
            const ctx = canvas.getContext('2d')
            ctx.drawImage(avatar, 0, 0, canvas.width, canvas.height)

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
            .toBuffer('PNG', function(err: any, buffer: any){
                if (err) console.log(err)

                const attachment = new MessageAttachment(buffer, 'magik.png')
            
                if (!interaction) {
                    if (buffer === null) {
                        message.channel.send("Error, much sad. I couldn't fetch the image in time, please try again.")
                    } else {
                        message.channel.send({files:[attachment]})
                    }
                } else {
                    if (buffer === null) {
                        interaction.reply("Error, much sad. I couldn't fetch the image in time, please try again.")
                    } else {
                        interaction.reply({
                            files: [attachment]
                        })
                    }
                }
            })
        }
    }
} as ICommand

function randomNumber() {
    return Math.floor(Math.random() * 501)
}