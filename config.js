require('dotenv').config();

module.exports = {
    prefix: process.env.PREFIX,
    defaultSettings: {
        prefix: process.env.PREFIX,
        welcomeChannel: 'welcome-leave',
        leaveChannel: 'welcome-leave'
    }
};