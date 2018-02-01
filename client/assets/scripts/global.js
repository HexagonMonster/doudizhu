import SocketController from './data/socket-controller'
import TianBa from './data/tianba'
const global = {};
global.socket = new SocketController();
global.tianba = new TianBa();
export default global;
