const superagent = require('superagent');

class Request {
    static async call(method, path) {
        if (!process.env.DiscordHttpsJsToken) throw 'Could not find the bot token!';

        const {body} = await superagent(method.toUpperCase(), 'https://discordapp.com/api' + path)
            .set('User-Agent', 'DiscordBot (discord-https.js, v0.0.1)')
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bot ' + process.env.DiscordHttpsJsToken).http2();

        return body;
    }
}

module.exports = Request;
