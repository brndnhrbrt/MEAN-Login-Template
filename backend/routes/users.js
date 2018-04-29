var express = require('express');
var router = express.Router();

var usersController = require('../controllers/usersController');

router.get('/', usersController.index);

router.post('/register', usersController.register);

router.post('/login', usersController.authenticate);

router.use(usersController.tokenAuth);

router.get('/me', usersController.userInformation);

module.exports = router;
