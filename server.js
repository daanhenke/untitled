var net = require('net');
var shortid = require('shortid');
var logger = require('./libs/logging.js').Logger("lolol");
var security = require('./libs/security.js');
var config = require('./settings/config.json');

var server = net.createServer();
server.listen(config.port, config.hostname);

var userlist = [];

server.on('connection', function (socket) {
    socket.id = shortid.generate();
    console.log("User connected: " + socket.id);
    userlist.push(socket);

    socket.on('data', function (data) {
        try {
            data = JSON.parse(data);

            switch (data.type) {
                case "PING":
                    console.log("Got ping request");
                    socket.write('{"type": "PONG"}');
                    break;
            }
        } catch(err) {
            console.log("Got invalid packet");
            socket.write('{"type": "ERROR", "arguments": {"error": "Request invalid"}}')
        }
    });

    socket.on('close', function () {
        console.log("User disconnected: " + socket.id);
        for (var user in userlist) {
            if(userlist[user].id == socket.id) {
                userlist.splice(user, 1);
                console.log("Succesfully logged user out")
            }
        }
    })
});