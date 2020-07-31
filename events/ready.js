const chalk = require('chalk');
module.exports = client => {
        console.log(`${chalk.green.bgBlack.bold(`Online as ${client.user.username}`)}`)


    client.user.setPresence({
        status: 'dnd',
        activity: {
            name: `!help in your server to get help | Coming Soon!`,
            type: 'PLAYING'
        }
    });


}