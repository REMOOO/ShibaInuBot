import { ICommand } from "wokcommands";
import { MessageEmbed } from "discord.js";
const getter = require("reddit-api-image-getter")

export default {
    category: 'Image',
    description: 'Get an image of a cute doggo',

    slash: 'both',

    callback: async ({}) => {
        let api = new getter()

        const res = await api.getHotImagesOfSubReddit("dogpictures")
        const post = res[Math.floor(Math.random() * res.length)]

        const embed = new MessageEmbed()
                    .setTitle(post.title)
                    .setImage(post.url)
                return embed
    }
} as ICommand