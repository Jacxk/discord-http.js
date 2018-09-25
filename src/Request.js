const superagent = require('superagent');

class Request {
    constructor() {
        this._token = process.env.DiscordHttpsJsToken;
    }

    async call(method, path) {
        if (!this._token) throw 'Could not find the bot token!';

        const {body} = await superagent(method.toUpperCase(), 'https://discordapp.com/api' + path)
            .set('User-Agent', 'DiscordBot (discord-https.js, v0.0.1)')
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bot ' + this._token).http2();

        return body;
    }
}

module.exports = Request;
