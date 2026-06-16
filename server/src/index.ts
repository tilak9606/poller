import http from "node:http";
import {connectDB} from "./common/config/db.js";
import createServerApp from "./app.js";
import createSocketServer from "./common/socket/index.js";
import env from "./common/config/env.js";

async function main() {
    try {
        await connectDB();
          const server = http.createServer(createServerApp());
        createSocketServer(server);

        server.listen(env.PORT, () => {
            console.log(`Server is running on port ${env.PORT}`);
        });
    }catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
}

main();