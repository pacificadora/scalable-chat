import { Server } from 'socket.io'
import Redis from 'ioredis'
import dotenv from 'dotenv';

const pubClient = new Redis({
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    username: process.env.REDIS_USERNAME,
    password: process.env.password,
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

        //jb bhi mere subscriber ke paas redis se koi message aayega to ye function call hoga.
        subClient.on('message', (channel, message) => {
            if (channel === 'MessageChannel') {
                console.log("message recieved from redis", message);
                this.io.emit('message', message);
            }
        });
    }

    getIo() {
        return this.io;
    }
}

export default SocketService;