import { MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Text',
    description: 'Get a random pickupline.',

    slash: 'both',
    
    callback: async ({guild}) => {
        console.log(`pickupline in ${guild?.name}`)

        return pickupline()
    },
} as ICommand

const pickuplines = [
    "My mom told me that life was a deck of cards, so I guess you must be the queen of hearts.",
    "Mans so good at sliding into dms it left her speechless for a day. (Use this one if you're getting ignored)",
    "You put the sexy in dyslexic.",
    "My dick is so polite, it stands up so you can sit down :)",
    "If I asked you out on a date, would your answer be the same as your answer to this question?",
    "On a scale of 1 to 10, you are 8 and I'm in 2 you.",
    `Hey girl, I see your profile says you only want guys 6' or taller. I'm 5'9", but if things go well, you can get the other 3 inches later.`,
    "Hey, I've got 70 ways to cheer you up. The first is a big hug. The rest is 69.",
    "Damn, are you an FDA approved respiratory mask? Cause I really want you to sit on my face.",
    "Roses are red. Violets are blue. Covid-19 canceling everything except my feelings for you.",
    "Of all your curves... your smile is my favourite.",
    "Are you a shark? Because I got some swimmers for you to swallow.",
    "If you were a dinosaur, you'd be a gorgesaurus.",
    "It's not that I'm horny all the time, it's just that you're sexy all the time.",
    "Fuck me if I'm wrong but... dinosaurs still exist right?",
    "Jesus turned water into wine, may I turn you into mine?👉👈🥺",
    "The word of the day is 'Legs'. Let's go back to my place and spread the word.",
    "Hey girl, I have never been in a car crash before, but I wouldn't mind hitting your rear end.",
    "I'm gonna sue Spotify for not including you in the hottest singles of the week.",
    "They say the tongue is the strongest muscle. Wanna wrestle? ;)",
    "I'm like the weather. When it gets wet, you gotta cum inside!!!",
    "I'm sorry but you need to pay your rent. You've been living in my heart for quite some time now.",
    "Hey girl, is your name John, because I have never Cena girl like you.",
    "I went to your boyfriend's Instagram page. It said 'edit profile'.",
    "Anyone who says Disneyland is the happiest place on Earth has clearly never stood next to you.",
    "Fuck me if I'm wrong, but you want to fuck me, right?",
    "Damn, this COVID-19 stuff sure does suck... but you can't spell quarantine without u, r, a, q, t.",
    "Your hand seems pretty heavy... Let me hold it for you.",
    "Are you a meme? Because I'd like to show you to my friends and then hope they like you as much as I do.",
    "If I got a nickle for everytime I found a perfect girl, I would get the first one right now.",
    "Hey girl, I wanted to take you to the movies, but they don't allow to bring your own snacks.",
    "A hug without you is just hg, and that's toxic.",
    "Are you into casual sex, or should I wear a tie?",
    "Damn girl are you a toaster? Cause a bath with you would send me straight to heaven.",
    "You're a work of art. Let me nail you against a wall.",
    "Roses are red, quarantine life is shitty, the only thing that'll make me happy is a picture of your titty.",
    "Redstone is red, Lapis is blue, I'd rather quit to main menu than respawn without you.",
    "I can't hold a conversation but I'll hold your hand.",
    "Roses are red, I want you to remember, you are the reason why I lost no nut november.",
    "If we play Among Us can I be the impostor? Because I want to take you out.",
    "Hey cutie, is your last name suicide? Cause I think of you everyday.",
    "Are you a brain tumor? Cause you're on my mind and it's killing me.",
    "Are you http? Because without you I'm just ://",
    "I'm mad that Google didn't tell me that you were the best place to eat out.",
    "Ain't using Google no more, cause when I saw you, the search is over.",
    "Hey can you text me a picture of you? Gotta show Santa what I want for Christmas.",
    "It sucks all the good pickup lines are taken. But you aren't and I'm definitely down to change that.",
    "Hey girl are you a proton? Because you fill me with positive energy.",
    "Is there a phone in your back pocket by any chance? Cause that ass is calling me.",
    "Are your thighs made out of rope? Cause I want to put them around my neck until I asphyxiate.",
    "You remind me of Russia in 1917. I'm starting to feel a huge uprising in my lower class...",
    "Yo girl r u lightning because u McQueen",
    "Studies show that women tend to be happier with unattractive partners. In other words hey, how you doing?",
    "Hey girl, are you suicide? Because I'm ready to commit.",
    "Damn girl, are you a climate change? Cause you're hot as fuck but I don't see a future between us.",
    "There are lots of things we don't know about the universe... All I know is that it starts with U N I.",
    "Hey, do you like communism? Cause we could share a bed.",
    "Did you sit on the F5 key? Cause your ass is refreshing.",
    "If being cute was an imposter trait, you'd be hella sus.",
    "Damn girl, are you a coal digger? Cause I want to make you mine.",
    "Hey girl, I would ask for Netflix and chill... but you look you're into Stranger Things.",
    "Are you my package from Amazon? Cause I want you at my house in the next 24 hours.",
    "Girl, do you smoke pot? Cuz weed be cute together.",
    "I like my girls like my charging ports. Next to my bed and always turned on.",
    "On a scale of 1-110, you're a 9. I'm the 1 you need.",
    "Hey girl are you f(x)=x^(-1)? Because I want to find the area under your curves with my natural log.",
    "If I got a dollar for everytime I thought of you, I'd have only one because you never left my mind.",
    "Hey girl are you a glock 42, cause I would love to load you with my 9mm.",
    "I was going to call you beautiful, but beauty is on the inside and I haven't been inside you yet!",
    "You don't need keys to drive me crazy.",
    "I'm left handed but I'm sure I can treat you right.",
    "I just cleaned my whole house and now I'm the only trash left. Will you take me out?",
    "There are 14 billion legs in the world. I only want to be in between yours!",
    "Can I be your first mistake of the New Year?",
    "Tired of being an adult? Be my baby then.",
    "Are you a university degree? Cause I wanna use you to impress my mom.",
    "Do you have 11 protons? Because you're sodium fine.",
    "If you were a YouTube ad, I wouldn't skip.",
    "Hey girl, are you a Bluetooth device? Cause I'm looking for connection.",
    "Do you have a name? Or can I just call you mine.",
    "Are you a donut? Because you're a snack with a hole.",
    "Are you religious? Because you're the answer to all my prayers.",
    "Are you sugar? Because you're sweet and I wanna spoon you.",
    "I can't cook a good lasagna, but I can cook a great lasagna.",
    "Heard you like bad girls. Well, I'm bad at everything.",
    "You have a bit of cute on your face.",
    "Hey, you're beautiful. Can I tell you that again next Saturday over dinner?",
    "You dropped something: my jaw.",
    "Did you sit in sugar? Because you have a sweet ass."
]

async function pickupline() {
    const embed = new MessageEmbed()
        .setTitle(getRandomPickupline())
        .setColor('RANDOM')
    return embed
}

function getRandomPickupline() {
    const random = Math.floor(Math.random() * pickuplines.length);
    return pickuplines[random]
}
