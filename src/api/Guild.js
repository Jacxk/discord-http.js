const Request = require('../Request.js');
const User = require('./User.js');
const Channel = require('./Channel.js');

class Guild {
    /**
     * @constructor
     * @param id {string} The ID of a Guild which the bot is in.
     */
    constructor(id) {
        this._path = '/guilds/' + id;
    }

    /**
     * Get all the guild data in one object.
     * @returns {Promise<object>}
     */
    getObject() {
        return new Promise(resolve => {
            Request.call('get', this._path).then(response => resolve(response)).catch(err => {
                if (!err.response) return console.error(err);
                let error = `GET -- ${err.status} - ${err.response.text}`;
                console.error(error);
            })
        });
    }

    /**
     * Get the guild's ID.
     * @returns {Promise<string>}
     */
    getId() {
        return new Promise(resolve => this.getObject().then(response => resolve(response.id)));
    }

    /**
     * Get a list of channels from the guild.
     * @returns {Promise<Array<Channel>|object>}
     * @param [toObject] {boolean} Send the data as a JSON Object instead of a list of classes
     */
    getChannels(toObject = false) {
        this._path += '/channels';
        return new Promise(async resolve => this.getObject().then(async response => {
            if (toObject) return resolve(response);
            const channels = [];
            for (let i = 0; i < response.length; i++) {
                await channels.push(new Channel(response[i].id));
            }
            resolve(channels);
        }));
    }

    /**
     * Creates a channel on the guild.
     * @see {@link https://discordapp.com/developers/docs/resources/guild#create-guild-channel}
     * @returns {Promise<Channel | object>}
     * @param name {string} Name of the channel to be created.
     * @param [type=text] {string} Type of the channel to be created, either 'text', 'voice', 'category'.
     * @param [options] {object} topic?: string, bitrate?: integer, user_limit?: integer,
     * permission_overwrites?: [overwrites]{@link https://discordapp.com/developers/docs/resources/channel#overwrite-object}>,
     * parent_id?: snowflake, nsfw?: boolean
     * @param [toObject] {boolean} Send the data as a JSON Object instead of a class.
     * @example
     *  guild.createChannel('SomeName', 'voice', {parent_id: '1234567890'}).then(channel => {
     *      console.log(`New Channel created ${channel.name}`);
     *  }
     */
    createChannel(name, type = 'text', options = {}, toObject = false) {
        this._path += '/channels';
        return new Promise(resolve => {
            const option = Object.assign({name, type}, options);
            Request.call('post', this._path, option).then(response => {
                if (toObject) resolve(response);
                else resolve(response);
            }).catch(err => {
                if (!err.response) return console.error(err);
                let error = `POST -- ${err.status} - ${err.response.text}`;
                console.error(error);
            })
        });
    }

    /**
     * Get a member from the current guild.
     * @param memberId {string} The ID of the member to get.
     * @param [toObject] {boolean} Send the data as a JSON Object instead of a class.
     * @returns {Promise<object|GuildMember>}
     */
    getGuildMember(memberId, toObject = false) {
        this._path += '/members/' + memberId;
        return new Promise(resolve => this.getObject().then(response => {
            if (toObject) resolve(response);
            else resolve(response);
        }));
    }

    /**
     * Get a list of members from the current guild.
     * @see {@link https://discordapp.com/developers/docs/resources/guild#list-guild-members}
     * @param [toObject] {boolean} Send the data as a JSON Object instead of a class.
     * @param [limit] {number} Max number of members to return (1-1000).
     * @param [after] {string} The highest user id in the previous page.
     * @returns {Promise<object|Array<GuildMember>>}
     */
    getGuildMembers(toObject = false, limit = 1, after = "0") {
        this._path += '/members';
        return new Promise(resolve => this.getObject().then(response => {
            if (toObject) resolve(response);
            else resolve(response);
        }));
    }

