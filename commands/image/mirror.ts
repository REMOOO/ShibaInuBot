import { GuildMember, MessageAttachment } from "discord.js";
import { ICommand } from "wokcommands";
const Canvas = require('canvas')

export default {
    category: 'Image',
    description: 'Mirror an image.',

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
    
                    ctx.translate(canvas.width, 0)
                    ctx.scale(-1,1)
                    ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
    
                    const attachment = new MessageAttachment(canvas.toBuffer(), 'mirror.png')
                    
                    message.channel.send({files: [attachment]})
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
    
                    ctx.translate(canvas.width, 0)
                    ctx.scale(-1,1)
                    ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
    
                    const attachment = new MessageAttachment(canvas.toBuffer(), 'mirror.png')

                    interaction.reply({
                        files: [attachment]
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

            ctx.translate(canvas.width, 0)
            ctx.scale(-1,1)
            ctx.drawImage(avatar, 0, 0, canvas.width, canvas.height)

            const attachment = new MessageAttachment(canvas.toBuffer(), 'mirror.png')

            if (!interaction) {
                message.channel.send({files: [attachment]})
            } else {
                interaction.reply({
                    files: [attachment]
                })
            }
        }
    }
} as ICommand