import global from "../global";

cc.Class({
    extends: cc.Component,

    properties: {
        nickNameLabel: {
            default: null,
            type: cc.Label
        },
        uidLabel: {
            default: null,
            type: cc.Label
        },
        headIcon: {
            default: null,
            type: cc.Sprite
        },
        houseCardLabel: {
            default: null,
            type: cc.Label
        },
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
        let playerData = global.tianba.playerData;
        this.nickNameLabel.string = playerData.nickName;
        this.uidLabel.string = 'ID:' + playerData.uid;
        this.houseCardLabel.string = '' + playerData.houseCardCount;
        cc.loader.load(playerData.avatarUrl, (err, texture) => {
            if (err) {
                console.log('load err = ' + err);
            } else {
                // this.headIcon.spriteFrame.setTexture(texture);
                this.headIcon.spriteFrame = new cc.SpriteFrame(texture);
            }
        });

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
