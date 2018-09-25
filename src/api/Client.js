const User = require('./User.js');

class Client {

    constructor(token) {
        process.env.DiscordHttpsJsToken = token;
        this._User = new User('@me');
    }

    getUser() {
        return this._User;
    }

}

module.exports = Client;