import "dotenv/config";
declare const env: {
    NODE_ENV: "development" | "production";
    PORT: string;
    MONGODB_URI: string;
    CLIENT_URL: string;
    CLERK_PUBLISHABLE_KEY: string;
    CLERK_SECRET_KEY: string;
};
export default env;
//# sourceMappingURL=env.d.ts.map