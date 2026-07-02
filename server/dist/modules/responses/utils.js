import crypto from "crypto";
export function generateAnonymousToken() {
    return crypto.randomBytes(32).toString("hex");
}
export function hashAnnonymousToken(token) {
    return crypto.createHash("sha256").update(token).digest("hex");
}
//# sourceMappingURL=utils.js.map