import { TextChannel, CommandInteraction, CacheType, Message, MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";
const fetch = require('axios')

export default {
    category: 'Text',
    description: "Show the weather of a location.",

    slash: 'both',

    expectedArgs: '<location>',
    minArgs: 1,
    maxArgs: 1,

    callback: async ({ args, interaction, channel, message }) => {
        console.log(`weather`)

        if (!interaction) {
            if (botHasPermissionsMessage(channel, message)) {
                return weather(args)
            }
        } else {
            if (botHasPermissionsInteraction(channel, interaction)) {
                return weather(args)
            }
        }
    }
} as ICommand

async function weather(args: any[]) {
    const location = args[0]
    let res

    try {
        res = await fetch(`http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER}&q=${location}`)
    } catch (err) {
        return "Location doesn't exist"
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
    if (data.location.region === "") {
        region = await data.location.name;
    } else {
        region = await data.location.region;
    }
    return region;
}

function createEmbed(data: any, region: string) {
    const embed = new MessageEmbed()
        .setTitle(`Weather in ${data.location.name}`)
        .setImage(`https:${data.current.condition.icon}`)
        .addField(`Region`, `${region}`, true)
        .addField(`Country`, `${data.location.country}`, true)
        .addField(`Local time`, `${data.location.localtime}`, true)
        .addField("Temperature", `${data.current.temp_c} °C - ${data.current.temp_f} °F`, true)
        .addField("Feels like", `${data.current.feelslike_c} °C - ${data.current.feelslike_f} °F`, true)
        .addField("Condition", `${data.current.condition.text}`, true)
        .addField("Wind speed", `${data.current.wind_kph} kph - ${data.current.wind_mph} mph`, true)
        .addField("Wind direction", `${data.current.wind_dir}`, true)
        .addField("Last updated", `${data.current.last_updated}`, true)
        .setColor("RANDOM");
    return embed;
}

function botHasPermissionsInteraction(channel: TextChannel, interaction: CommandInteraction<CacheType>) {
    return channel.permissionsFor(interaction.guild?.me!).has("SEND_MESSAGES");
}

function botHasPermissionsMessage(channel: TextChannel, message: Message<boolean>) {
    return channel.permissionsFor(message.guild?.me!).has("SEND_MESSAGES");
}