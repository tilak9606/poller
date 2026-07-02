import { Router } from "express";
import requireAuth from "../../common/middlewares/requireAuth.js";
import validate from "../../common/middlewares/validate.js";
import { createPollSchema, pollIdParamSchema } from "./schemas.js";
import { handleGetAllPolls, handleGetPoll, handleCreatePoll, handlePublishPoll, } from "./controller.js";
import responseRoutes from "../responses/route.js";
import analyticsRoutes from "../analytics/routes.js";
const router = Router();
router.route("/")
    .get(requireAuth, handleGetAllPolls)
    .post(requireAuth, validate(createPollSchema), handleCreatePoll);
router.get("/:pollId", validate(pollIdParamSchema), handleGetPoll);
router.patch("/:pollId/publish", requireAuth, validate(pollIdParamSchema), handlePublishPoll);
router.use("/:pollId/responses", responseRoutes);
router.use("/:pollId/analytics", analyticsRoutes);
export default router;
//# sourceMappingURL=route.js.map