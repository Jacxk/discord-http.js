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

async function getGuildInfo() {
    const guild = client.getGuild("Some Guild's Id Here");

    const name = await guild.getName();
    const id = await guild.getId();
    const iconUrl = await guild.getIconUrl();

    console.log("Name: %s\nID: %s\nIconUrl: %s", name, id, iconUrl)
}

getBotInfo().catch(console.error);
getGuildInfo().catch(console.error);