var request = require('request');

function get(req, res, next) {

    if (!checkQuery(res, req.query)) {
        return;
    }

    request.get(`https://api.waqi.info/feed/${req.query.city}/?token=b61be407271b9003881f67ae5ff04739ad6b469b`,
        function(error, response, body) {
            if (!error && response.statusCode === 200) {
                var info = JSON.parse(body);
                if (info.status === "ok") {
                    var data = {};
                    data.aqi = info.data.aqi;
                    console.log(`Get Aqi: ${JSON.stringify(data)}`);
                    res.send(JSON.stringify(data));
                }
                console.log(body);
            } else {
                console.log(`request error: ${response.statusCode}`);
            }
        });

}

function checkQuery(res, query) {
    if (query.city === undefined) {
        res.send({
            errCode:400,
            errMsg:"缺少相关参数"
        });
        return false;
    }
    return true;
}

module.exports = {
    get: get
};
