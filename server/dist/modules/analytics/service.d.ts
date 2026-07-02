import type { Types } from "mongoose";
export declare function computeAnalytics(pollId: string | Types.ObjectId): Promise<{
    totalResponses: number;
    questions: {
        questionId: Types.ObjectId;
        questionText: string;
        totalAnswers: number;
        options: {
            optionId: import("mongodb").ObjectId;
            optionText: string;
            count: number;
            percentage: number;
        }[];
    }[];
    insights: {
        totalQuestions: number;
        participation: {
            authenticated: {
                count: number;
                percentage: number;
            };
            anonymous: {
                count: number;
                percentage: number;
            };
        };
    };
    lastUpdated: Date;
}>;
//# sourceMappingURL=service.d.ts.map