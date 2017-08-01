var express = require('express');
var router = express.Router();
var get_aqi = require('../api/v1/get_aqi');
var jarvis = require('../api/v1/jarvis')

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/v1/get_aqi', function (req, res, next) {
    get_aqi.get(req, res, next);
});

router.post('/v1/jarvis', function (req, res, next) {
    jarvis.post(req, res, next);
})

module.exports = router;