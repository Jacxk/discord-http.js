# Discord-HTTP.JS

[![NPM](https://nodei.co/npm/discord-http.js.png)](https://nodei.co/npm/discord-http.js/)

**discord-http.js** is a discord wrapper library will help you get data from your discord bot without getting it online. 
It does not use websockets which means that this library is limited. Use [discord.js](https://discord.js.org) 
to get full access to the discord api.

## Installation

`npm i discord-http.js --save`

## Get Started


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

I'll get the docs hosted on a website as soon as possible

*This is still work in progress. More to come.*
