const Guild = require('./Guild.js');
const User = require('./User.js');
const Channel = require('./Channel.js');
const Request = require('../Request.js');

class Message {
    /**
     * @constructor
     * @param channelId {string} The ID of the channel the message is.
     * @param messageId {string} The ID of the message to get.
     */
    constructor(channelId, messageId) {
        this._path = `/channels/${channelId}/messages/${messageId}`;
    }

    /**
     * Get all the message data in one object.
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
     * Get the guild the message is in.
     * @return {Promise<Guild>}
     */
    getGuild() {
        return new Promise(resolve => this.getObject().then(response => resolve(new Guild(response.guild_id))));
    }

    /**
     * Get the channel the message is in.
     * @return {Promise<Guild>}
     */
    getChannel() {
        return new Promise(resolve => this.getObject().then(response => resolve(new Channel(response.channel_id))));
    }

    /**
     * Get the ID of the current message.
     * @return {Promise<String>}
     */
    getId() {
        return new Promise(resolve => this.getObject().then(response => resolve(response.id)));
    }

    /**
     * Get the author of the message (Might not be always a user).
     * @return {Promise<User>}
     */
    getAuthor() {
        return new Promise(resolve => this.getObject().then(response => resolve(new User(response.author.id))));
    }

    /**
     * Get the member who sent the message.
     * @return {Promise<GuildMember>}
     */
    getGuildMember() {
        return new Promise(resolve => this.getObject().then(response => resolve(response.member)));
    }

    /**
     * Get the contents of the message.
     * @return {Promise<string>}
     */
    getContent() {
        return new Promise(resolve => this.getObject().then(response => resolve(response.content)));
    }

    /**
     * Get when the message was sent.
     * @return {Promise<number>}
     */
    getTimestamp() {
        return new Promise(resolve => this.getObject().then(response => resolve(response.timestamp)));
    }

    /**
     * Get when the message was edited (or null if never).
     * @return {Promise<number>}
     */
    getEditedTimestamp() {
        return new Promise(resolve => this.getObject().then(response => resolve(response.edited_timestamp)));
    }

    /**
     * Get whether it was a TTS message.
     * @return {Promise<boolean>}
     */
    isTts() {
        return new Promise(resolve => this.getObject().then(response => resolve(response.tts)));
    }

    /**
     * Get whether the message mentions everyone.
     * @return {Promise<boolean>}
     */
    mentionsEveryone() {
        return new Promise(resolve => this.getObject().then(response => resolve(response.mention_everyone)));
    }

    /**
     * Get the users specifically mentioned in the message.
     * @return {Promise<User>}
     */
    getUserMentions() {
        return new Promise(resolve => this.getObject().then(response => resolve(response.mentions)));
    }

    /**
     * Get the roles specifically mentioned in the message.
     * @return {Promise<Role>}
     */
    getRoleMentions() {
        return new Promise(resolve => this.getObject().then(response => resolve(response.mention_roles)));
    }

    /**
     * Get any attached files.
     * @return {Promise<object>}
     */
    getAttachments() {
        return new Promise(resolve => this.getObject().then(response => resolve(response.attachments)));
    }

    /**
     * Get any embedded content.
     * @return {Promise<object>}
     */
    getEmbeds() {
        return new Promise(resolve => this.getObject().then(response => resolve(response.embeds)));
    }

    /**
     * Get reactions to the message.
     * @return {Promise<object>}
     */
    getReactions() {
        return new Promise(resolve => this.getObject().then(response => resolve(response.reactions)));
    }

    /**
     * Get whether this message is pinned
     * @return {Promise<boolean>}
     */
    isPinned() {
        return new Promise(resolve => this.getObject().then(response => resolve(response.pinned)));
    }

    /**
     * Get the type of message.
     * @return {Promise<number>}
     */
    getType() {
        return new Promise(resolve => this.getObject().then(response => resolve(response.pinned)));
    }

    /**
     * If the message is generated by a webhook, this is the webhook's id
     * @return {Promise<string>}
     */
    getWebhookId() {
        return new Promise(resolve => this.getObject().then(response => resolve(response.webhook_id)));
    }

}

module.exports = Message;