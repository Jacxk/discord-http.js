const Request = require('../Request.js');

class User {

    constructor(id) {
        this._Request = new Request();
        this._path = '/users/' + id;
    }

    /**
     * @return {Promise<any>}
     */
    getJsonObject() {
        return new Promise(resolve => {
            this._Request.call('get', this._path).then(response => resolve(response))
        });
    }

    /**
     * @return {Promise<any>}
     */
    isBot() {
        return new Promise(resolve => {
            this._Request.call('get', this._path).then(response => resolve(response.bot))
        });
    }

    /**
     * @return {Promise<any>}
     */
    getId() {
        return new Promise(resolve => {
            this._Request.call('get', this._path).then(response => resolve(response.id))
        });
    }

    /**
     * @return {Promise<any>}
     */
    getUsername() {
        return new Promise(resolve => {
            this._Request.call('get', this._path).then(response => resolve(response.username))
        });
    }

    /**
     * @return {Promise<any>}
     */
    getDiscriminator() {
        return new Promise(resolve => {
            this._Request.call('get', this._path).then(response => resolve(response.discriminator))
        });
    }

    /**
     * @return {Promise<any>}
     */
    getTag() {
        return new Promise(resolve => {
            this._Request.call('get', this._path).then(response => resolve(response.username + '#' + response.discriminator))
        });
    }

    /**
     * @return {Promise<any>}
     */
    getAvatarHash() {
        return new Promise(resolve => {
            this._Request.call('get', this._path).then(response => resolve(response.avatar))
        });
    }

    /**
     * @return {Promise<any>}
     */
    getAvatarUrl() {
        return new Promise(resolve => {
            this._Request.call('get', this._path).then(response =>
                resolve(`https://cdn.discordapp.com/avatars/${response.id}/${response.avatar}.png`))
        });
    }

    /**
     * @return {Promise<any>}
     */
    getVerified() {
        return new Promise(resolve => {
            this._Request.call('get', this._path).then(response => resolve(response.verified))
        });
    }

    /**
     * @return {Promise<any>}
     */
    getEmail() {
        return new Promise(resolve => {
            this._Request.call('get', this._path).then(response => resolve(response.email))
        });
    }
}

module.exports = User;
