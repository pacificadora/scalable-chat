import http from "http";
import SocketService from "./services/socket";

async function init() {
    const socketService = new SocketService();

    const server = http.createServer();
    const port = process.env.PORT ? process.env.PORT : 8000;

    const io = socketService.getIo();
    io.attach(server);

    socketService.initListeners();

    server.listen(port, () => {
        console.log(`Server is running on port: ${port}`);
    });
}



init();
