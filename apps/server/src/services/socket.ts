import { Server as SocketServer } from "socket.io";

class SocketServices {
    private _io: SocketServer;
    constructor() {
        console.log("Init Socket Server");

        this._io = new SocketServer();
    }

    public initListeners() {
        const io = this.io;
        console.log("Init Socket Listeners...!");

        io.on("cpnnect", function (socket) {
            console.log(`New socket connected: ${socket.id} `);

            socket.on(
                "event:message",
                async function ({ message }: { message: string }) {
                    console.log(`New message received: ${message}`);
                }
            );
        });
    }

    get io() {
        return this._io;
    }
}

export default SocketServices;
