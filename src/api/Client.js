const User = require('./User.js');
const Guild = require('./Guild.js');

/**
 * @name Client
 */
class Client {

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
     */
    getGuild(id) {
        return new Guild(id);
    }
}

module.exports = Client;