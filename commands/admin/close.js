const { MessageEmbed, Message, client } = require('discord.js');

module.exports = {
    name: "close",
    category: 'main',
    description: 'Closes the ticket only tickets can be closed by people that have the permission "MANAGE_CHANNELS"',
    usage: `[p]close <reason>`
}

module.exports.run = async(client, message, args) => {

    let CantClose = message.guild.me.hasPermission('MANAGE_CHANNELS')



    if (!message.channel.name.startsWith('ticket-')) return message.channel.send('You can\'t use the close command outside of a ticket channel.');

    if (message.guild.me.hasPermission('MANAGE_CHANNELS') && !CantClose) {
        let NoPerms = new MessageEmbed()
            .setTitle("Sorry but you can't use this command!")
        message.channel.send(NoPerms)
    };


    const reason = message.content.split(" ").slice(1).join(" ");

    if (!reason) {
        let NoSubject = new MessageEmbed()
            .setTitle("Please specify a reason to close the ticket")
            .setFooter(process.env.FOOTER)
            .setColor(process.env.COLOR)
        return message.channel.send(NoSubject)
    }

    let ClosedTicket = new MessageEmbed()
        .setTitle('Ticket Closed')
        .setDescription(`ticket-${message.author.username.toLowerCase()}`)
        .addField('Reason: ', reason)
    message.channel.delete()

}