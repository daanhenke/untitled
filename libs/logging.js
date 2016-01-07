exports.Logger = function (socket) {
    this.socket = socket;
    this.stack = [];
    this.date = new Date();
};

exports.Logger.prototype.log = function (string) {
    var time = this.date.toISOString().replace('T', ' ').substr(0, 19);
    var full = "[" + time + "]" + string;
    console.log(full);

};