'use strict';

const GphApiClient = require('giphy-js-sdk-core')
const GIPHY_TOKEN = require('config.js').GIPHY_TOKEN;

const client = GphApiClient(GIPHY_TOKEN)

module.exports.cats = async () => {
    const response = await client.search('gifs', { "q": "cats" })
    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'text/html',
        },
        body: `
        <HTML>
        <HEAD> <TITLE>Activity - Insert animated GIF to HTML</TITLE> </HEAD>
        <BODY>
          <IMG SRC="${response.data[getRndInteger(0, 24)].images.original.url}">
        </BODY>
        </HTML>`,
    }
};

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}