const { MessageEmbed, Message, client } = require('discord.js');

module.exports = {
    name: "new",
    category: 'main',
    description: 'Opens a ticket',
    usage: `[p]snew <reason>`
}

module.exports.run = async(client, message, args) => {

    const reason = message.content.split(" ").slice(1).join(" ");

    let SupportCategory = message.guild.channels.cache.find(category => category.name === "Tickets");

    if (message.guild.me.hasPermission('MANAGE_CHANNELS') && !SupportCategory) {
        SupportCategory = await message.guild.channels.create('Tickets', {
            type: 'category',
        });
    };

    if (!message.guild.me.hasPermission('MANAGE_CHANNELS') && !SupportCategory) {
        let NoPerms = new MessageEmbed()
            .setTitle("Sorry, but I don't have permissions to create this category needed for tickets.")
            .setFooter(process.env.FOOTER)
            .setColor(process.env.COLOR)
        message.channel.send(NoPerms)

    }
    if (!message.guild.roles.cache.find(role => role.name === "Support Role")) {
        await (message.guild.roles.create({
            data: {
                name: 'Support Role',
                color: 'BLUE',
            },
            reason: `Needed for Tickets`,
        }));
    };

    let role = message.guild.roles.cache.find(role => role.name === "Support Role")

    if (!role) {
        let NoRolePerms = new MessageEmbed()
            .setTitle("I'm sorry but I don't have any permisson to creare the needed role. Either Create the role `Support Role` Or give me the needed Perms")
            .setFooter(process.env.FOOTER)
            .setColor(process.env.COLOR)
        return message.channel.send(NoRolePerms)

    }

    const TicketName = `ticket-${message.author.username}`
    if (message.guild.channels.cache.find(channel => channel.name === `ticket-${message.author.username.toLowerCase()}`)) {
        let TicketAlreadyOpen = new MessageEmbed()
            .setTitle("Sorry, but you already have a ticket open!")
            .setColor(process.env.COLOR)
            .setFooter(process.env.FOOTER)
        return message.channel.send(TicketName)

    }

    if (!reason) {
        let Subject = new MessageEmbed()
            .setTitle(`Please give a reason why you need to open a ticket.`)
            .setColor(process.env.COLOR)
            .setFooter(process.env.FOOTER)
        return message.channel.send(Subject)
    }


    message.guild.channels.create(TicketName, { parent: SupportCategory.id, topic: `Ticket User: ${message.author.username}\nReason: ${reason}` }).then(c => {
        const support = message.guild.roles.cache.get(role.id)
        c.updateOverwrite(support, {
                SEND_MESSAGES: true,
                VIEW_CHANNEL: true,
            }),
            c.updateOverwrite(message.guild.id, {
                SEND_MESSAGES: false,
                VIEW_CHANNEL: false,
            }),
            c.updateOverwrite(message.author, {
                SEND_MESSAGES: true,
                VIEW_CHANNEL: true,
            });
        let SupportTicketChannel = new MessageEmbed()
            .setColor(process.env.COLOR)
            .setTitle("New Support Ticket")
            .setDescription(`<@${message.author.id}> Your support ticket channel <#${c.id}>`)
            .setTimestamp()
            .setFooter(process.env.FOOTER)
        message.channel.send(SupportTicketChannel)

        let WelcomeUser = new MessageEmbed()
            .setColor(process.env.COLOR)
            .setTitle(`New Support Ticket`, `<@${message.author.id}> Thanks for opening a Support Ticket. A Staff Member will here to help you soon!`)
            .addField(`Issue: `, reason)
            .setTimestamp()
            .setFooter(process.env.FOOTER)
        c.send(WelcomeUser)
    })
}