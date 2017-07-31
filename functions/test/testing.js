var myFunctions = require('../index');
var assert = require('assert');

// A fake request object, with req.query.text set to 'input'
const req = { query: {text: 'input'} };
// A fake response object, with a stubbed redirect function which asserts that it is called
// with parameters 303, 'new_ref'.
const res = {
    redirect: (code, url) => {
        assert.equal(code, 303);
        assert.equal(url, 'new_ref');
        done();
    }
};

// Invoke addMessage with our fake request and response objects. This will cause the
// assertions in the response object to be evaluated.
myFunctions.get_aqi(req, res);