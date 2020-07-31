const { MessageEmbed, Message } = require('discord.js');

module.exports = {
    name: "coinflip",
    category: 'fun',
    description: 'Will flip heads or tails',
    usage: `[p]flip`
}

module.exports.run = async(bot, message, args) => {
    let result = Math.floor((Math.random() * 2) + 1);
    if (result == 1) {
        coinside = "HEADS";
    } else if (result == 2) {
        conside = "TAILS";
    }

    let embedcoin = new MessageEmbed()
        .setAuthor(message.author.tag)
        .setColor(process.env.COLOR)
        .setThumbnail(message.author.avatarURL)
        .addField("The coin landed on...", coinside + "!");

    message.channel.send(embedcoin);
    message.delete({ timeout: 0 })
}