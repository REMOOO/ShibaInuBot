import { MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";
const fetch = require('axios')

export default {
    category: 'Text',
    description: "Show the astronomy of a location.",

    slash: 'both',

    expectedArgs: '<location>',
    minArgs: 1,
    maxArgs: 1,

    callback: async ({ args }) => {
        console.log(`astronomy ${args[0]}`)

        return astronomy(args)
    }
} as ICommand

async function astronomy(args: any[]) {
    const location = args[0]
    let res

    try {
        res = await fetch(`http://api.weatherapi.com/v1/astronomy.json?key=${process.env.WEATHER}&q=${location}`)
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
        .setTitle(`Astronomy in ${data.location.name}`)
        .addField(`Region`, `${region}`, true)
        .addField(`Country`, `${data.location.country}`, true)
        .addField(`Local time`, `${data.location.localtime}`, true)
        .addField("Sunrise", `${data.astronomy.astro.sunrise}`, true)
        .addField("Sunset", `${data.astronomy.astro.sunset}`, true)
        .addField("Moonrise", `${data.astronomy.astro.moonrise}`, true)
        .addField("Moonset", `${data.astronomy.astro.moonset}`, true)
        .addField("Moon phase", `${data.astronomy.astro.moon_phase}`, true)
        .addField("Moon illumination", `${data.astronomy.astro.moon_illumination}`, true)
        .setColor("RANDOM");
    return embed;
}
