const DiscordHttp = require('../src/');
const config = require('./config.js');
const client = new DiscordHttp.Client(config.bot_token);

async function getBotInfo() {
    const user = client.getUser();

    const tag = await user.getTag();
    const id = await user.getId();
    const avatarUrl = await user.getAvatarUrl();

    console.log("Tag: %s\nID: %s\nAvatarUrl: %s", tag, id, avatarUrl)
}

getBotInfo().catch(console.error);