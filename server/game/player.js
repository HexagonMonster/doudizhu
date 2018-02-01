const SocketController = require('../utility/socket-controller').SocketController;

const Player = function (socket, data) {
    let _socket = new SocketController(socket);
    let _uid = data.uid;
    let _nickName = data.nickName;
    let _avatarUrl = data.avatarUrl;
    let _houseCardCount = data.houseCardCount;

    _socket.send(
        null,
        {
            uid: _uid,
            nickName: _nickName,
            avatarUrl: _avatarUrl,
            houseCardCount: _houseCardCount
        },
        data.callbackIndex
    );

    _socket.on('createRoom', function(data, cb) {
        console.log('create room, data = ' + JSON.stringify(data));
        cb(null, 'ok');
    });
};
let playerList = [];
exports.createPlayer = function (socket, data) {
    console.log('createPlayer data = ' + JSON.stringify(data));
    let player = new Player(socket, data);
    playerList.push(player);
};