    /**
     * Get a list of users banned from the current guild.
     * @param [toObject] {boolean} Send the data as a JSON Object instead of a class.
     * @returns {Promise<object|Array<User>>}
     */
    getBans(toObject = false) {
        this._path += '/bans';
        return new Promise(resolve => this.getObject().then(response => {
            if (toObject) resolve(response);
            else {
                let users = [];
                for (let i = 0; i < response.length; i++) users.push({
                    reason: response.reason,
                    user: new User(response[i].user.id)
                })
                resolve(users);
            }
        }));
    }

    /**
     * Get a user banned from the current guild.
     * @param userId ID of the user banned.
     * @param [toObject] {boolean} Send the data as a JSON Object instead of a class.
     * @returns {Promise<object|User>}
     */
    getBan(userId, toObject = false) {
        this._path += '/bans/' + userId;
        return new Promise(resolve => this.getObject().then(response => {
            if (toObject) resolve(response);
            else resolve({
                reason: response.reason,
                user: new User(response.user.id)
            });
        }));
    }

    /**
     * Get the prune count from the current guild.
     * @returns {Promise<number>}
     */
    getPruneCount() {
        this._path += '/prune';
        return new Promise(resolve => this.getObject().then(response => resolve(response)));
    }

    /**
     * Get a list of invite objects from the current guild.
     * @returns {Promise<object>}
     */
    getInvites() {
        this._path += '/invites';
        return new Promise(resolve => this.getObject().then(response => resolve(response)));
    }


    /**
     * Get a list of integration objects from the current guild.
     * @returns {Promise<object>}
     */
    getIntegrations() {
        this._path += '/integrations';
        return new Promise(resolve => this.getObject().then(response => resolve(response)));
    }

    /**
     * Get the time until a user is set to AFK.
     * @returns {Promise<number>}
     */
    getAfkTimeout() {
        return new Promise(resolve => this.getObject().then(response => resolve(response.afk_timeout)));
    }

    getAfkChannel() {
        // TODO: Channel Class
    }

    /**
     * Get the guild's verification level.
     * @returns {Promise<number>}
     */
    getVerificationLevel() {
        return new Promise(resolve => this.getObject().then(response => resolve(response.verification_level)));
    }

    /**
     * Get the guild's explicit content filter.
     * @returns {Promise<number>}
     */
    getExplicitContentFilter() {
        return new Promise(resolve => this.getObject().then(response => resolve(response.explicit_content_filter)));
    }

    getEmojis() {
        // TODO: Emoji Class
    }

    /**
     * Get the owner of the guild.
     * @returns {Promise<User>}
     */
    getOwner() {
        return new Promise(resolve => this.getObject().then(response => resolve(new User(response.owner_id))));
    }

    /**
     * Get the guild's Multi-factor authentication level.
     * @returns {Promise<number>}
     */
    getMfaLevel() {
        return new Promise(resolve => this.getObject().then(response => resolve(response.mfa_level)));
    }

    /**
     * Get guild's icon hash.
     * @returns {Promise<string>}
     */
    getIconHash() {
        return new Promise(resolve => this.getObject().then(response => resolve(response.icon)));
    }

    /**
     * Get guild's icon url.
     * @returns {Promise<string>}
     */
    getIconUrl() {
        return new Promise(resolve => this.getObject().then(response =>
            resolve(!response.icon ? null : `https://cdn.discordapp.com/icons/${response.id}/${response.icon}.png`)
        ));
    }

    /**
     * Get guild's name.
     * @returns {Promise<string>}
     */
    getName() {
        return new Promise(resolve => this.getObject().then(response => resolve(response.name)));
    }

    getRoles() {
        // TODO: Roles Class
    }

    /**
     * Get guild's region.
     * @returns {Promise<string>}
     */
    getRegion() {
        return new Promise(resolve => this.getObject().then(response => resolve(response.region)));
    }
}

module.exports = Guild;