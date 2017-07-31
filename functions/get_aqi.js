'use strict';

const functions = require('firebase-functions');
var webRequest = require('request');

const get_aqi = functions.https.onRequest((request, response) => {

    webRequest('https://www.baidu.com', function (error, res, body) {
        if (!error && res.statusCode == 200) {
            console.log(body);		//请求百度首页，返回的Html数据
        }
    });

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
