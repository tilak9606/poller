export interface ApiResponse<T = unknown> {
    success: boolean;
    message: string;
    data?: T;
}

export interface PollOption {
    _id: string;
    text: string;
}

export interface Question {
    _id: string;
    poll: string;
    text: string;
    isRequired: boolean;
    order: number;
    options: PollOption[];
    createdAt?: string;
    updatedAt?: string;
}

export interface Poll {
    _id: string;
    creator: string;
    title: string;
    description: string;
    responseAccess: "anonymous" | "authenticated";
    expiresAt: string;
    publishedAt: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface PollDetails {
    poll: Poll;
    questions: Question[];
    meta: {
        isOwner: boolean;
        canRespond: boolean;
    };
}

export interface AnalyticsOption {
    optionId: string;
    optionText: string;
    count: number;
    percentage: number;
}

export interface AnalyticsQuestion {
    questionId: string;
    questionText: string;
    totalAnswers: number;
    options: AnalyticsOption[];
}

export interface AnalyticsInsights {
    status: "published" | "active" | "expired";
    totalQuestions: number;
    participation: {
        authenticated: { count: number; percentage: number };
        anonymous: { count: number; percentage: number };
    };
}

export interface AnalyticsData {
    poll: Poll;
    totalResponses: number;
    questions: AnalyticsQuestion[];
    insights: AnalyticsInsights;
    lastUpdated?: string;
}

export interface PollSocketPayload {
    pollId: string;
    publishedAt: string;
}
