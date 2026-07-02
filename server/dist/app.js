import express, {} from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import authRoutes from "./modules/auth/route.js";
import pollRoutes from "./modules/polls/route.js";
import notFoundHandler from "./common/middlewares/notFoundHandler.js";
import errorHandler from "./common/middlewares/errorHandler.js";
import env from "./common/config/env.js";
export default function createServerApplication() {
    const app = express();
    app.use(express.json());
    app.use(cookieParser());
    app.use(cors({
        origin: env.CLIENT_URL,
        credentials: true,
    }));
    app.use(clerkMiddleware());
    app.get("/api/ping", (req, res) => {
        return res.status(200).json({
            message: "PollNode is working",
        });
    });
    app.use("/api/auth", authRoutes);
    app.use("/api/polls", pollRoutes);
    app.use(notFoundHandler);
    app.use(errorHandler);
    return app;
}
//# sourceMappingURL=app.js.map