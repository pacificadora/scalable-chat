import http from "http";
import SocketService from "./services/socket";

async function init() {
    try {
        const socketService = new SocketService();
        const server = http.createServer();
        const port = process.env.PORT || 8000;

        const io = socketService.getIo();
        io.attach(server);
        socketService.initListeners();
        server.listen(port, () => {
            console.log(`Server is running on port: ${port}`);
        });
    } catch (error) {
        console.error("Error during initialization:", error);
        throw error;
    }
}

init().catch(err => {
    console.error("Failed to start server:", err);
    process.exit(1);
});
