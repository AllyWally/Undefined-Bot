const { MessageEmbed } = require('discord.js');


module.exports = {
    name: "support",
    category: 'main',
    description: 'Gives Information on the bot',
    usage: `[p]support`
}

module.exports.run = async(client, message, args) => {

    const embed = new MessageEmbed()

    embed.setTitle("⬇️ **Undefined Help** ⬇️")
    embed.setColor(process.env.COLOR)
        .addField("Support Discord", "● [Join the Server](https://discord.gg/gYP4bgU)", true)
        .addField("Invite Undefined Bot!", "● [Click here](https://discord.com/api/oauth2/authorize?client_id=725530493566844928&permissions=8&scope=bot)", true)
        .setFooter('Join our Disocrd to get updates!')
    message.channel.send(embed)
}