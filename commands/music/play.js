const { Util } = require('discord.js')
queue = new Map()

const Youtube = require('simple-youtube-api')
module.exports = {
    name: "play",
    category: 'music',
    description: 'Play some cool tunes',
    usage: `[p]play [song]`,
    q: queue
}

module.exports.run = async(client, message, args) => {
    const youtube = new Youtube(client.config.youtubeAPI)
    require('../../utils/functions')(client);

    const { play } = require('../../functions/playFunc.js')
    const searchString = args.slice(0).join(' ')
    const url = args[0] ? args[0].replace(/<(._)>/g, '$1') : ''
    const serverQueue = queue.get(message.guild.id)
    const voiceChannel = message.member.voice.channel;


    if (!voiceChannel.joinable) return message.channel.send(`Your current voice channel is not joinable!`).then(cock => cock.delete({ timeout: 5000 }))
    if (!voiceChannel.speakable) return message.channel.send(`I can not speak in this voice channel`).then(cock => cock.delete({ timeout: 5000 }))
    try {
        var video = await youtube.getVideoByID(url)
    } catch {
        try {
            var videos = await youtube.searchVideos(searchString, 1)
            var video = await youtube.getVideoByID(videos[0].id)
        } catch {
            return message.channel.send("I couldn\'t find any search results")
        }
    }

    const song = {
        id: video.id,
        title: Util.escapeMarkdown(video.title),
        url: `https://www.youtube.com/watch?v=${video.id}`
    }

    if (!serverQueue) {
        const queueConstruct = {
            textChannel: message.channel,
            voiceChannel: voiceChannel,
            connection: null,
            songs: [],
            volume: 5,
            playing: true
        }
        queue.set(message.guild.id, queueConstruct)

        queueConstruct.songs.push(song)

        try {
            var connection = await voiceChannel.join()
            queueConstruct.connection = connection
            play(message.guild, queueConstruct.songs[0])
        } catch (error) {
            console.log(`This is the error: ${error}`)
            queue.delete(message.guild.id)
            return message.channel.send(`There is the error: ${error} join our discord by doing !help`)
        }
    } else {
        serverQueue.songs.push(song)
        return message.channel.send(`**${song.title}** has been added to the queue`)
    }
    return undefined
}