import { ButtonInteraction, CacheType, CommandInteraction, GuildMember, Interaction, Message, MessageActionRow, MessageButton, MessageEmbed, Role, TextChannel } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Text',
    description: 'Eat the fortune cookie to find your fortune. Works only as slash command',

    slash: true,
    
    callback: async ({ interaction: msgInt, channel, interaction}) => {
        if (botHasPermissionsInteraction(channel, interaction)) {
            await fortune(msgInt, channel)
        }
    },
} as ICommand

const fortunes = [
    "Someone is looking up to you. Don't let that person down.",
    "run.",
    "No snowflake in an avalanche ever feels responsible.",
    "About time I got out of that cookie.",
    "If you eat something & nobody sees you eat it, it has no calories.",
    "Someone in your life needs a letter from you.",
    "Soon you will receive a letter from a loved one.",
    "Never do anything halfway.",
    "Your heart will skip a beat.",
    "Don't be afraid to take that big step. Lucky numbers: 54, 19, 47, 27, 17, 20.",
    "A passionate new romance will appear in your life when you least expect it. Lucky numbers: 3, 39, 5, 49, 54, 33.",
    "You will move to a wonderful new home within the year. Lucky numbers: 43, 55, 26, 45, 7, 10.",
    "A new romance is in the future.",
    "Ignore previous cookie.",
    ":) I cannot help you, for I am just a cookie :)",
    "You will marry a professional athlete - if competitive eating can be considered a sport.",
    "Perhaps you've been focusing too much on spending.",
    "Perhaps you've been focusing too much on saving.",
    "Help! I'm being held prisoner in a Chinese bakery!",
    "You don't have to be faster than the bear, you just have to be faster than the slowest guy running from it.",
    "You look pretty.",
    "In youth and beauty, wisdom is rare.",
    "Ask not what your fortune cookie can do for you, but what you can do for your fortune cookie.",
    "Enjoy yourself while you can.",
    "You are not illiterate.",
    "If you think we're going to sum up your whole life on this little piece of paper, you're crazy.",
    "I see money in your future... It is not yours though.",
    "You are about to become $8.95 poorer.",
    "18,000 children starve to death every day. They would have loved this cookie.",
    "You and your wife will be happy in your life together.",
    "Three can keep a secret, if you get rid of two.",
    "death.",
    "I can't believe you're about to eat my tiny home.",
    "Avoid taking unnecessary gambles. Lucky numbers: 12, 14, 17, 20, 28, 36.",
    "Your efforts have not gone unnoticed.",
    "For rectal use only.",
    "This cookie is never gonna give you up, never gonna let you down.",
    "When you squeeze an orange, orange juice comes out - because that's what's inside.",
    "If you think nobody cares if you are alive, try missing a couple of car payments.",
    "Why not treat yourself to a good time instead of waiting for someone else to do it?",
    "These next numbers mean absolutely nothing: 97, 85, 94, 41, 97.",
    "Catch on fire with enthusiasm and people will come for miles to watch you burn.",
    "Love is on the horizon. The stars predict he will be tall, dark and a centaur.",
    "You laugh now, wait till you get home.",
    "Your pet is planning to eat you.",
    "Pigeon poop burns the retina for 13 hours. You will learn this the hard way.",
    "You are about to finish reading a fortune cookie. Lucky numbers: 14, 22, 26, 44, 45.",
    "How much deeper would the ocean be without sponges?",
    "Be kind to pigeons. A statue will someday be made of you.",
    "The job is well done.",
    "A good way to keep healthy is to eat more Chinese food.",
    "Your resemblance to a muppet will prevent the world from taking you seriously.",
    "There is no angry way to say bubbles.",
    "fail.",
    "Take no risks with your reputation.",
    "Take that chance you've been considering.",
    "The smart thing is to prepare for the unexpected.",
    "Life is a series of choices. Today yours are good ones.",
    "You will soon discover your hidden talent.",
    "A close friend reveals a hidden talent.",
    "Comfort zones are most often expanded through discomfort.",
    "Fortune not found: abort, retry, ignore?",
    "What's the speed of dark?",
    "Only listen to fortune cookie, disregard all other fortune telling units.",
    "Pull your head out of your ass... Life won't be so shitty.",
    "Your fortune said you need to make a donation. Give it to the chef.",
    "Be cautious while walking in darkness alone.",
    "You will read this and say 'Geez! I could come up with better fortunes than that!'",
    "Tomorrow morning, take a left turn as soon as you leave home.",
    "You are one in a million.",
    "You should enhance your feminine side at this time.",
    "A real patriot is the fellow who gets a parking ticket and rejoices that the system works.",
    "Pregnancy is a gift. And in your case it will also be a surprise.",
    "Something wonderful is about to happen.",
    "Plan to be spontaneous tomorrow.",
    "When working towards the solution to a problem, it always helps if you know the answer.",
    "It could be better, but it's good enough.",
    "We don't know the future, but you just got a free cookie.",
    "Family relationships will improve with time in bed.",
    "Work on improving your exercise routine.",
    "Pick another fortune cookie.",
    "Ask your mom.",
    "He likes to flirt, but toward you his intentions are honorable."
]

async function fortune(msgInt: CommandInteraction<CacheType>, channel: TextChannel) {
    const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('fortune_cookie')
                .setEmoji('🥠')
                .setLabel('Eat cookie')
                .setStyle('SUCCESS')
        )
        .addComponents(
            new MessageButton()
                .setCustomId('no_fortune_cookie')
                .setLabel("I don't like cookie")
                .setStyle('DANGER')
        );

    const embed = new MessageEmbed()
        .setTitle('Eat your fortune cookie to find your fortune');

    await msgInt.reply({
        embeds: [embed],
        components: [row],
    });

    const filter = (btnInt: Interaction) => {
        return msgInt.user.id === btnInt.user.id;
    };

    const collector = channel.createMessageComponentCollector({
        filter,
        max: 1,
        time: 1000 * 15
    });

    collector.on('end', async (collection) => {
        if (collection.first()?.customId === 'fortune_cookie') {
            const embed = new MessageEmbed()
                .setTitle(getRandomFortune());

            await msgInt.editReply({
                embeds: [embed],
                components: [],
            });
        } else {
            const embed = new MessageEmbed()
                .setTitle('shibe will eat your cookie 🙏');
            await msgInt.editReply({
                embeds: [embed],
                components: [],
            });
        }
    });
}

function getRandomFortune() {
    const random = Math.floor(Math.random() * fortunes.length);
    return fortunes[random]
}

function botHasPermissionsInteraction(channel: TextChannel, interaction: CommandInteraction<CacheType>) {
    return channel.permissionsFor(interaction.guild?.me!).has("SEND_MESSAGES");
}