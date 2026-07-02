import { Schema, type InferSchemaType } from "mongoose";
declare const pollSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    title: string;
    responseAccess: "anonymous" | "authenticated";
    expiresAt: NativeDate;
    creator: import("mongoose").Types.ObjectId;
    description?: string | null;
    publishedAt?: NativeDate | null;
} & import("mongoose").DefaultTimestampProps, import("mongoose").Document<unknown, {}, {
    title: string;
    responseAccess: "anonymous" | "authenticated";
    expiresAt: NativeDate;
    creator: import("mongoose").Types.ObjectId;
    description?: string | null;
    publishedAt?: NativeDate | null;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, Omit<import("mongoose").DefaultSchemaOptions, "timestamps"> & {
    timestamps: true;
}> & Omit<{
    title: string;
    responseAccess: "anonymous" | "authenticated";
    expiresAt: NativeDate;
    creator: import("mongoose").Types.ObjectId;
    description?: string | null;
    publishedAt?: NativeDate | null;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    title: string;
    responseAccess: "anonymous" | "authenticated";
    expiresAt: NativeDate;
    creator: import("mongoose").Types.ObjectId;
    description?: string | null;
    publishedAt?: NativeDate | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
declare const Poll: import("mongoose").Model<{
    title: string;
    responseAccess: "anonymous" | "authenticated";
    expiresAt: NativeDate;
    creator: import("mongoose").Types.ObjectId;
    description?: string | null;
    publishedAt?: NativeDate | null;
} & import("mongoose").DefaultTimestampProps, {}, {}, {
    id: string;
}, import("mongoose").Document<unknown, {}, {
    title: string;
    responseAccess: "anonymous" | "authenticated";
    expiresAt: NativeDate;
    creator: import("mongoose").Types.ObjectId;
    description?: string | null;
    publishedAt?: NativeDate | null;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    title: string;
    responseAccess: "anonymous" | "authenticated";
    expiresAt: NativeDate;
    creator: import("mongoose").Types.ObjectId;
    description?: string | null;
    publishedAt?: NativeDate | null;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, Schema<any, import("mongoose").Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    title: string;
    responseAccess: "anonymous" | "authenticated";
    expiresAt: NativeDate;
    creator: import("mongoose").Types.ObjectId;
    description?: string | null;
    publishedAt?: NativeDate | null;
} & import("mongoose").DefaultTimestampProps, import("mongoose").Document<unknown, {}, {
    title: string;
    responseAccess: "anonymous" | "authenticated";
    expiresAt: NativeDate;
    creator: import("mongoose").Types.ObjectId;
    description?: string | null;
    publishedAt?: NativeDate | null;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, Omit<import("mongoose").DefaultSchemaOptions, "timestamps"> & {
    timestamps: true;
}> & Omit<{
    title: string;
    responseAccess: "anonymous" | "authenticated";
    expiresAt: NativeDate;
    creator: import("mongoose").Types.ObjectId;
    description?: string | null;
    publishedAt?: NativeDate | null;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    title: string;
    responseAccess: "anonymous" | "authenticated";
    expiresAt: NativeDate;
    creator: import("mongoose").Types.ObjectId;
    description?: string | null;
    publishedAt?: NativeDate | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>, {
    title: string;
    responseAccess: "anonymous" | "authenticated";
    expiresAt: NativeDate;
    creator: import("mongoose").Types.ObjectId;
    description?: string | null;
    publishedAt?: NativeDate | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export type Poll = InferSchemaType<typeof pollSchema>;
export default Poll;
//# sourceMappingURL=model.d.ts.map