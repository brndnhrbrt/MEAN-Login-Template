var jwt = require('jsonwebtoken');

var User = require('../models/user');
var config = require('../config');

exports.index = function(req, res) {
    res.json(sendResponse(res, true, null, 'users index'));
};

exports.register = function(req, res) {
    if(checkParams([ req.body.username, req.body.password, req.body.repeatPassword ]) && checkRegisterPassword(req.body.password, req.body.repeatPassword)) {
        var user = new User();
        user.username = req.body.username;
        user.password = req.body.password;
        user.date_created = new Date();
        user.save(function(error) {
            if(error) { sendResponse(res, false, error, 'error creating user'); }
            else { sendResponse(res, true, null, 'user created'); }
        });
    } else { sendResponse(res, false, null, 'invalid parameters'); }
};

exports.authenticate = function(req, res) {
    if(checkParams([ req.body.username, req.body.password ])) {
        User.findOneAndUpdate({ 'username': req.body.username }).select('username password').exec(function(error, user) {
            if(error) { sendResponse(res, false, error, 'invalid username or password') }
            else if(!user) { sendResponse(res, false, null, 'invalid username or password') }
            else if(!user.comparePassword(req.body.password)) { sendResponse(res, false, null, 'invalid username or password') }
            else {
                var token = jwt.sign({ username: user.username, date_created: user.date_created }, config.secret, { expiresIn: 60*60*24*7 });
                res.json({ success: true, error: null, message: 'serving token', token: token });
            }
        });
    } else { sendResponse(res, false, null, 'invalid parameters'); }
};

exports.tokenAuth = function(req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if(token) {
        jwt.verify(token, config.secret, function(error, decoded) {
            if(error) { sendResponse(res, false, error, 'invalid token') }
            else if(!decoded) { sendResponse(res, false, null, 'invalid token') }
            else {
                User.findOne({ username: decoded.username }, function(error, user) {
                    if(error) { sendResponse(res, false, error, 'invalid token') }
                    else if(!user) { sendResponse(res, false, null, 'invalid token') }
                    else { 
                        req.user = user;
                        next();
                    }
                });
            }
        });
    } else { sendResponse(res, false, null, 'invalid token'); }
};

exports.userInformation = function(req, res) {
    res.json({ success: true, error: null, message: 'serving user', user: req.user });
};

checkParams = function(parramArr) {
    for(var param in parramArr)
        if(parramArr[param] == undefined) return false;
    return true;
};

checkRegisterPassword = function(password, repeatPassword) {
    if(password == repeatPassword)
        if(password.length >= 4) return true;
    return false;
};

sendResponse = function(res, success, error, message) {
    res.json({ success: success, error: error, message: message });
}