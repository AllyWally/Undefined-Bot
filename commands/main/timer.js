const ms = require('ms')

module.exports = {
    name: "timer",
    category: 'main',
    description: 'Pings you when the timer is over',
    usage: `[p]timer`
}

module.exports.run = async(client, message, args) => {
    if (!args[0] || args[0] <= 0) return message.channel.send("Please enter a period of time for the timer to last!")
    let timer = args[0]
    try {
        let time = ms(ms(timer), { long: true })
        message.channel.send(":white_check_mark: Timer has been set for: " + `${time}`)
    } catch {
        message.channel.send("Please provide a valid amount of time!\nEg.: !!timer 1m")
    }
    setTimeout(function() {
        let time = ms(ms(timer), { long: true })
        message.channel.send(`Timer has ended ${message.author}, it lasted ${time}`)
    }, ms(timer))
}