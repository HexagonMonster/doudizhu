

cc.Class({
    extends: cc.Component,

    properties: {
        labelList: {
            default: [],
            type: [cc.Label]
        }
    },

    onLoad () {
        this.roomIdStr = '';
        this.updateLabel();
    },

    onButtonClick (event, customData) {
        console.log('[joinRoom] customData = ' + customData);
        if (customData === 'close') {
            this.node.destroy();
            return;
        }
        if (customData === 'reset') {
            this.roomIdStr = '';
        } else if (customData === 'delete') {
            this.roomIdStr = this.roomIdStr.substring(0, this.roomIdStr.length - 1);
        } else if (this.roomIdStr.length < this.labelList.length) {
            this.roomIdStr += customData;
            if (this.roomIdStr.length === this.labelList.length) {
                console.log('[joinRoom] join, id = ' + this.roomIdStr);
            }
        }
        this.updateLabel();
    },

    updateLabel () {
        for (let i in this.labelList) {
            this.labelList[i].string = '';
        }
        for (let i in this.labelList) {
            this.labelList[i].string = this.roomIdStr[i];
        }
    }
});
