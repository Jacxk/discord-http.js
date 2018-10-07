const User = require('./User.js');
const Guild = require('./Guild.js');
const Request = require('../Request.js');

class Client {

    /**
     * @constructor
     * @param token {string} The bot's token.
     */
    constructor(token) {
        process.env.DiscordHttpsJsToken = token;
        this._User = new User('@me');
    }

    /**
     * Get the user object
     * @returns User
     */
    getUser() {
        return this._User;
    }

    /**
     * Get a specific guild from the client
     * @returns Guild
     * @param guildId {string} ID of the guild you want to get.
     */
    getGuild(guildId) {
        return new Guild(guildId);
    }

    /**
     * @see {@link https://discordapp.com/developers/docs/resources/user#get-current-user-guilds}
     * @param [toObject] {boolean} Send the data as a JSON Object instead of a class.
     * @param [limit=100] {number} Max number of guilds to return (1-100).
     * @param [before] {string} Get guilds before this guild ID.
     * @param [after] {string} Get guilds after this guild ID.
     * @returns Promise<Array<Guild>|object>
     * @example
     *  async function getGuilds() {
     *      const guilds = await client.getGuilds(true, {limit: 10, after: "1234567890"});
     *      console.log(guilds);
     *  }
     */
    getGuilds(toObject = false, {limit, before, after}) {
        return new Promise(resolve => {
            Request.call('get', '/users/@me/guilds').then(async response => {
                if (toObject) return resolve(response);
                const guilds = [];

                for (let i = 0; i < response.length; i++) {
                    await guilds.push(new Guild(response[i].id));
                }

                resolve(guilds);
            }).catch(err => {
                if (!err.response) return console.error(err);
                let error = `GET -- ${err.status} - ${err.response.text}`;
                console.error(error);
            })
        });
    }

    /**
     * Make the Client leave the specified guild.
     * @param guildId {string}
     */
    leaveGuild(guildId) {
        Request.call('DELETE', '/users/@me/guilds/' + guildId).catch(err => {
            if (!err.response) return console.error(err);
            let error = `DELETE -- ${err.status} - ${err.response.text}`;
            console.error(error);
        })
    }

    /**
     * Change the username of the client.
     * @param username {string}
     * @return {Promise<User>}
     */
    setUsername(username) {
        return new Promise(resolve => {
            Request.call('PATCH', '/users/@me', {username}).then(response => {
                resolve(new User(response.id));
            }).catch(err => {
                if (!err.response) return console.error(err);
                let error = `GET -- ${err.status} - ${err.response.text}`;
                console.error(error);
            })
        })
    }
}

module.exports = Client;