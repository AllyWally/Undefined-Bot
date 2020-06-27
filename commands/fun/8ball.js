const { MessageEmbed, Message } = require('discord.js');


module.exports = {
    name: "8ball",
    category: 'fun',
    description: 'Ask 8ball a question',
    usage: `${(process.env.PREFIX)}8ball <question>`
}

module.exports.run = async (bot, message, args) => {
    if(!args[2]) return message.channel.send("Please ask a full question!");
    let replies = ["Yes.", "No.", "I don't know"];

    let result = Math.floor((Math.random() * replies.length));
    let question = args.slice(0).join(" ");

    let ballembed = new MessageEmbed()
    //.setAuthor(message.author.tag)
    .setColor(process.env.COLOR)
    .addField("Question", question)
    .addField("Answer", replies[result])

    message.channel.send(ballembed);
    message.delete({ timeout: 0 })
}
