const { MessageEmbed, Message } = require("discord.js");

module.exports = {
  name: "unmute",
  description: "Unmute anyone whos has been muted ",
  category: "admin",
  usage: "unmute <@mention> <reason>"
}

module.exports.run = async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_ROLES")) {
        return message.channel.send(
          "You don't have enough permission to use this command!"
        );
      }
  
      if (!message.guild.me.hasPermission("MANAGE_ROLES")) {
        return message.channel.send("I do not have permission to manage roles.");
      }
  
      const user = message.mentions.members.first();
  
      if (!user) {
        return message.channel.send(
          "Please mention the member to who you want to unmute"
        );
      }
      
      let muterole = message.guild.roles.cache.find(x => x.name === "Muted")
      
      
   if(user.roles.cache.has(muterole)) {
        return message.channel.send("Given User do not have mute role so what i am suppose to take")
      }
      
      
      user.roles.remove(muterole)
      
      async = message.channel.send(`**${message.mentions.users.first().username}** is unmuted`)
      
      user.send(`You are now unmuted from **${message.guild.name}**`)
  
    };
