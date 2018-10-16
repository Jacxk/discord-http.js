const Request = require('../Request.js');
const User = require('./User.js');
const Channel = require('./Channel.js');
const Emoji = require('./Emoji.js');
const GuildMember = require('./GuildMember.js');

class Guild {
    /**
     * @constructor
     * @param id {string} The ID of a Guild which the bot is in.
     */
    constructor(id) {
        this._guildId = id;
        this._path_ = '';
        this._path = '/guilds/' + id + this._path_;
    }

    /**
     * Get all the guild data in one object.
     * @returns {Promise<object>}
     */
    getObject() {
        return new Promise(resolve => {
            Request.call('get', this._path).then(response => resolve(response)).catch(err => {
                let error = `${err.method} -- ${err.statusCode} - ${err.statusMessage}`;
                console.error(error);
            });
            this._path_ = '';
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
        this._path_ = '/channels';
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
     * @param [permission_overwrites=[]] {Array} The channel's permission overwrites.
     * @param [topic] {String} The channel's topic (0-1024 characters).
     * @param [bitrate] {Number} The bitrate (in bits) of the voice channel (voice only).
     * @param [user_limit] {Number} The user limit of the voice channel (voice only).
     * @param [parent_id] {String} The id of the parent category for a channel.
     * @param [nsfw=false] {Boolean} Whether the channel is nsfw.
     * @param [toObject] {boolean} Send the data as a JSON Object instead of a class.
     * @example
     *  guild.createChannel('SomeName', 'voice', {parent_id: '1234567890'}).then(channel => {
     *      console.log(`New Channel created ${channel.name}`);
     *  }
     */
    createChannel(name, {type = 'text', permission_overwrites = [], parent_id, topic, bitrate, user_limit, nsfw, toObject = false} = {}) {
        this._path_ = '/channels';
        return new Promise(resolve => {
            Request.call('post', this._path, {
                name,
                type,
                permission_overwrites,
                parent_id,
                topic,
                bitrate,
                user_limit,
                nsfw,
            }).then(response => {
                if (toObject) resolve(response);
                else resolve(response);
            }).catch(err => {
                let error = `${err.method} -- ${err.statusCode} - ${err.statusMessage}`;
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
        this._path_ = '/members/' + memberId;
        return new Promise(resolve => this.getObject().then(response => {
            if (toObject) resolve(response);
            else resolve(new GuildMember(this._guildId, response.user.id));
        }));
    }

    /**
     * Get a list of members from the current guild.
     * @see {@link https://discordapp.com/developers/docs/resources/guild#list-guild-members}
     * @param [toObject] {boolean} Send the data as a JSON Object instead of a class.
     * @param [limit=1] {number} Max number of members to return (1-1000).
     * @param [after] {string} The highest user id in the previous page.
     * @returns {Promise<object|Array<GuildMember>>}
     */
    getGuildMembers(toObject = false, {limit = 1, after} = {}) {
        return new Promise(resolve => {
            Request.call('get', this._path + '/members', null, {limit, after}).then(response => {
                if (toObject) resolve(response);
                else {
                    let members = [];
                    for (let i = 0; i < response.length; i++) members.push({
                        reason: response.reason,
                        user: new GuildMember(this._guildId, response[i].user.id)
                    })
                    resolve(members);
                }
            }).catch(err => {
                let error = `${err.method} -- ${err.statusCode} - ${err.statusMessage}`;
                console.error(error);
            })
        });
    }

    /**
     * Get a list of users banned from the current guild.
     * @param [toObject] {boolean} Send the data as a JSON Object instead of a class.
     * @returns {Promise<Array>}
     */
    getBans(toObject = false) {
        this._path_ = '/bans';
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
     * @returns {Promise<object>}
     */
    getBan(userId, toObject = false) {
        this._path_ = '/bans/' + userId;
        return new Promise(resolve => this.getObject().then(response => {
            if (toObject) resolve(response);
            else resolve({
                reason: response.reason,
                user: new User(response.user.id)
            });
        }));
    }

    /**
     * Unban a user from the guild.
     * @param userId {String} ID of the user to unban.
     */
    unBanUser(userId) {
        Request.call('DELETE', this._path + '/bans/' + userId).catch(err => {
            let error = `${err.method} -- ${err.statusCode} - ${err.statusMessage}`;
            console.error(error);
        })
    }

    /**
     * Returns an object with one 'pruned' key indicating the number of members
     * that would be removed in a prune operation. Requires the 'KICK_MEMBERS' permission.
     * @param [days] {Number} Number of days to count prune for (1 or more)
     * @returns {Promise<Number>}
     */
    getPruneCount(days = 1) {
        return new Promise(resolve => {
            Request.call('get', this._path + '/prune', null, {days}).then(response => {
                resolve(response);
            }).catch(err => {
                let error = `${err.method} -- ${err.statusCode} - ${err.statusMessage}`;
                console.error(error);
            })
        });
    }

    /**
     * Get a list of invite objects from the current guild.
     * @returns {Promise<object>}
     */
    getInvites() {
        this._path_ = '/invites';
        return new Promise(resolve => this.getObject().then(response => resolve(response)));
    }


    /**
     * Get a list of integration objects from the current guild.
     * @returns {Promise<object>}
     */
    getIntegrations() {
        this._path_ = '/integrations';
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

    /**
     * Get A list of the guild's emojis
     * @param [toObject] {boolean} Send the data as a JSON Object instead of a class.
     * @returns Promise<Array<Emoji>|Object>
     */
    getEmojis(toObject = false) {
        this._path_ = '/emojis';
        return new Promise(resolve => this.getObject().then(response => {
            if (toObject) resolve(response);
            else {
                let emojis = [];
                for (let i = 0; i < response.length; i++) emojis.push({
                    reason: response.reason,
                    user: new Emoji(this._guildId, response[i].user.id)
                })
                resolve(emojis);
            }
        }));
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

    /**
     * @param [toObject] {boolean} Send the data as a JSON Object instead of a class.
     * @return {Promise<Array<Role>|object>}
     */
    getRoles(toObject = false) {
        return new Promise(resolve => this.getObject().then(response => {
            if (toObject) resolve(response.roles);
            else resolve(response.roles);
        }));
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