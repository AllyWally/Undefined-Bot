module.exports = client => {
    console.log(`${client.user.username} is online.`)


    client.user.setPresence({
        status: 'dnd',
        activity: {
            name: `!help | Coming Soon!`,
            type: 'WATCHING'
        }
    });

}
