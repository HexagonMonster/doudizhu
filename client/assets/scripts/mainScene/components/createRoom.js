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
                cc.director.loadScene('gameScene');
                break;
            default:
                break;
        }
    },

    start () {

    },

    // update (dt) {},
});
