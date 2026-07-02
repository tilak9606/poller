import "dotenv/config";
import { z } from "zod";
const envSchema = z.object({
    NODE_ENV: z.enum(["development", "production"]).default("development"),
    PORT: z.string().default("3000"),
    MONGODB_URI: z.url(),
    CLIENT_URL: z.url(),
    CLERK_PUBLISHABLE_KEY: z.string(),
    CLERK_SECRET_KEY: z.string(),
});
function createEnv(env) {
    const parsedEnv = envSchema.safeParse(process.env);
    if (!parsedEnv.success) {
        console.error("Environment variable validation failed:", parsedEnv.error.format());
        throw new Error("Invalid environment variables");
    }
    return parsedEnv.data;
}
const env = createEnv(process.env);
export default env;
//# sourceMappingURL=env.js.map