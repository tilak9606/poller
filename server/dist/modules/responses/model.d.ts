import { Schema, type InferSchemaType } from "mongoose";
declare const responseSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    poll: import("mongoose").Types.ObjectId;
    answers: import("mongoose").Types.DocumentArray<{
        question: import("mongoose").Types.ObjectId;
        selectedOption: import("mongoose").Types.ObjectId;
    }, import("mongoose").Types.Subdocument<import("mongodb").ObjectId, unknown, {
        question: import("mongoose").Types.ObjectId;
        selectedOption: import("mongoose").Types.ObjectId;
    }, {}, {}> & {
        question: import("mongoose").Types.ObjectId;
        selectedOption: import("mongoose").Types.ObjectId;
    }>;
    respondent?: import("mongoose").Types.ObjectId | null;
    anonymousTokenHash?: string | null;
} & import("mongoose").DefaultTimestampProps, import("mongoose").Document<unknown, {}, {
    poll: import("mongoose").Types.ObjectId;
    answers: import("mongoose").Types.DocumentArray<{
        question: import("mongoose").Types.ObjectId;
        selectedOption: import("mongoose").Types.ObjectId;
    }, import("mongoose").Types.Subdocument<import("mongodb").ObjectId, unknown, {
        question: import("mongoose").Types.ObjectId;
        selectedOption: import("mongoose").Types.ObjectId;
    }, {}, {}> & {
        question: import("mongoose").Types.ObjectId;
        selectedOption: import("mongoose").Types.ObjectId;
    }>;
    respondent?: import("mongoose").Types.ObjectId | null;
    anonymousTokenHash?: string | null;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, Omit<import("mongoose").DefaultSchemaOptions, "timestamps"> & {
    timestamps: true;
}> & Omit<{
    poll: import("mongoose").Types.ObjectId;
    answers: import("mongoose").Types.DocumentArray<{
        question: import("mongoose").Types.ObjectId;
        selectedOption: import("mongoose").Types.ObjectId;
    }, import("mongoose").Types.Subdocument<import("mongodb").ObjectId, unknown, {
        question: import("mongoose").Types.ObjectId;
        selectedOption: import("mongoose").Types.ObjectId;
    }, {}, {}> & {
        question: import("mongoose").Types.ObjectId;
        selectedOption: import("mongoose").Types.ObjectId;
    }>;
    respondent?: import("mongoose").Types.ObjectId | null;
    anonymousTokenHash?: string | null;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    poll: import("mongoose").Types.ObjectId;
    answers: import("mongoose").Types.DocumentArray<{
        question: import("mongoose").Types.ObjectId;
        selectedOption: import("mongoose").Types.ObjectId;
    }, import("mongoose").Types.Subdocument<import("mongodb").ObjectId, unknown, {
        question: import("mongoose").Types.ObjectId;
        selectedOption: import("mongoose").Types.ObjectId;
    }, {}, {}> & {
        question: import("mongoose").Types.ObjectId;
        selectedOption: import("mongoose").Types.ObjectId;
    }>;
    respondent?: import("mongoose").Types.ObjectId | null;
    anonymousTokenHash?: string | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
declare const Response: import("mongoose").Model<{
    poll: import("mongoose").Types.ObjectId;
    answers: import("mongoose").Types.DocumentArray<{
        question: import("mongoose").Types.ObjectId;
        selectedOption: import("mongoose").Types.ObjectId;
    }, import("mongoose").Types.Subdocument<import("mongodb").ObjectId, unknown, {
        question: import("mongoose").Types.ObjectId;
        selectedOption: import("mongoose").Types.ObjectId;
    }, {}, {}> & {
        question: import("mongoose").Types.ObjectId;
        selectedOption: import("mongoose").Types.ObjectId;
    }>;
    respondent?: import("mongoose").Types.ObjectId | null;
    anonymousTokenHash?: string | null;
} & import("mongoose").DefaultTimestampProps, {}, {}, {
    id: string;
}, import("mongoose").Document<unknown, {}, {
    poll: import("mongoose").Types.ObjectId;
    answers: import("mongoose").Types.DocumentArray<{
        question: import("mongoose").Types.ObjectId;
        selectedOption: import("mongoose").Types.ObjectId;
    }, import("mongoose").Types.Subdocument<import("mongodb").ObjectId, unknown, {
        question: import("mongoose").Types.ObjectId;
        selectedOption: import("mongoose").Types.ObjectId;
    }, {}, {}> & {
        question: import("mongoose").Types.ObjectId;
        selectedOption: import("mongoose").Types.ObjectId;
    }>;
    respondent?: import("mongoose").Types.ObjectId | null;
    anonymousTokenHash?: string | null;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    poll: import("mongoose").Types.ObjectId;
    answers: import("mongoose").Types.DocumentArray<{
        question: import("mongoose").Types.ObjectId;
        selectedOption: import("mongoose").Types.ObjectId;
    }, import("mongoose").Types.Subdocument<import("mongodb").ObjectId, unknown, {
        question: import("mongoose").Types.ObjectId;
        selectedOption: import("mongoose").Types.ObjectId;
    }, {}, {}> & {
        question: import("mongoose").Types.ObjectId;
        selectedOption: import("mongoose").Types.ObjectId;
    }>;
    respondent?: import("mongoose").Types.ObjectId | null;
    anonymousTokenHash?: string | null;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, Schema<any, import("mongoose").Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    poll: import("mongoose").Types.ObjectId;
    answers: import("mongoose").Types.DocumentArray<{
        question: import("mongoose").Types.ObjectId;
        selectedOption: import("mongoose").Types.ObjectId;
    }, import("mongoose").Types.Subdocument<import("mongodb").ObjectId, unknown, {
        question: import("mongoose").Types.ObjectId;
        selectedOption: import("mongoose").Types.ObjectId;
    }, {}, {}> & {
        question: import("mongoose").Types.ObjectId;
        selectedOption: import("mongoose").Types.ObjectId;
    }>;
    respondent?: import("mongoose").Types.ObjectId | null;
    anonymousTokenHash?: string | null;
} & import("mongoose").DefaultTimestampProps, import("mongoose").Document<unknown, {}, {
    poll: import("mongoose").Types.ObjectId;
    answers: import("mongoose").Types.DocumentArray<{
        question: import("mongoose").Types.ObjectId;
        selectedOption: import("mongoose").Types.ObjectId;
    }, import("mongoose").Types.Subdocument<import("mongodb").ObjectId, unknown, {
        question: import("mongoose").Types.ObjectId;
        selectedOption: import("mongoose").Types.ObjectId;
    }, {}, {}> & {
        question: import("mongoose").Types.ObjectId;
        selectedOption: import("mongoose").Types.ObjectId;
    }>;
    respondent?: import("mongoose").Types.ObjectId | null;
    anonymousTokenHash?: string | null;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, Omit<import("mongoose").DefaultSchemaOptions, "timestamps"> & {
    timestamps: true;
}> & Omit<{
    poll: import("mongoose").Types.ObjectId;
    answers: import("mongoose").Types.DocumentArray<{
        question: import("mongoose").Types.ObjectId;
        selectedOption: import("mongoose").Types.ObjectId;
    }, import("mongoose").Types.Subdocument<import("mongodb").ObjectId, unknown, {
        question: import("mongoose").Types.ObjectId;
        selectedOption: import("mongoose").Types.ObjectId;
    }, {}, {}> & {
        question: import("mongoose").Types.ObjectId;
        selectedOption: import("mongoose").Types.ObjectId;
    }>;
    respondent?: import("mongoose").Types.ObjectId | null;
    anonymousTokenHash?: string | null;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    poll: import("mongoose").Types.ObjectId;
    answers: import("mongoose").Types.DocumentArray<{
        question: import("mongoose").Types.ObjectId;
        selectedOption: import("mongoose").Types.ObjectId;
    }, import("mongoose").Types.Subdocument<import("mongodb").ObjectId, unknown, {
        question: import("mongoose").Types.ObjectId;
        selectedOption: import("mongoose").Types.ObjectId;
    }, {}, {}> & {
        question: import("mongoose").Types.ObjectId;
        selectedOption: import("mongoose").Types.ObjectId;
    }>;
    respondent?: import("mongoose").Types.ObjectId | null;
    anonymousTokenHash?: string | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>, {
    poll: import("mongoose").Types.ObjectId;
    answers: import("mongoose").Types.DocumentArray<{
        question: import("mongoose").Types.ObjectId;
        selectedOption: import("mongoose").Types.ObjectId;
    }, import("mongoose").Types.Subdocument<import("mongodb").ObjectId, unknown, {
        question: import("mongoose").Types.ObjectId;
        selectedOption: import("mongoose").Types.ObjectId;
    }, {}, {}> & {
        question: import("mongoose").Types.ObjectId;
        selectedOption: import("mongoose").Types.ObjectId;
    }>;
    respondent?: import("mongoose").Types.ObjectId | null;
    anonymousTokenHash?: string | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export type Response = InferSchemaType<typeof responseSchema>;
export default Response;
//# sourceMappingURL=model.d.ts.map