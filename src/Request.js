const got = require('got');

class Request {
    static async call(method, path, body = null, query = null) {
        if (!process.env.DiscordHttpJsToken) throw 'Could not find the bot token!';

        /*
                const {body} = await superagent(method.toUpperCase(), 'https://discordapp.com/api' + path)
                    .set('User-Agent', 'DiscordBot (discord-https.js, v0.0.1)')
                    .set('Content-Type', 'application/json')
                    .set('Authorization', 'Bot ' + process.env.DiscordHttpsJsToken)
                    .send(data);
        */

        const request = await got('https://discordapp.com/api' + path, {
            headers: {
                'User-Agent': `DiscordBot (discord-https.js, v${process.env.npm_package_version})`,
                'Authorization': 'Bot ' + process.env.DiscordHttpJsToken
            },
            body, query, json: true,
            method: method.toUpperCase()
        });

        return request.body;
    }
}

module.exports = Request;
