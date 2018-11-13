'use strict';

const ipsum = require("lorem-ipsum")

module.exports.ipsum = async () => ({
    statusCode: 200,
    body: ipsum(),
});
