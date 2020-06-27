const { MessageEmbed, Message } = require("discord.js");

module.exports = {
  name: "mute",
  description: "Mute anyone who break rules",
  category: "admin",
  usage: "mute <@mention> <reason>"
}

module.exports.run = async (client, message, args) => {
    if (!message.member.hasPermission("MUTE_MEMBERS")) {
      return message.channel.send(
        "You don't have enough permission to use this command!"
      );
    }

    if (!message.guild.me.hasPermission("MUTE_MEMBERS")) {
      return message.channel.send("I do not have permission to manage roles.");
    }

    const user = message.mentions.members.first();
    
    if(!user) {
      return message.channel.send("Please mention the member to who you want to mute")
    }
    
    if(user.id === message.author.id) {
      return message.channel.send("I'm sorry but I'm not gonna mute you.");
    }
    
    
    let reason = args.slice(1).join(" ")
    
    
    if(!reason) {
      return message.channel.send("Please Give the reason to mute the member")
    }
    
  
    
    let muterole = message.guild.roles.cache.find(x => x.name === "Muted")
    
    
      if(!muterole) {
      return message.channel.send("Please create the role called `Muted`")
    }
    
    
   if(user.roles.cache.has(muterole)) {
      return message.channel.send("Given User is already muted")
    }
    
  
    
    
    user.roles.add(muterole)
    
    var channelmessage = new MessageEmbed()
    .setTitle(`User Muted`)
    .setDescription(`You muted **${message.mentions.users.first().username}**\n\n**Reason**: ${reason}`)
    .setColor("YELLOW")
    .setTimestamp()
    .setFooter(`${process.env.FOOTER} Moderation`)
    message.channel.send(channelmessage)
    
    var messageuser = new MessageEmbed()
    .setTitle(`You have been muted!`)
    .setDescription(`You are muted in ${message.guild.name}\n\n**Reason**: ${reason}`)
    .setColor("YELLOW")
    .setTimestamp()
    .setFooter(`${process.env.FOOTER} Moderation`)
    user.send(messageuser)

    
    

    
}