const User = require('./User.js');

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

}

module.exports = Client;