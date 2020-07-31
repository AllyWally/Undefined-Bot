const { MessageEmbed } = require('discord.js');
const { q } = require('./play.js')
const { readFileSync } = require('fs')
const { getRandomX, playQuizSong } = require(`../../utils/functions.js`);
module.exports = {
    name: "quiz",
    category: 'music',
    description: 'Stop the current music playing',
    usage: `[p]quiz`
}

module.exports.run = async(client, message, args) => {
    const serverQueue = q.get(message.guild.id)
    if (!message.member.voice.channel) return message.channel.send("You need to be in a voice channel to stop the music!")
    if (serverQueue) return message.channel.send(`A quiz can not be live while music is playing.`)
    const vc = message.member.voice.channel;
    message.guild.triviaData.isTriviaOn = true;

    const jsonSongs = readFileSync('music/musicTrivia.json', "utf-8");
    var videoDataArr = JSON.parse(jsonSongs).songs;
    const randomXVideos = getRandomX(videoDataArr, jsonSongs.length);

    const infoEmbed = new MessageEmbed()
        .setColor("BLUE")
        .setAuthor(`Music quiz starting.`)
        .setDescription(`There are ${jsonSongs.length} songs in the quiz, you have **30** seconds to guess the artist or name of the song.\nYou can end this quiz by doing **[p]end-quiz**`)
    message.channel.send(infoEmbed)

    for (let i = 0; i < randomXVideos.length; i++) {
        const song = {
            url: randomXVideos[i].url,
            artist: randomXVideos[i].artist,
            title: randomXVideos[i].title,
            voiceChannel: message.member.voice.channel
        }

        const channelInfo = Array.from(message.member.voice.channel.members.entries());
        channelInfo.forEach(u => {
            if (user[1].user.bot) return;
            message.guild.triviaData.triviaScore.set(user[1].user.username, 0);
        })
        playQuizSong(message.guild.triviaData.triviaQueue, message);
    }


}