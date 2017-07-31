var express = require('express');
var router = express.Router();
var get_aqi = require('../api/v1/get_aqi');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/get_aqi', function (req, res, next) {
    get_aqi.get(req, res, next);
});

module.exports = router;