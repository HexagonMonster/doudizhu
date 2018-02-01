const socket = require('socket.io');
const app = socket('3000');
const config = require('./config.json')
const mydb = require('./utility/db');
const playerController = require('./game/player');
mydb.connect(config.mysqlConfig);
// mydb.checkPlayer('1000', function (err, cb) {
//
// });
// mydb.insertPlayerInfo({
//     unique_id:  "1200",
//     uid: "124500",
//     nick_name:  "啦啦",
//     avatar_url: 'lala.com',
//     house_card_Count: 5
// });
// mydb.updatePlayerInfo('unique_id', "1200", {
//     nick_name: '哈哈',
//     avatar_url: 'haha.com'
// });
app.on('connection', function(socket) {
    console.log('a user connected');
    socket.emit('welcome', 'hello world!');
    socket.on('send2server', function (msg, rawData, callbackIndex) {
        console.log('get msg from client: msg = ' + msg + ', data = ' + JSON.stringify(rawData));
        switch (msg) {
            case 'login':
                console.log('a user login = ' + JSON.stringify(rawData));
                mydb.checkPlayer(rawData.uniqueID, function (err, data) {
                    if (err) {
                        console.log('err = ' + err);
                    } else {
                        if (data.length === 0) {// don't exists player data
                            console.log('[login] do not exists player: ' + rawData.uniqueID);
                            let uid = '1';
                            for (let i = 0; i < 7; i++) {
                                uid += Math.floor(Math.random() * 10);
                            }
                            mydb.insertPlayerInfo({
                                unique_id: rawData.uniqueID,
                                uid: uid,
                                nick_name: rawData.nickName,
                                avatar_url: rawData.avatarUrl,
                                house_card_count: 5
                            });
                            playerController.createPlayer(socket, {
                                uid: uid,
                                nickName: rawData.nickName,
                                avatarUrl: rawData.avatarUrl,
                                houseCardCount: 5,
                                callbackIndex: callbackIndex
                            });
                        } else {// exists player data
                            console.log('[login] exists player: ' + rawData.uniqueID);
                            mydb.updatePlayerInfo('unique_id', rawData.uniqueID, {
                                nick_name: rawData.nickName,
                                avatar_url: rawData.avatarUrl
                            });
                            playerController.createPlayer(socket, {
                                uid: data[0].uid,
                                nickName: rawData.nickName,
                                avatarUrl: rawData.avatarUrl,
                                houseCardCount: data[0].house_card_count,
                                callbackIndex: callbackIndex
                            });
                        }
                    }
                });
                break;
            default:
                break;
        }
    });
});
console.log('listen on 3000');
