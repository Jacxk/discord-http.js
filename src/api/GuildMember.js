const Request = require('../Request.js');
const User = require('./User.js');

class GuildMember {

    /**
     * @constructor
     * @param guildId {string} The ID of the Guild the User is in.
     * @param userId {string} The ID of the User to get the data from.
     */
    constructor(guildId, userId) {
        this._guildId = guildId;
        this._userId = userId;
        this._path = `/guilds/${guildId}/members/${userId}`;
    }

    /**
     * Get all the guild member data in one object.
     * @returns {Promise<object>}
     */
    getObject() {
        return new Promise(resolve => {
            Request.call('get', this._path).then(response => resolve(response)).catch(err => {
                let error = `${err.method} -- ${err.statusCode} - ${err.statusMessage}`;
                console.error(error);
            })
        });
    }

    /**
     * Get the guild member as a user.
     * @returns {Promise<boolean>}
     */
    getUser() {
        return new Promise(resolve => this.getObject().then(response => resolve(new User(response.user.id))));
    }

    /**
     * Get the guild member's roles
     * @param [toObject] {boolean} Send the data as a JSON Object instead of a class.
     * @returns {Promise<string>}
     */
    getRoles(toObject = false) {
        return new Promise(resolve => this.getObject().then(response => {
            if (toObject) resolve(response.roles);
            else resolve(response.roles);
        }));
    }

    /**
     * Get the date the user joined the guild.
     * @return {Promise<Date>}
     */
    getJoinedDate() {
        return new Promise(resolve => this.getObject().then(response => resolve(new Date(response.joined_at))));
    }

    /**
     * Get the nickname of the user if it has one.
     * @return {Promise<String>}
     */
    getNickName() {
        return new Promise(resolve => this.getObject().then(response => resolve(response.nick)));
    }

    /**
     * Whether the guild member is muted (Voice).
     * @return {Promise<Boolean>}
     */
    isMuted() {
        return new Promise(resolve => this.getObject().then(response => resolve(response.mute)));
    }

    /**
     * Whether the guild member is muted (Voice).
     * @return {Promise<Boolean>}
     */
    isDeafen() {
        return new Promise(resolve => this.getObject().then(response => resolve(response.mute)));
    }

    /**
     * Modify attributes of the guild member.
     * @param nick {String} Nickname to set to the guild member.
     * @param roles {Array<String>} Roles to add to the guild member.
     * @param mute {Boolean} Mute the guild member (Voice).
     * @param deaf {Boolean} Deafen the guild member (Voice).
     * @param channel_id {String} Id of channel to move user to (if they are connected to voice).
     * @return {Promise<GuildMember>}
     */
    modify({nick, roles, mute, deaf, channel_id}) {
        return new Promise(resolve => {
            Request.call('PATCH', this._path + '/members', {nick, roles, mute, deaf, channel_id}).then(() => {
                resolve(this);
            }).catch(err => {
                let error = `${err.method} -- ${err.statusCode} - ${err.statusMessage}`;
                console.error(error);
            })
        });
    }

    /**
     * Add a role to the guild member.
     * @param roleID {String} ID of the role to add.
     * @return {Promise<GuildMember>}
     */
    addRole(roleID) {
        return new Promise(resolve => {
            Request.call('put', this._path + '/roles/' + roleID).then(() => {
                resolve(this);
            }).catch(err => {
                let error = `${err.method} -- ${err.statusCode} - ${err.statusMessage}`;
                console.error(error);
            })
        });
    }

    /**
     * Remove a role from the guild member.
     * @param roleID {String} ID of the role to add.
     * @return {Promise<GuildMember>}
     */
    removeRole(roleID) {
        return new Promise(resolve => {
            Request.call('DELETE', this._path + '/roles/' + roleID).then(() => {
                resolve(this);
            }).catch(err => {
                let error = `${err.method} -- ${err.statusCode} - ${err.statusMessage}`;
                console.error(error);
            })
        });
    }

    /**
     * Kicks the member from the guild.
     */
    kickMember() {
        Request.call('DELETE', this._path).catch(err => {
            let error = `${err.method} -- ${err.statusCode} - ${err.statusMessage}`;
            console.error(error);
        })
    }

    /**
     * Bans the member from the guild.
     * @param reason {String} Reason why this user is getting banned.
     * @param deleteMessages {number} Number of days to delete messages for (0-7)
     */
    banMember(reason, deleteMessages = 0) {
        Request.call('PUT', `/guilds/${this._guildId}/bans/${this._userId}`, null, {
            ['delete-message-days']: deleteMessages,
            reason
        }).catch(err => {
            let error = `${err.method} -- ${err.statusCode} - ${err.statusMessage}`;
            console.error(error);
        })
    }
}

module.exports = GuildMember;
