import { Schema, type InferSchemaType } from "mongoose";
declare const userSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    clerkUserId: string;
    isAdmin: boolean;
} & import("mongoose").DefaultTimestampProps, import("mongoose").Document<unknown, {}, {
    clerkUserId: string;
    isAdmin: boolean;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, Omit<import("mongoose").DefaultSchemaOptions, "timestamps"> & {
    timestamps: true;
}> & Omit<{
    clerkUserId: string;
    isAdmin: boolean;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    clerkUserId: string;
    isAdmin: boolean;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
declare const User: import("mongoose").Model<{
    clerkUserId: string;
    isAdmin: boolean;
} & import("mongoose").DefaultTimestampProps, {}, {}, {
    id: string;
}, import("mongoose").Document<unknown, {}, {
    clerkUserId: string;
    isAdmin: boolean;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    clerkUserId: string;
    isAdmin: boolean;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, Schema<any, import("mongoose").Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    clerkUserId: string;
    isAdmin: boolean;
} & import("mongoose").DefaultTimestampProps, import("mongoose").Document<unknown, {}, {
    clerkUserId: string;
    isAdmin: boolean;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, Omit<import("mongoose").DefaultSchemaOptions, "timestamps"> & {
    timestamps: true;
}> & Omit<{
    clerkUserId: string;
    isAdmin: boolean;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    clerkUserId: string;
    isAdmin: boolean;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>, {
    clerkUserId: string;
    isAdmin: boolean;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export type User = InferSchemaType<typeof userSchema>;
export default User;
//# sourceMappingURL=model.d.ts.map