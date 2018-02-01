import defines from './../defines'

const SocketController = function () {
    let _socket;
    let _callbackMap = {};
    let _callbackIndex = 0;
    this.init = function () {
        _socket = io(defines.serverUrl);
        _socket.on('send2client', this.receive.bind(this));
    };
    this.login = function (unique, nickName, avatar, cb) {
        this.send('login', {
            uniqueID: unique,
            nickName: nickName,
            avatarUrl: avatar
        }, cb);
    };
    this.send = function (msg, data, cb) {
        _callbackMap[_callbackIndex] = cb;
        _socket.emit('send2server', msg, data, _callbackIndex);
        _callbackIndex++;
    };
    this.receive = function (err, data, callbackIndex) {
        let cb = _callbackMap[callbackIndex];
        if (cb) {
            cb(err, data);
        }
        delete _callbackMap[callbackIndex];
    };
};
export default SocketController;
