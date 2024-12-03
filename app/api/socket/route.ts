import { Server } from "socket.io";

export default function handler(req, res) {
    if (!res.socket.server.io) {
        const io = new Server(res.socket.server);
        res.socket.server.io = io;

        io.on("connection", (socket) => {
            console.log("User connected:", socket.id);

            socket.on("message", async (message) => {
                // Send message to OpenAI API
                const response = await fetch("http://localhost:3000/api/chatbot", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ message }),
                });

                const { reply } = await response.json();
                socket.emit("response", reply);
            });

            socket.on("disconnect", () => {
                console.log("User disconnected:", socket.id);
            });
        });
    }
    res.end();
}