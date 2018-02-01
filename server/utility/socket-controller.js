exports.SocketController = function (socket) {
    let _socket = socket;
    let _callbackMap = {};

    this.send = function (err, data, callbackIndex) {
        console.log('[socket] send: err = ' + err + ', data = ' + JSON.stringify(data) + ', callbackIndex = ' + callbackIndex);
        _socket.emit('send2client', err, data, callbackIndex);
    };

    this.receive = function (msg, data, callbackIndex) {
        console.log('[socket] receive: msg = ' + msg + ', data = ' + JSON.stringify(data) + ', callbackIndex = ' + callbackIndex);
        let callbackList = _callbackMap[msg];
        if (callbackList) {
            for (let i = 0; i < callbackList.length; i++) {
                callbackList[i](data, (err, result) => {
                    this.send(err, result, callbackIndex);
                });
            }
        }
    };

    _socket.on('send2server', this.receive.bind(this));

    this.on = function (msg, callback) {
        if (_callbackMap[msg]) {
            _callbackMap[msg].push(callback);
        } else {
            _callbackMap[msg] = [callback];
        }
    };

    this.off = function (msg, callback) {
        let callbackList = _callbackMap[msg];
        for (let i = 0; i < callbackList.length; i++) {
            if (callbackList[i] === callback) {
                callbackList.splice(i, 1);
                i--;
            }
        }
    }
};
