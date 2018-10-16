const Request = require('../Request.js');

class Role {
    /**
     * @constructor
     * @param guildId {String} ID of the guild the role is in.
     * @param roleID {String} ID of the role.
     */
    constructor(guildId, roleID) {
        this._roleId = roleID;
        this._path = `/guilds/${guildId}/roles`;
    }

    /**
     * Get all the message data in one object.
     * @returns {Promise<object>}
     */
    getObject() {
        return new Promise((resolve, reject) => {
            Request.call('get', this._path).then(response => {
                const role = response.filter(role => role.id === this._roleId)[0];
                if (!role) reject({err: {method: 'GET', statusCode: 400, statusMessage: "Role not found"}});
                resolve(role);
            }).catch(err => {
                let error = `${err.method} -- ${err.statusCode} - ${err.statusMessage}`;
                console.error(error);
            })
        });
    }

    /**
     * Change the position of the role.
     * @param position {Number} The new position of the role.
     * @return {Promise<Role>}
     */
    setPosition(position) {
        return new Promise((resolve, reject) => {
            Request.call('get', this._path, {id: this._roleId, position}).then(response => {
                const role = response.filter(role => role.id === this._roleId)[0];
                if (!role) reject({err: {method: 'GET', statusCode: 400, statusMessage: "Role not found"}});
                resolve(this);
            }).catch(err => {
                let error = `${err.method} -- ${err.statusCode} - ${err.statusMessage}`;
                console.error(error);
            })
        });
    }

    /**
     * Modify the attributes of the role.
     * @param name {String} Name of the role.
     * @param permissions {Number} Bitwise of the enabled/disabled permissions.
     * @param color {Number} RGB color value.
     * @param hoist {Boolean} Whether the role should be displayed separately in the sidebar.
     * @param mentionable {Boolean} Whether the role should be mentionable.
     * @return {Promise<Role>}
     */
    modify({name, permissions, color = 0, hoist = false, mentionable = false}) {
        return new Promise(resolve => {
            Request.call('PATCH', this._path + '/' + this._roleId, null, {
                name,
                permissions,
                color,
                hoist,
                mentionable
            }).then(response => {
                resolve(this);
            }).catch(err => {
                let error = `${err.method} -- ${err.statusCode} - ${err.statusMessage}`;
                console.error(error);
            })
        });
    }

    /**
     * Get the ID of the current message.
     * @return {Promise<String>}
     */
    getId() {
        return new Promise(resolve => this.getObject().then(response => resolve(response.id)));
    }

    /**
     * Name of the role.
     * @return {Promise<String>}
     */
    getName() {
        return new Promise(resolve => this.getObject().then(response => resolve(response.name)));
    }

    /**
     * Whether the role is mentionable
     * @return {Promise<Boolean>}
     */
    isMentionable() {
        return new Promise(resolve => this.getObject().then(response => resolve(response.mentionable)));
    }

    /**
     * Get an integer representation of hexadecimal color code
     * @return {Promise<Number>}
     */
    getColor() {
        return new Promise(resolve => this.getObject().then(response => resolve(response.color)));
    }

    /**
     * Get the position of the role.
     * @return {Promise<Number>}
     */
    getPosition() {
        return new Promise(resolve => this.getObject().then(response => resolve(response.position)));
    }

    /**
     * Whether the role is managed by an integration
     * @return {Promise<Boolean>}
     */
    isManaged() {
        return new Promise(resolve => this.getObject().then(response => resolve(response.managed)));
    }

    /**
     * Whether the role is pinned in the user listing
     * @return {Promise<Boolean>}
     */
    isHoist() {
        return new Promise(resolve => this.getObject().then(response => resolve(response.hoist)));
    }

    /**
     * Get permission bit set.
     * @return {Promise<Number>}
     */
    getPermissions() {
        return new Promise(resolve => this.getObject().then(response => resolve(response.permissions)));
    }
}

module.exports = Role;