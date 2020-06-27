const { MessageEmbed, Message , client} = require('discord.js');
const randomPuppy = require('random-puppy');

module.exports = {
    name: "meme",
    category: 'fun',
    description: 'Dank Memes!',
    usage: `${(process.env.PREFIX)}meme`
}

module.exports.run = async (client, message, args) => {
    const subReddits = ["memes", "me_url", "dankmemes"]
    const random = subReddits[Math.floor(Math.random() * subReddits.length)];
    const img = await randomPuppy(random);

    const embed = new MessageEmbed()
    .setImage(img)
    .setTitle(`From /r/${random}`)
    .setURL(`http://reddit.com/${random}`)
    .setColor(process.env.COLOR)
    message.channel.send(embed)
}