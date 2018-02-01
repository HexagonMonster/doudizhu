import global from '../../global'

cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad () {

    },

    onButtonClick (event, customData) {
        console.log('[createRoom] customData = ' + customData);
        switch (customData) {
            case 'close':
                this.node.destroy();
                break;
            case 'create':
                global.socket.createRoom('test room', function (err, data) {
                    if (err) {
                        console.log('create room failed, err = ' + err);
                    } else {
                        console.log('create room success, data = ' + data);
                        cc.director.loadScene('gameScene');
                    }
                });
                break;
            default:
                break;
        }
    },

    start () {

    },

    // update (dt) {},
});
