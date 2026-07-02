import { z } from "zod";
export declare const pollIdParamSchema: z.ZodObject<{
    params: z.ZodObject<{
        pollId: z.ZodString;
    }, z.core.$strict>;
}, z.core.$strip>;
export type PollIdParamSchemaType = z.infer<typeof pollIdParamSchema>;
//# sourceMappingURL=schemas.d.ts.map