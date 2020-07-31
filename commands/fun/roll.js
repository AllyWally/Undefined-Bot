const { MessageEmbed } = require('discord.js');


module.exports = {
    name: "roll",
    category: 'fun',
    description: 'Dice roll and get a number between 1-6',
    usage: `[p]roll`
}
module.exports.run = async(client, message, args, ) => {
    let replies = ["1", "2", "3", "4", "5", "6"];
    let result = Math.floor((Math.random() * replies.length));

    let ballembed = new MessageEmbed()
        .setColor(process.env.COLOR)
        .setTitle("🎲 You rolled: " + replies[result])
    message.channel.send(ballembed).then(message => message.delete({ timeout: 3000 }));
    message.delete({ timeout: 0 })
}