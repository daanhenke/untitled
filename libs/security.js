var sha1 = require('sha1');


exports.getSalt = function () {
    var date = this.date = new Date();
    var key = date.toISOString();
    var salt = sha1(key);
    return salt.substr(0, 8);
};

exports.getPass = function (password, debug) {
    var salt = exports.getSalt();
    var pass = sha1(sha1(password) + sha1(salt));
    if(debug) {
        console.log(pass + " " + salt)
    }
    return pass
};