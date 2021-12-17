import { MessageEmbed, WebhookClient } from "discord.js";
import { ICommand } from "wokcommands";
const fetch = require('axios')

export default {
    category: 'Text',
    description: 'Find something.',

    slash: true,

    options: [
        {
            type: 'SUB_COMMAND',
            name: 'astronomy',
            description: 'Show the astronomy of a location.',
            options: [
                {
                    name: 'location',
                    type: 'STRING',
                    description: 'Define a location.',
                    required: true
                }
            ]
        },
        {
            type: 'SUB_COMMAND',
            name: 'football',
            description: 'Show upcoming football matches.'
        },
        {
            type: 'SUB_COMMAND',
            name: 'ip',
            description: 'Get information of an IP address.',
            options: [
                {
                    name: 'ip',
                    type: 'STRING',
                    description: 'Define an IP address.',
                    required: true
                }
            ]
        },
        {
            type: 'SUB_COMMAND',
            name: 'weather',
            description: 'Show the weather of a location.',
            options: [
                {
                    name: 'location',
                    type: 'STRING',
                    description: 'Define a location.',
                    required: true
                }
            ]
        }
    ],

    callback: async ({ guild, interaction }) => {
        const subcommand = interaction.options.getSubcommand()
        const location = interaction.options.getString('location')
        const ipInt = interaction.options.getString('ip')

        const webhook = new WebhookClient({ url: process.env.COMMANDS_URL! })

        if (subcommand === 'astronomy') {
            const embed = new MessageEmbed()
                .setTitle(`find ${subcommand} ${location} in ${guild?.name}`)
                .setColor('GREEN')
            await webhook.send({ embeds: [embed] })

            return astronomy(location!)

        } else if (subcommand === 'football') {
            const embed = new MessageEmbed()
                .setTitle(`find ${subcommand} in ${guild?.name}`)
                .setColor('GREEN')
            await webhook.send({ embeds: [embed] })

            return football()

        } else if (subcommand === 'ip') {
            const embed = new MessageEmbed()
                .setTitle(`find ${subcommand} ${ipInt} in ${guild?.name}`)
                .setColor('GREEN')
            await webhook.send({ embeds: [embed] })

            return ip(ipInt!)

        } else if (subcommand === 'weather') {
            const embed = new MessageEmbed()
                .setTitle(`find ${subcommand} ${location} in ${guild?.name}`)
                .setColor('GREEN')
            await webhook.send({ embeds: [embed] })

            return weather(location!)
        }
    }
} as ICommand

async function astronomy(location: string) {
    let res

    try {
        res = await fetch(`http://api.weatherapi.com/v1/astronomy.json?key=${process.env.WEATHER}&q=${location}`)
    } catch (err) {
        return "Location doesn't exist"
    }

    const data = res.data
    let region = ""

    if (data.location.region === "") {
        region = await data.location.name;
    } else {
        region = await data.location.region;
    }

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

    try {
        return embed;
    } catch (err) {
        return "Missing data error. Please report this in the support server if you want this to be fixed :)."
    }
}

async function football() {
    let res

    try {
        res = await fetch(`http://api.weatherapi.com/v1/sports.json?key=${process.env.WEATHER}&q=london`)
    } catch (err) {
        return "Location doesn't exist"
    }

    const data = res.data.football

    let matches = ""

    for (let i = 0; i < data.length; i++) {
        matches += `${i + 1}. **${data[i].match}** @ ${data[i].start}\n`
    }

    const embed = new MessageEmbed()
        .setTitle(`Upcoming football matches`)
        .setDescription(matches)
        .setColor("RANDOM");

    try {
        return embed
    } catch (err) {
        return "Missing data error. Please report this in the support server if you want this to be fixed :)."
    }
}

async function ip(ip: string) {
    let res

    try {
        res = await fetch(`http://api.weatherapi.com/v1/ip.json?key=${process.env.WEATHER}&q=${ip}`)
    } catch (err) {
        return "IP doesn't exist"
    }

    const data = res.data
    let region = ""

    if (data.region === "") {
        region = await data.city;
    } else {
        region = await data.region;
    }

    const embed = new MessageEmbed()
        .setTitle(`Information of IP: ${data.ip}`)
        .addField(`Continent`, `${data.continent_name}`, true)
        .addField(`Country`, `${data.country_name}`, true)
        .addField(`City`, `${data.city}`, true)
        .addField("Region", `${region}`, true)
        .addField("Local time", `${data.localtime}`, true)
        .setColor("RANDOM");

    try {
        return embed
    } catch (err) {
        return "Missing data error. Please report this in the support server if you want this to be fixed :)."
    }
}

async function weather(location: string) {
    let res

    try {
        res = await fetch(`http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER}&q=${location}`)
    } catch (err) {
        return "Location doesn't exist"
    }

    const data = res.data
    let region = ""

    if (data.location.region === "") {
        region = await data.location.name;
    } else {
        region = await data.location.region;
    }

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

    try {
        return embed
    } catch (err) {
        return "Missing data error. Please report this in the support server if you want this to be fixed :)."
    }
}