var express = require('express');
var router = express.Router();

router.all('*', function(req, res) {
    res.json({ success: true, error: null, message: 'at endpoint \'/\' not \'' + req.originalUrl + '\''});
});

module.exports = router;