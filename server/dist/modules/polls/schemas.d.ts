import { z } from "zod";
export declare const createPollSchema: z.ZodObject<{
    body: z.ZodObject<{
        title: z.ZodString;
        description: z.ZodDefault<z.ZodOptional<z.ZodString>>;
        responseAccess: z.ZodDefault<z.ZodOptional<z.ZodEnum<{
            anonymous: "anonymous";
            authenticated: "authenticated";
        }>>>;
        expiresAt: z.ZodCoercedDate<unknown>;
        questions: z.ZodArray<z.ZodObject<{
            text: z.ZodString;
            options: z.ZodArray<z.ZodString>;
            isRequired: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        }, z.core.$strict>>;
    }, z.core.$strict>;
}, z.core.$strip>;
export type CreatePollSchemaType = z.infer<typeof createPollSchema>;
export declare const pollIdParamSchema: z.ZodObject<{
    params: z.ZodObject<{
        pollId: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export type PollIdParamSchemaType = z.infer<typeof pollIdParamSchema>;
//# sourceMappingURL=schemas.d.ts.map