const User = require('./User.js');
const Guild = require('./Guild.js');

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
     * @param id {string} ID of the guild you want to get.
     */
    getGuild(id) {
        return new Guild(id);
    }
}

module.exports = Client;