const { MessageEmbed, Message , client} = require('discord.js');

module.exports = {
    name: "warn", 
    description: "Warns a member",
    category: 'admin',
    usage: `${(process.env.PREFIX)}warn`
}

module.exports.run = async (client, message, args) => {
    if(!message.member.hasPermission('MUTE_MEMBERS')) return message.reply('You can\'t use this command! :(');

    var user = message.mentions.users.first();
    if(!user) return message.reply('You must mention a user!');

    var member; 

    try {
        member = await message.guild.members.fetch(user);
    } catch(err) {
        member = null;
    }
s
    if(!member) return message.reply('They aren\'t in the server!');

    var reason = args.splice(1).join(' ');
    if(!reason) return message.reply('You need to give a reason!');

    var channel = message.guild.channels.cache.find(c => c.name === 'general');

    var embed = new MessageEmbed()
    .setTitle('User Warned')
    .addField('User:', user, true)
    .addField('By:', message.author, true)
    .addField('Reason:', reason)
    channel.send(embed);

    var embed = new MessageEmbed()
    .setTitle('You were warned!')
    .setDescription(reason);

    try {
        user.send(embed);
    } catch(err) {
        console.warn(err);
    }

    message.channel.send(`**${user}** you have been muted for ${reason}**!`);
}