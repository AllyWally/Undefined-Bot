const { MessageEmbed, Message, client } = require('discord.js');
const randomPuppy = require('random-puppy');

module.exports = {
    name: "meme",
    category: 'fun',
    description: 'Get funny memes!',
    usage: `[p]meme`
}

module.exports.run = async(client, message, args) => {
    const subReddits = ["memes", "dankmemes"]
    const random = subReddits[Math.floor(Math.random() * subReddits.length)];
    const img = await randomPuppy(random);

    const embed = new MessageEmbed()
        .setImage(img)
        .setTitle(`From /r/${random}`)
        .setURL(`https://www.reddit.com/r/memes/${random}`)
        .setColor(process.env.COLOR)
    message.channel.send(embed)
}