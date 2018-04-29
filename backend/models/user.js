var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: { type: String, required: true, max: 15, min: 3, unique: true },
    password: { type: String, required: true, select: false },
    date_created: { type: Date, required: true }
});

UserSchema.pre('save', function(next) {
    var user = this;
    if(!user.isModified('password')) return next();
    bcrypt.hash(user.password, 10, function(err, hash) {
        if(err) return next(err);
        user.password = hash;
        next();
    });
});

UserSchema.methods.comparePassword = function(password) {
    var user = this;
    return bcrypt.compareSync(password, user.password);
};

module.exports = mongoose.model('User', UserSchema);