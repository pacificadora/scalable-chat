import { Server } from 'socket.io'
import Redis from 'ioredis'

const pubClient = new Redis({
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT ?? '6379'),
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
});
const subClient = pubClient.duplicate();

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
        subClient.subscribe('MessageChannel');
    }

    public initListeners() {
        console.log("initialize scoket listeners");

        this.io.on("connect", (socket) => {
            console.log("a user connected", socket.id);
            socket.on('event:message', async ({ message }: { message: string }) => {
                console.log('message from client: ', message);
                //publish message to my valkey.
                await pubClient.publish('MessageChannel', JSON.stringify({ message }));
            });
        });

        subClient.on('message', (channel, message) => {
            if (channel === 'MessageChannel') {
                this.io.emit('message', JSON.parse(message));
            }
        });
    }

    getIo() {
        return this.io;
    }
}

export default SocketService;