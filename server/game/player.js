const Player = function (socket, data) {
    let _socket = socket;
    let _uid = data.uid;
    let _nickName = data.nickName;
    let _avatarUrl = data.avatarUrl;
    let _houseCardCount = data.houseCardCount;
    _socket.emit('send2client',
        null,
        {
            uid: _uid,
            nickName: _nickName,
            avatarUrl: _avatarUrl,
            houseCardCount: _houseCardCount
        },
        data.callbackIndex
    );
};
let playerList = [];
exports.createPlayer = function (socket, data) {
    console.log('createPlayer data = ' + JSON.stringify(data));
    let player = new Player(socket, data);
    playerList.push(player);
};
