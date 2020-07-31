const { MessageEmbed } = require('discord.js');
const Guild = require('../../models/guild.js');
const mongoose = require('mongoose');


module.exports = {
    name: "settings",
    description: "Change some settings around",
    category: "admin",
    usage: "[p]settings"
}

module.exports.run = async(client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`You need the permission **ADMINISTRATOR** to perfrom this.`).then(cock => cock.delete({ timeout: 5000 }))
    const embed = new MessageEmbed()
    if (!args[0]) {
        embed.setAuthor(`Current Guild Settings`)
        embed.setColor(client.config.color)
        embed.setFooter(client.config.FooterSettings)
        Guild.findById(message.guild.id, async function(err, data) {
            if (err) return message.channel.send(`It seems an error was recieved, this has been reported to our dev team.`)
            if (!data) return client.logger.log(`No response recieved when creating a new guild table`, "error")
            data.save()
            let welcomeChan = message.guild.channels.cache.get(data.welcomeChannel)
            if (!welcomeChan) welcomeChan = "None set";
            let leaveChan = message.guild.channels.cache.get(data.leaveChannel)
            if (!leaveChan) leaveChan = "None set";
            if (data.leaveMessage == null) data.leaveMessage = "None set"
            if (data.welcomeMssg == undefined || data.welcomeMssg == null) data.welcomeMssg = "No welcome message set";
            let joinR = message.guild.roles.cache.get(data.joinRole)
            if (!joinR) joinR = `None set`
            embed.setDescription(`**Prefix** - ${data.prefix}\n**Welcome Channel** - ${welcomeChan}\n**Welcome Message** - ${data.welcomeMssg}\n**Leave Channel** - ${leaveChan}\n**Leave Message** - ${data.leaveMessage}\n**Join Role** - ${joinR}`)
            embed.addField(`Want to change settings?`, `Supply the keywords after the command to activate that prompt`)
            embed.addField(`Keywords`, `prefix\nwelcomes\nwelcomeMessage\nleaves\nleaveMessage\njoinRole`)
            return message.channel.send(embed)
        })
    } else {
        let keyword = args.slice(0).join(" ").toLowerCase()

        if (keyword == "prefix") {
            client.waitReply(message, `What should the new prefix be?`).then(res => {
                if (res == false) return message.channel.send(`Time expired.`)
                Guild.findByIdAndUpdate({ _id: message.guild.id }, { prefix: res }, function(err, res) {
                    if (err) return message.channel.send(`The database failed to save, our developers have been notified.`)
                    if (!res) return console.log(`No result recieved from ${message.guild.id}'s database, possibly a not created database?`)
                })
                return message.channel.send(`The prefix was updated to ${res}`)
            })
        } else if (keyword == "welcomes") {
            client.waitReply(message, `Please type the ID of the welcomes channel.`).then(res => {
                if (res == false) return message.channel.send(`Time expired.`)
                let channelFound = message.guild.channels.cache.get(res)
                if (!res) return message.channel.send(`That's not a valid channel.`)
                Guild.findByIdAndUpdate({ _id: message.guild.id }, { welcomeChannel: res }, function(err, res) {
                    if (err) return message.channel.send(`The database failed to save, our developers have been notified.`)
                    if (!res) return console.log(`No result recieved from ${message.guild.id}'s database, possibly a not created database?`)
                })
                return message.channel.send(`The welcome channel was updated to ${channelFound}`)
            })
        } else if (keyword == "welcomemessage") {
            client.waitReply(message, `What should the welcome message be?\nYou can refer to our website for variables.`).then(res => {
                if (res == false) return message.channel.send(`Time expired.`)
                Guild.findByIdAndUpdate({ _id: message.guild.id }, { welcomeMssg: res }, function(err, res) {
                    if (err) return message.channel.send(`The database failed to save, our developers have been notified.`)
                    if (!res) return console.log(`No result recieved from ${message.guild.id}'s database, possibly a not created database?`)
                })
                return message.channel.send(`The welcome message was updated to: **${res}**`)
            })
        } else if (keyword == "leaves") {
            client.waitReply(message, `Type the ID of the leave channel.`).then(res => {
                if (res == false) return message.channel.send(`Time expired.`)
                let channelFound = message.guild.channels.cache.get(res)
                if (!res) return message.channel.send(`That's not a valid channel.`)
                Guild.findByIdAndUpdate({ _id: message.guild.id }, { leaveChannel: res }, function(err, res) {
                    if (err) return message.channel.send(`The database failed to save, our developers have been notified.`)
                    if (!res) return console.log(`No result recieved from ${message.guild.id}'s database, possibly a not created database?`)
                })
                return message.channel.send(`The leave channel was updated to: ${channelFound}`)
            })
        } else if (keyword == "leavemessage") {
            client.waitReply(message, `Type the leave message.`).then(res => {
                if (res == false) return message.channel.send(`Time expired.`)
                Guild.findByIdAndUpdate({ _id: message.guild.id }, { leaveMessage: res }, function(err, res) {
                    if (err) return message.channel.send(`The database failed to save, our developers have been notified.`)
                    if (!res) return console.log(`No result recieved from ${message.guild.id}'s database, possibly a not created database?`)
                })
                return message.channel.send(`The leave message was updated to: **${res}**`)
            })
        } else if (keyword == "joinrole") {
            client.waitReply(message, `Input the ID of the join role.`).then(res => {
                if (res == false) return message.channel.send(`Time expired.`)
                let role = message.guild.roles.cache.get(res)
                if (!role) return message.channel.send(`That's not a valid role.`)
                Guild.findByIdAndUpdate({ _id: message.guild.id }, { joinRole: res }, function(err, res) {
                    if (err) return message.channel.send(`The database failed to save, our developers have been notified.`)
                    if (!res) return console.log(`No result recieved from ${message.guild.id}'s database, possibly a not created database?`)
                })
                return message.channel.send(`The join role was set to: **${role}**`)
            })
        } else {
            return message.channel.send(`That's not a valid keyword, refer to the command.`)
        }
    }

}


function gatherSettings(id) {

}