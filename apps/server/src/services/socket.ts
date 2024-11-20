import { Server } from 'socket.io'

class SocketService {
    private io: Server;

    constructor() {
        console.log("init SocketService constructor");
        this.io = new Server(
            {
                cors: {
                    allowedHeaders: ["*"],
                    origin: "*",
                }
            }
        );
    }

    public initListeners() {
        console.log("initialize scoket listeners");

        this.io.on("connect", (socket) => {
            console.log("a user connected", socket.id);
            socket.on('event:message', async ({ message }: { message: string }) => {
                console.log('message from client: ', message);
            });
        });
    }

    getIo() {
        return this.io;
    }
}

export default SocketService;