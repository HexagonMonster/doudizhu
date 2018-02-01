const EventListener = function (obj) {
    let register = {};
    obj.on = function (type, method) {
        if (register.hasOwnProperty(type)) {
            register[type].push(method);
        } else {
            register[type] = [method];
        }
    };
    obj.fire = function (type) {
        if (register.hasOwnProperty(type)) {
            let args = Array.prototype.slice.call(arguments, 1);
            let handlerList = register[type];
            for (let i = 0 ; i < handlerList.length; i++) {
                let handler = handlerList[i];
                handler.apply(this, args);
            }
        }
    };
    obj.removeListener = function () {

    };
    obj.removeAllListeners = function () {

    };
    return obj;
};
exports.EventListener = EventListener;
