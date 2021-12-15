import { MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";
const fetch = require('axios')

export default {
    category: 'Text',
    description: "Show upcoming football matches.",

    slash: 'both',

    callback: async ({guild}) => {
        console.log(`football in ${guild?.name}`)

        return football()
    }
} as ICommand

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
        matches += `${i+1}. **${data[i].match}** @ ${data[i].start}\n`
    }

    try {
        return createEmbed(data, matches);
    } catch (err) {
        return "Missing data error. Please report this in the support server if you want this to be fixed :)."
    }
}


function createEmbed(data: any, matches: string) {
    const embed = new MessageEmbed()
        .setTitle(`Upcoming football matches`)
        .setDescription(matches)
        .setColor("RANDOM");
    return embed;
}
