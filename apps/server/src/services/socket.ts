import { Server } from 'socket.io'

class SocketService {
    private io: Server;

    constructor() {
        console.log("init SocketService constructor");
        this.io = new Server();
    }

    getIo() {
        return this.io;
    }
}

export default SocketService;