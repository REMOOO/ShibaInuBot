import { TextChannel, CommandInteraction, CacheType, Message, MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";
const fetch = require('axios')

export default {
    category: 'Text',
    description: "Get information of an IP address.",

    slash: 'both',

    expectedArgs: '<ip>',
    minArgs: 1,
    maxArgs: 1,

    callback: async ({ args, interaction, channel, message }) => {
        if (!interaction) {
            if (botHasPermissionsMessage(channel, message)) {
                return ip(args)
            }
        } else {
            if (botHasPermissionsInteraction(channel, interaction)) {
                return ip(args)
            }
        }
    }
} as ICommand

async function ip(args: any[]) {
    const ip = args[0]
    let res

    try {
        res = await fetch(`http://api.weatherapi.com/v1/ip.json?key=${process.env.WEATHER}&q=${ip}`)
    } catch (err) {
        return "IP doesn't exist"
    }

    const data = res.data
    let region = ""

    region = await isRegionMissing(data, region);

    try {
        return createEmbed(data, region);
    } catch (err) {
        return "Missing data error. Please report this in the support server if you want this to be fixed :)."
    }
}

async function isRegionMissing(data: any, region: string) {
    if (data.region === "") {
        region = await data.city;
    } else {
        region = await data.region;
    }
    return region;
}

function createEmbed(data: any, region: string) {
    const embed = new MessageEmbed()
        .setTitle(`Information of IP: ${data.ip}`)
        .addField(`Continent`, `${data.continent_name}`, true)
        .addField(`Country`, `${data.country_name}`, true)
        .addField(`City`, `${data.city}`, true)
        .addField("Region", `${region}`, true)
        .addField("Local time", `${data.localtime}`, true)
        .setColor("RANDOM");
    return embed;
}

function botHasPermissionsInteraction(channel: TextChannel, interaction: CommandInteraction<CacheType>) {
    return channel.permissionsFor(interaction.guild?.me!).has("SEND_MESSAGES");
}

function botHasPermissionsMessage(channel: TextChannel, message: Message<boolean>) {
    return channel.permissionsFor(message.guild?.me!).has("SEND_MESSAGES");
}