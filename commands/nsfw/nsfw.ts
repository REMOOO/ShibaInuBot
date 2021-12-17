import { MessageEmbed, TextChannel, WebhookClient } from "discord.js";
import { ICommand } from "wokcommands";
const getter = require("reddit-image-fetcher")

export default {
    category: 'NSFW',
    description: 'Get NSFW content.',

    slash: true,

    options: [
        {
            type: 'SUB_COMMAND',
            name: 'ass',
            description: 'See some ass.'
        },
        {
            type: 'SUB_COMMAND',
            name: 'blowjob',
            description: 'See some blowjobs.'
        },
        {
            type: 'SUB_COMMAND',
            name: 'boobs',
            description: 'See some boobs.'
        },
        {
            type: 'SUB_COMMAND',
            name: 'celebrity',
            description: 'See some celebrity NSFW.'
        },
        {
            type: 'SUB_COMMAND',
            name: 'cosplay',
            description: 'See some cosplay NSFW.'
        },
        {
            type: 'SUB_COMMAND',
            name: 'cum',
            description: 'See some cum sluts.'
        },
        {
            type: 'SUB_COMMAND',
            name: 'dick',
            description: 'See some dicks.'
        },
        {
            type: 'SUB_COMMAND',
            name: 'gay',
            description: 'See some gay content.'
        },
        {
            type: 'SUB_COMMAND',
            name: 'hentai',
            description: 'See some hentai.'
        },
        {
            type: 'SUB_COMMAND',
            name: 'lesbian',
            description: 'See some lesbian content.'
        },
        {
            type: 'SUB_COMMAND',
            name: 'nude',
            description: 'See some nudes.'
        },
        {
            type: 'SUB_COMMAND',
            name: 'nudegif',
            description: 'See some nude gifs.'
        },
        {
            type: 'SUB_COMMAND',
            name: 'pussy',
            description: 'See some pussy.'
        },
        {
            type: 'SUB_COMMAND',
            name: 'thicc',
            description: 'See some thicc girls.'
        },
    ],

    callback: async ({ guild, interaction, channel }) => {
        const subcommand = interaction.options.getSubcommand()

        const webhook = new WebhookClient({ url: process.env.COMMANDS_URL! })
        const embed = new MessageEmbed()
            .setTitle(`nsfw ${subcommand} in ${guild?.name}`)
            .setColor('GREEN')
        await webhook.send({ embeds: [embed] })

        if (subcommand === 'ass') {
            const subreddits = [
                "ass",
                "AssholeBehindThong",
                "assinthong",
                "asstastic",
                "facedownassup",
                "NSFW_ASS",
                "pawg"
            ]
            return nsfw(channel, subreddits, subcommand)

        } else if (subcommand === 'blowjob') {
            const subreddits = [
                "blowjobs",
                "IWantToSuckCock",
                "throatpies",
                "deepthroat",
                "GirlsFinishingTheJob",
                "BlowjobGifs"
            ]
            return nsfw(channel, subreddits, subcommand)

        } else if (subcommand === 'boobs') {
            const subreddits = [
                "boobs",
                "boobies",
                "boobbounce",
                "BigBoobsGoneWild",
                "hugeboobs",
                "TheUnderboob",
                "bigtitsinbikinis",
                "Bigtitssmalltits",
                "boltedontits",
                "naturaltitties",
                "tinytits",
                "tits",
                "tittydrop",
                "ghostnipples"
            ]
            return nsfw(channel, subreddits, subcommand)

        } else if (subcommand === 'celebrity') {
            const subreddits = [
                "JerkOffToCelebs",
                "CelebNSFW"
            ]
            return nsfw(channel, subreddits, subcommand)

        } else if (subcommand === 'cosplay') {
            const subreddits = [
                "nsfwcosplay"
            ]
            return nsfw(channel, subreddits, subcommand)

        } else if (subcommand === 'cum') {
            const subreddits = [
                "CumSluts",
                "cumfetish",
                "cumonclothes",
                "cumontongue",
                "cumswallowing"
            ]
            return nsfw(channel, subreddits, subcommand)

        } else if (subcommand === 'dick') {
            const subreddits = [
                "penis",
                "cock",
                "massivecock",
                "ratemycock",
                "averagepenis",
                "dicks"
            ]
            return nsfw(channel, subreddits, subcommand)

        } else if (subcommand === 'gay') {
            const subreddits = [
                "gayporn",
                "gaygifs",
                "gayNSFW"
            ]
            return nsfw(channel, subreddits, subcommand)

        } else if (subcommand === 'hentai') {
            const subreddits = [
                "hentai",
                "ecchi",
                "doujinshi",
                "yurigif",
                "oppai_gif",
                "thighdeology",
                "ahegao",
                "MonsterGirl",
                "hentaibondage",
                "AnimeMILFS",
                "Nekomimi",
                "Paizuri",
                "AnimeBooty",
                "waifusgonewild",
                "GameOverGirls",
                "Sukebei",
                "CumHentai"
            ]
            return nsfw(channel, subreddits, subcommand)

        } else if (subcommand === 'lesbian') {
            const subreddits = [
                "lesbians",
                "lesbian_gifs"
            ]
            return nsfw(channel, subreddits, subcommand)

        } else if (subcommand === 'nude') {
            const subreddits = [
                "GoneWild",
                "NSFW",
                "RealGirls",
                "holdthemoan",
                "bustypetite",
                "LegalTeens",
                "PetiteGoneWild",
                "AdorablePorn",
                "AsiansGoneWild",
                "GirlsFinishingTheJob",
                "CollegeSluts",
                "Amateur",
                "BiggerThanYouThought",
                "porn",
                "happyembarrassedgirl",
                "onoff",
                "NSFWHardcore",
                "juicyasians",
                "18_19",
                "NSFW_Snapchat",
                "SheLikesItRough"
            ]
            return nsfw(channel, subreddits, subcommand)

        } else if (subcommand === 'nudegif') {
            const subreddits = [
                "NSFW_GIF",
                "nsfw_gifs",
                "porninfifteenseconds",
                "60fpsporn"
            ]
            return nsfw(channel, subreddits, subcommand)

        } else if (subcommand === 'pussy') {
            const subreddits = [
                "pussy",
                "lipsthatgrip",
                "godpussy"
            ]
            return nsfw(channel, subreddits, subcommand)

        } else if (subcommand === 'thicc') {
            const subreddits = [
                "curvy",
                "gonewildcurvy",
                "thick"
            ]
            return nsfw(channel, subreddits, subcommand)

        }
    }

} as ICommand

async function nsfw(channel: TextChannel, subs: string[], cmd: string) {
    if (!channel.nsfw) {
        return "🔞 This command can only be used in NSFW channels."
    }

    const subreddits = subs

    const res = await getter.fetch({
        type: 'custom',
        subreddit: subreddits
    });

    let title = "";

    if (res[0].title.length > 256) {
        title = cmd;
    } else {
        title = res[0].title;
    }

    const embed = new MessageEmbed()
        .setTitle(title)
        .setImage(res[0].image);
    return embed
}