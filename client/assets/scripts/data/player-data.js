let PlayerData = function() {
    this.uid = undefined;
    this.uniqueID = '10001';
    this.nickName = 'lala' + Math.floor(Math.random() * 10);
    this.avatarUrl = 'http://img.zcool.cn/community/018d4e554967920000019ae9df1533.jpg@900w_1l_2o_100sh.jpg';
    this.houseCardCount = 0;
    // for (let i = 0; i < 7; i++) {
    //     this.uniqueID += Math.floor(Math.random() * 10);
    // }
    this.wechatLoginSuccess = function(data) {
        this.uniqueID = data.uniqueID;
        this.nickName = data.nickName;
        this.avatarUrl = data.avatarUrl;
        this.houseCardCount = data.houseCardCount;
    };
    this.loginSuccess = function(data) {
        console.log('login success data: ' + JSON.stringify(data));
    };
};
export default PlayerData;

