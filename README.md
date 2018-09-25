**Discord-HTTP.JS**

This will help you get data from your discord bot without getting it online. It does not use websockets which means that 
this library is limited. Use [discord.js](https://discord.js.org) to get full access to the discord api.

**Installation**

`npm i discord-http.js --save`

**Get Started**

You just need to require this module and create an async function to await for the response, just like this:
```javascript
const DiscordHttp = require('discord-http.js');
const client = new DiscordHttp.Client('Token Here');

async function getBotInfo() {
    const user = client.getUser();

    const username = await user.getUsername();

    console.log("Username: %s", username)
}

getBotInfo().catch(console.error);
```

[Example Code](https://github.com/Jacxk/discord-http.js/blob/master/test/test.js)

**Methods**

Client:
```
Client#getUser()
```

User:
```
User#getJsonObject() - Get everything from bellow (object)
User#isBot() - Check if the user is a bot (boolean)
User#getId() - Get the id of the user (string)
User#getUsername() - Get the username of the user (string)
User#getDiscriminator() - Get the discriminator of the user (string)
User#getTag() - Get the tag of the user (string)
User#getAvatarHash() - Get the avatar hash of the user (string)
User#getAvatarUrl() - Get the avatar's url of the user (string)
User#isVerified() - Get if the user is verified (boolean)
User#getEmail() - Get the email of the user (string)
```

This is still work in progress. More to come.