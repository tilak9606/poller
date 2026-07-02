import { z } from "zod";
export declare const postResponseSchema: z.ZodObject<{
    params: z.ZodObject<{
        pollId: z.ZodString;
    }, z.core.$strict>;
    body: z.ZodObject<{
        answers: z.ZodArray<z.ZodObject<{
            question: z.ZodString;
            selectedOption: z.ZodString;
        }, z.core.$strict>>;
    }, z.core.$strict>;
}, z.core.$strip>;
export type PostResponseSchemaType = z.infer<typeof postResponseSchema>;
//# sourceMappingURL=schemas.d.ts.map