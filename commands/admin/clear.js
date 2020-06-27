const { MessageEmbed, Message , client} = require('discord.js');

module.exports = {
    name: "purge",
    category: 'admin',
    description: 'Deletes messages',
    usage: `${(process.env.PREFIX)}purge`
}

module.exports.run = async (client, message, args) => {
    const args2 = message.content.split(" ").slice(1);
    var deleteCount = parseInt(args2[0], 10, 100);
        if(!message.member.hasPermission('MANAGE_MESSAGES')) 
        return message.channel.send("You don't have enough permission to use this command!")
            if(!deleteCount || deleteCount < 1 || deleteCount > 100)
            return message.channel.send("Please provide a number between 1 and 100 for the number of messages to delete")
                if(!deleteCount) 
                return message.channel.send("Please enter a number of messages you want to delete!")
                message.channel.bulkDelete(deleteCount).then(() => {
                    let deleteMessage = new MessageEmbed()
                    .setColor("YELLOW")
                    .setTitle('Deleted ' + deleteCount + ' messages')
                    .setTimestamp()
                    .setFooter(`${process.env.FOOTER} Moderation`)
                    message.channel.send(deleteMessage)
    });
}
