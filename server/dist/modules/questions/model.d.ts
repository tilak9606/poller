import { Schema, type InferSchemaType } from "mongoose";
declare const questionSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    text: string;
    options: import("mongoose").Types.DocumentArray<{
        text: string;
    }, import("mongoose").Types.Subdocument<import("mongodb").ObjectId, unknown, {
        text: string;
    }, {}, {}> & {
        text: string;
    }>;
    isRequired: boolean;
    poll: import("mongoose").Types.ObjectId;
    order: number;
} & import("mongoose").DefaultTimestampProps, import("mongoose").Document<unknown, {}, {
    text: string;
    options: import("mongoose").Types.DocumentArray<{
        text: string;
    }, import("mongoose").Types.Subdocument<import("mongodb").ObjectId, unknown, {
        text: string;
    }, {}, {}> & {
        text: string;
    }>;
    isRequired: boolean;
    poll: import("mongoose").Types.ObjectId;
    order: number;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, Omit<import("mongoose").DefaultSchemaOptions, "timestamps"> & {
    timestamps: true;
}> & Omit<{
    text: string;
    options: import("mongoose").Types.DocumentArray<{
        text: string;
    }, import("mongoose").Types.Subdocument<import("mongodb").ObjectId, unknown, {
        text: string;
    }, {}, {}> & {
        text: string;
    }>;
    isRequired: boolean;
    poll: import("mongoose").Types.ObjectId;
    order: number;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    text: string;
    options: import("mongoose").Types.DocumentArray<{
        text: string;
    }, import("mongoose").Types.Subdocument<import("mongodb").ObjectId, unknown, {
        text: string;
    }, {}, {}> & {
        text: string;
    }>;
    isRequired: boolean;
    poll: import("mongoose").Types.ObjectId;
    order: number;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
declare const Question: import("mongoose").Model<{
    text: string;
    options: import("mongoose").Types.DocumentArray<{
        text: string;
    }, import("mongoose").Types.Subdocument<import("mongodb").ObjectId, unknown, {
        text: string;
    }, {}, {}> & {
        text: string;
    }>;
    isRequired: boolean;
    poll: import("mongoose").Types.ObjectId;
    order: number;
} & import("mongoose").DefaultTimestampProps, {}, {}, {
    id: string;
}, import("mongoose").Document<unknown, {}, {
    text: string;
    options: import("mongoose").Types.DocumentArray<{
        text: string;
    }, import("mongoose").Types.Subdocument<import("mongodb").ObjectId, unknown, {
        text: string;
    }, {}, {}> & {
        text: string;
    }>;
    isRequired: boolean;
    poll: import("mongoose").Types.ObjectId;
    order: number;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    text: string;
    options: import("mongoose").Types.DocumentArray<{
        text: string;
    }, import("mongoose").Types.Subdocument<import("mongodb").ObjectId, unknown, {
        text: string;
    }, {}, {}> & {
        text: string;
    }>;
    isRequired: boolean;
    poll: import("mongoose").Types.ObjectId;
    order: number;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, Schema<any, import("mongoose").Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    text: string;
    options: import("mongoose").Types.DocumentArray<{
        text: string;
    }, import("mongoose").Types.Subdocument<import("mongodb").ObjectId, unknown, {
        text: string;
    }, {}, {}> & {
        text: string;
    }>;
    isRequired: boolean;
    poll: import("mongoose").Types.ObjectId;
    order: number;
} & import("mongoose").DefaultTimestampProps, import("mongoose").Document<unknown, {}, {
    text: string;
    options: import("mongoose").Types.DocumentArray<{
        text: string;
    }, import("mongoose").Types.Subdocument<import("mongodb").ObjectId, unknown, {
        text: string;
    }, {}, {}> & {
        text: string;
    }>;
    isRequired: boolean;
    poll: import("mongoose").Types.ObjectId;
    order: number;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, Omit<import("mongoose").DefaultSchemaOptions, "timestamps"> & {
    timestamps: true;
}> & Omit<{
    text: string;
    options: import("mongoose").Types.DocumentArray<{
        text: string;
    }, import("mongoose").Types.Subdocument<import("mongodb").ObjectId, unknown, {
        text: string;
    }, {}, {}> & {
        text: string;
    }>;
    isRequired: boolean;
    poll: import("mongoose").Types.ObjectId;
    order: number;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    text: string;
    options: import("mongoose").Types.DocumentArray<{
        text: string;
    }, import("mongoose").Types.Subdocument<import("mongodb").ObjectId, unknown, {
        text: string;
    }, {}, {}> & {
        text: string;
    }>;
    isRequired: boolean;
    poll: import("mongoose").Types.ObjectId;
    order: number;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>, {
    text: string;
    options: import("mongoose").Types.DocumentArray<{
        text: string;
    }, import("mongoose").Types.Subdocument<import("mongodb").ObjectId, unknown, {
        text: string;
    }, {}, {}> & {
        text: string;
    }>;
    isRequired: boolean;
    poll: import("mongoose").Types.ObjectId;
    order: number;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export type Question = InferSchemaType<typeof questionSchema>;
export default Question;
//# sourceMappingURL=model.d.ts.map