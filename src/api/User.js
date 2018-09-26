const Request = require('../Request.js');

/**
 * @name User
 */
class User {

    constructor(id) {
        this._Request = new Request();
        this._path = '/users/' + id;
    }

    /**
     * Get all the user data in one object.
     * @returns {Promise<object>}
     */
    getObject() {
        return new Promise(resolve => {
            this._Request.call('get', this._path).then(response => resolve(response))
        });
    }

    /**
     * Check if the user is a bot.
     * @returns {Promise<boolean>}
     */
    isBot() {
        return new Promise(resolve => {
            this._Request.call('get', this._path).then(response => resolve(response.bot))
        });
    }

    /**
     * Get the ID of the user.
     * @returns {Promise<string>}
     */
    getId() {
        return new Promise(resolve => {
            this._Request.call('get', this._path).then(response => resolve(response.id))
        });
    }

    /**
     * Get the user's Username. (my_name)
     * @returns {Promise<string>}
     */
    getUsername() {
        return new Promise(resolve => {
            this._Request.call('get', this._path).then(response => resolve(response.username))
        });
    }

    /**
     * Get the user's discriminator. (1234)
     * @returns {Promise<string>}
     */
    getDiscriminator() {
        return new Promise(resolve => {
            this._Request.call('get', this._path).then(response => resolve(response.discriminator))
        });
    }

    /**
     * Get the user's tag. (my_name#1234)
     * @returns {Promise<string>}
     */
    getTag() {
        return new Promise(resolve => {
            this._Request.call('get', this._path).then(response => resolve(response.username + '#' + response.discriminator))
        });
    }

    /**
     * Get the user's avatar hash.
     * @returns {Promise<string>}
     */
    getAvatarHash() {
        return new Promise(resolve => {
            this._Request.call('get', this._path).then(response => resolve(response.avatar))
        });
    }

    /**
     * Get the user's avatar in url form.
     * @returns {Promise<string>}
     */
    getAvatarUrl() {
        return new Promise(resolve => {
            this._Request.call('get', this._path).then(response =>
                resolve(`https://cdn.discordapp.com/avatars/${response.id}/${response.avatar}.png`))
        });
    }

    /**
     * Check if the user is verified.
     * @returns {Promise<boolean>}
     */
    isVerified() {
        return new Promise(resolve => {
            this._Request.call('get', this._path).then(response => resolve(response.verified))
        });
    }

    /**
     * Get the user's email.
     * @returns {Promise<string>}
     */
    getEmail() {
        return new Promise(resolve => {
            this._Request.call('get', this._path).then(response => resolve(response.email))
        });
    }
}

module.exports = User;
