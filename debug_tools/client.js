var net = require('net');
var fs = require('fs');
var config = JSON.parse(fs.readFileSync('./config.json'));

var client = new net.Socket();

client.connect(config.port, config.hostname, function () {
    console.log("CONNECTION ESTABLISHED!")

    client.write(JSON.stringify(config.request));
});

client.on('data', function (data) {
    console.log("DATA RECEIVED: ");
    console.log(JSON.parse(data));
    client.destroy();
});

client.on('close', function () {
    console.log("CONNECTION CLOSED")
});