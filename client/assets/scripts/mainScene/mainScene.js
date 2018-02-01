import global from "../global";

cc.Class({
    extends: cc.Component,

    properties: {
        joinRoom: {
            default: null,
            type: cc.Prefab
        },
        createRoom: {
            default: null,
            type: cc.Prefab
        },
        tipsLabel: {
            default: null,
            type: cc.Node
        }
    },

    onLoad () {
        let socket = io('http://localhost:3000');
        socket.on('welcome', function(data) {
            console.log('data : ' + data);
        });
        global.socket.init();

        let mask = this.tipsLabel.parent;
        let labelWidth = this.tipsLabel.width;
        let maskWidth = mask.width;
        let totalWidth = labelWidth + maskWidth;
        let duration = 15;
        this.tipsLabel.runAction(
            cc.sequence(
                cc.moveBy(duration / 2, cc.p(-0.5 * totalWidth, 0)),
                cc.callFunc(function (sender) {
                    sender.runAction(cc.repeatForever(cc.sequence(
                        cc.moveBy(0, cc.p(totalWidth, 0)),
                        cc.moveBy(duration, cc.p(-totalWidth, 0))
                    )));
                })
            )
        );
    },

    onBtClick (event, customData) {
        console.log('event: ' + event, 'data: ' + customData);
        switch (customData) {
            case 'wechat':
                global.socket.login(
                    global.tianba.playerData.uniqueID,
                    global.tianba.playerData.nickName,
                    global.tianba.playerData.avatarUrl,
                    function(err, data) {
                        if (err) {
                            console.log('login err ' + err);
                        } else {
                            console.log('login data: ' + JSON.stringify(data));
                        }
                    });
                break;
            case 'joinRoom':
                let node = cc.instantiate(this.joinRoom);
                node.parent = this.node;
                break;
            case 'createRoom':
                node = cc.instantiate(this.createRoom);
                node.parent = this.node;
                break;
            default:
                break;
        }
    }

    // update (dt) {},
});
