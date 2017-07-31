'use strict';

const { ApiAiApp } = require('actions-on-google');
const functions = require('firebase-functions');
const { sprintf } = require('sprintf-js');

process.env.DEBUG = 'actions-on-google:*';

const Actions = {
    UNRECOGNIZED_DEEP_LINK: 'deeplink.unknown',
    INPUT_COMMAND_LINK: 'input.command',
    INPUT_WELCOME_LINK: 'input.welcome'
};

/**
 * Greet the user and direct them to next turn
 * @param {ApiAiApp} app ApiAiApp instance
 * @return {void}
 */
const unhandledDeepLinks = app => {
    /** @type {string} */
    const rawInput = app.getRawInput();
    const response = sprintf("Jarvis dont know what you say. %s", rawInput);
    console.log(`Jarvis response unknown: ${response}`);
    app.ask(response);
};

const inputCommandLinks = app => {
    const rawInput = app.getRawInput();
    const response = sprintf("Jarvis is very early version and cant response this question right now.");
    console.log(`Jarvis response: ${response}`);
    app.ask(response);
};

const inputWelcomeLinks = app => {
    const response = "Hello Johnny. This is very early version, jarvis may be unstable. Version: 0.0.1. ";
    console.log(`Jarvis : ${response}`);
    app.ask(response);
};

const actionMap = new Map();
actionMap.set(Actions.UNRECOGNIZED_DEEP_LINK, unhandledDeepLinks);
actionMap.set(Actions.INPUT_COMMAND_LINK, inputCommandLinks);
actionMap.set(Actions.INPUT_WELCOME_LINK, inputWelcomeLinks);

const jarvis = functions.https.onRequest((request, response) => {
    const app = new ApiAiApp({ request, response });
    console.log(`Request headers: ${JSON.stringify(request.headers)}`);
    console.log(`Request body: ${JSON.stringify(request.body)}`);
    app.handleRequest(actionMap);
});

var webRequest = require('request');

const get_aqi = functions.https.onRequest((request, response) => {

    webRequest.get("https://api.waqi.info/feed/shanghai/?token=b61be407271b9003881f67ae5ff04739ad6b469b",
        function(error, res, body) {
            if (!error && res.statusCode === 200) {
                var info = JSON.parse(body);
                if (info.status === "ok") {
                    var data = {};
                    data[aqi] = info.data.aqi;
                    console.log(`Get Aqi: ${JSON.stringify(data)}`);
                    response.send(JSON.stringify(data));
                }
                console.log(body);
            } else {
                console.log(`request error: ${res.statusCode}`);
            }
        });

    console.log(`Request headers: ${JSON.stringify(request.headers)}`);
    console.log(`Request body: ${JSON.stringify(request.body)}`);
});


module.exports = {
    jarvis,
    get_aqi
};