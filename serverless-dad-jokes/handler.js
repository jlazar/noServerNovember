'use strict';

const Twitter = require('twitter');
const config = require('./config');
const axios = require('axios');

const twitterClient = new Twitter(config);

/**
 * @param {*} status
 * @return {Promise}
 */
function statusUpdate(status) {
    return twitterClient.post('statuses/update', { status });
}

/**
 * @return {Promise}
 */
async function getRandomDadJoke() {
    const response = await axios.get('https://icanhazdadjoke.com/', { headers: { Accept: 'text/plain' } });
    return response.data;
}

module.exports.tweet = async (event, context) => {
    let joke;
    let statusCode;
    let message;
    try {
        joke = await getRandomDadJoke();
        await statusUpdate(joke);
        statusCode = 200;
        message = `Tweeted Dad joke: ${joke}`;
    } catch (e) {
        console.log(e);
        statusCode = 500;
        message = 'Failed to tweet dad joke';
    }

    return {
        statusCode,
        body: JSON.stringify({ message }),
    };
};
