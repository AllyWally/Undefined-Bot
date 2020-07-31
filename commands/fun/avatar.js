const { MessageEmbed, Message } = require('discord.js');

module.exports = {
    name: "avatar",
    category: 'fun',
    description: 'get the profile picture of a member',
    usage: `[p]avatar`
}

module.exports.run = async(bot, message, args) => {

    if (message.content.startsWith([p] + 'avatar')) {


        if (message.mentions.users.size) {
            let member = message.mentions.users.first()
            if (member) {
                const embed = new MessageEmbed().setImage(member.displayAvatarURL()).setTitle(member.username)
                message.channel.send(embed)

            } else {
                message.channel.send("Sorry none found with that name")

            }
        } else {
            const embed = new MessageEmbed().setImage(message.author.displayAvatarURL()).setTitle(message.author.username)
            message.channel.send(embed)
        }
    }
}