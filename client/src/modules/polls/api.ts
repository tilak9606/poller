import { api } from "../../shared/lib/api";
import type {
    AnalyticsData,
    ApiResponse,
    Poll,
    PollDetails,
} from "./types";

interface CreatePollPayload {
    title: string;
    description?: string;
    responseAccess: "anonymous" | "authenticated";
    expiresAt: string;
    questions: {
        text: string;
        isRequired: boolean;
        options: string[];
    }[];
}

export async function getPolls() {
    const { data } = await api.get<ApiResponse<{ polls: Poll[] }>>("/api/polls");
    return data.data?.polls ?? [];
}

export async function createPoll(payload: CreatePollPayload) {
    const { data } = await api.post<ApiResponse<{ poll: Poll }>>(
        "/api/polls",
        payload,
    );
    return data.data;
}

export async function getPollById(pollId: string) {
    const { data } = await api.get<ApiResponse<PollDetails>>(
        `/api/polls/${pollId}`,
    );

    if (!data.data) {
        throw new Error("Poll data was not returned by the server");
    }

    return data.data;
}

export async function submitPollResponse(
    pollId: string,
    payload: { answers: { question: string; selectedOption: string }[] },
) {
    const { data } = await api.post<ApiResponse<unknown>>(
        `/api/polls/${pollId}/responses`,
        payload,
    );
    return data.data;
}

export async function publishPoll(pollId: string) {
    const { data } = await api.patch<ApiResponse<{ poll: Poll }>>(
        `/api/polls/${pollId}/publish`,
    );

    if (!data.data?.poll) {
        throw new Error("Published poll was not returned by the server");
    }

    return data.data.poll;
}

export async function getAnalytics(pollId: string) {
    const { data } = await api.get<ApiResponse<AnalyticsData>>(
        `/api/polls/${pollId}/analytics`,
    );

    if (!data.data) {
        throw new Error("Analytics data was not returned by the server");
    }

    return data.data;
}
