import cors from "@elysiajs/cors";
import Elysia from "elysia";

export class Server {
    protected app: Elysia;

    constructor() {
        console.log("Server initialized");
        this.app = new Elysia().use(cors({
            origin: /.*\.songkran\.day$/,
            methods: ["GET", "POST", "PUT", "DELETE"],
        })).get("/", () => "Hello Elysia");
    }

    private route() {
        this.app.group("/v1", (app) =>
            app
                .group("/account", (app) =>
                    app.get("/", () => "WIP")
                )
                .group("/available-zones", (app) =>
                    app.get("/", () => "Available zones")
                )
        );
        this.app.ws("/ws", () => {
            console.log("WebSocket route initialized");
            return "WebSocket route initialized";
        });
        
        console.log("Routes setup complete");
    }

    public start() {
        this.route();
        this.app.listen(3000);
        console.log(
        `🦊 Elysia is running at ${this.app.server?.hostname}:${this.app.server?.port}`
        );
    }
}