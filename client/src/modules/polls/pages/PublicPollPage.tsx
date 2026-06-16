import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useForm, Controller } from "react-hook-form";
import { SignInButton, useAuth } from "@clerk/react";
import { toast } from "sonner";
import axios from "axios";
import { getPollById, submitPollResponse } from "../api";
import type { PollDetails, Question } from "../types";
import { useSocket } from "../../../shared/hooks/useSocket";
import { getApiErrorMessage } from "../../../shared/lib/api";
import { Button } from "../../../shared/components/Button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../../shared/components/Card";
import AnalyticsDashboard from "../../analytics/components/AnalyticsDashboard";
import { Vote, Lock, AlertTriangle, CheckCircle2, Clock, Users, ArrowLeft } from "lucide-react";

export default function PublicPollPage() {
    const { pollId } = useParams<{ pollId: string }>();
    const navigate = useNavigate();
    const { isSignedIn, isLoaded: authLoaded } = useAuth();
    const [pollData, setPollData] = useState<PollDetails | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [requiresSignIn, setRequiresSignIn] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const socket = useSocket({ pollId, enabled: Boolean(pollData && !pollData.poll.publishedAt) });
    const { handleSubmit, control, formState: { errors, isSubmitting } } = useForm<Record<string, string>>();

    useEffect(() => {
        async function loadPoll() {
            if (!pollId) return;
            try {
                const data = await getPollById(pollId);
                setPollData(data);
            } catch (err) {
                if (axios.isAxiosError(err) && err.response?.status === 403 && err.response?.data?.message === "Poll is not public") {
                    setRequiresSignIn(true);
                    setError(null);
                    return;
                }
                setError(getApiErrorMessage(err, "Failed to load poll"));
            } finally {
                setIsLoading(false);
            }
        }
        if (authLoaded) loadPoll();
    }, [pollId, authLoaded, isSignedIn]);

    useEffect(() => {
        if (!socket) return;
        const handlePublish = (payload: { pollId: string; publishedAt: string }) => {
            if (payload.pollId === pollId) {
                setPollData((prev) => {
                    if (!prev) return prev;
                    return { ...prev, poll: { ...prev.poll, publishedAt: payload.publishedAt } };
                });
                toast.info("Results published!", {
                    description: "This poll has just been published. Showing live results now.",
                });
            }
        };
        socket.on("poll:publish", handlePublish);
        return () => { socket.off("poll:publish", handlePublish); };
    }, [socket, pollId]);

    if (!authLoaded || isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="relative">
                    <div className="w-12 h-12 border-2 border-[#6366f1]/20 border-t-[#6366f1] rounded-full animate-spin" />
                    <div className="absolute inset-0 w-12 h-12 border-2 border-transparent border-t-[#ec4899] rounded-full animate-spin" style={{ animationDuration: '1.5s' }} />
                </div>
            </div>
        );
    }

    if (requiresSignIn) {
        return (
            <div className="container mx-auto px-4 py-16 text-center max-w-lg">
                <div className="relative mb-8">
                    <div className="absolute -inset-4 bg-gradient-to-r from-[#6366f1]/10 to-[#ec4899]/10 rounded-3xl blur-xl" />
                    <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-[#6366f1]/20 to-[#ec4899]/20 flex items-center justify-center mx-auto border border-white/10">
                        <Lock className="w-10 h-10 text-[#818cf8]" />
                    </div>
                </div>
                <h2 className="text-2xl font-bold text-white mb-3">Authentication Required</h2>
                <p className="text-[#94a3b8] mb-8 leading-relaxed">
                    This poll requires respondents to be signed in. Please sign in to participate.
                </p>
                <div className="flex items-center justify-center gap-3">
                    <SignInButton mode="modal">
                        <Button className="btn-primary h-11 px-6">Sign In</Button>
                    </SignInButton>
                    <Button variant="outline" onClick={() => navigate("/")} className="border-white/20 h-11 px-6">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Return Home
                    </Button>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-16 text-center max-w-lg">
                <div className="relative mb-8">
                    <div className="absolute -inset-4 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-3xl blur-xl" />
                    <div className="relative w-20 h-20 rounded-2xl bg-red-500/10 flex items-center justify-center mx-auto border border-red-500/20">
                        <AlertTriangle className="w-10 h-10 text-red-400" />
                    </div>
                </div>
                <h2 className="text-2xl font-bold text-red-400 mb-3">Oops!</h2>
                <p className="text-[#94a3b8] mb-8">{error}</p>
                <Button onClick={() => navigate("/")} variant="outline" className="border-white/20 h-11 px-6">
                    Return Home
                </Button>
            </div>
        );
    }

    if (!pollData) return null;
    const { poll, questions, meta } = pollData;
    const isPublished = !!poll.publishedAt;
    const isExpired = new Date(poll.expiresAt) < new Date();
    const requiresAuth = !isPublished && poll.responseAccess === "authenticated" && !isSignedIn;

    if (requiresAuth) {
        return (
            <div className="container mx-auto px-4 py-16 text-center max-w-lg">
                <Card className="border-white/[0.06] bg-white/[0.02] p-8">
                    <div className="w-16 h-16 rounded-2xl bg-[#6366f1]/10 flex items-center justify-center mx-auto mb-6 border border-[#6366f1]/20">
                        <Lock className="w-8 h-8 text-[#818cf8]" />
                    </div>
                    <CardTitle className="text-white text-xl mb-2">Sign in Required</CardTitle>
                    <CardDescription className="text-[#94a3b8] mb-6">
                        The creator of this poll requires respondents to be signed in to ensure authentic responses.
                    </CardDescription>
                    <SignInButton mode="modal">
                        <Button className="btn-primary h-11 px-6">Sign In to Participate</Button>
                    </SignInButton>
                </Card>
            </div>
        );
    }

    if (isPublished) return <AnalyticsDashboard pollId={pollId!} isPublicView />;

    if (isExpired) {
        return (
            <div className="container mx-auto px-4 py-16 text-center max-w-lg">
                <Card className="border-white/[0.06] bg-white/[0.02] p-8">
                    <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-6 border border-white/10">
                        <Clock className="w-8 h-8 text-white/30" />
                    </div>
                    <CardTitle className="text-white text-xl mb-2">This poll has expired</CardTitle>
                    <CardDescription className="text-[#94a3b8] mb-2">
                        The response window has closed. New answers can no longer be submitted.
                    </CardDescription>
                    <p className="text-sm text-[#64748b]">If the creator publishes the results, they will appear here.</p>
                </Card>
            </div>
        );
    }

    if (isSubmitted || !meta.canRespond) {
        return (
            <div className="container mx-auto px-4 py-16 text-center max-w-lg">
                <Card className="border-[#22c55e]/20 bg-[#22c55e]/5 p-8">
                    <div className="relative mb-6">
                        <div className="absolute -inset-4 bg-[#22c55e]/10 rounded-3xl blur-xl" />
                        <div className="relative w-16 h-16 rounded-2xl bg-[#22c55e]/10 flex items-center justify-center mx-auto border border-[#22c55e]/20">
                            <CheckCircle2 className="w-8 h-8 text-[#4ade80]" />
                        </div>
                    </div>
                    <CardTitle className="text-[#4ade80] text-2xl mb-2">Response Recorded!</CardTitle>
                    <CardDescription className="text-[#94a3b8] mb-4">
                        Thank you for participating! Your response has been saved and will contribute to the final results.
                    </CardDescription>
                    <p className="text-sm text-[#64748b]">If the creator publishes the results, they will appear here.</p>
                </Card>
            </div>
        );
    }

    const onSubmit = async (data: Record<string, string>) => {
        try {
            const answers = Object.entries(data)
                .filter(([, selectedOption]) => Boolean(selectedOption))
                .map(([questionId, selectedOption]) => ({ question: questionId, selectedOption }));
            if (answers.length === 0) {
                toast.error("Please answer at least one question.");
                return;
            }
            await submitPollResponse(pollId!, { answers });
            setIsSubmitted(true);
            toast.success("Response submitted!", {
                description: "Thank you for participating in this poll.",
            });
        } catch (err) {
            toast.error(getApiErrorMessage(err, "Failed to submit response"));
        }
    };

    const getQuestionError = (question: Question) => {
        const questionError = errors[question._id];
        if (!questionError) return null;
        return String(questionError.message || "This question is required");
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            {/* Poll Header */}
            <div className="mb-8 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#22c55e]/10 border border-[#22c55e]/20 text-xs text-[#4ade80] mb-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse" />
                    Active Poll
                </div>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3 text-white">
                    {poll.title}
                </h1>
                {poll.description && (
                    <p className="text-[#94a3b8] text-lg max-w-xl mx-auto">{poll.description}</p>
                )}
                <div className="flex items-center justify-center gap-4 mt-4 text-xs text-[#64748b]">
                    <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        Ends {new Date(poll.expiresAt).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5" />
                        {poll.responseAccess === "anonymous" ? "Anonymous" : "Authenticated"}
                    </span>
                </div>
            </div>

            {/* Questions Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {questions.map((q: Question, index: number) => (
                    <Card 
                        key={q._id} 
                        className={`border-white/[0.06] bg-white/[0.02] transition-all duration-300 ${
                            getQuestionError(q) ? "border-red-500/30 ring-1 ring-red-500/20" : "hover:border-white/[0.1]"
                        }`}
                    >
                        <CardHeader className="pb-3">
                            <CardTitle className="text-lg flex items-start gap-3 text-white">
                                <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#6366f1]/10 text-[#818cf8] text-sm font-bold border border-[#6366f1]/20 flex-shrink-0 mt-0.5">
                                    {index + 1}
                                </span>
                                <span className="leading-relaxed">{q.text}</span>
                                {q.isRequired && (
                                    <span className="text-red-400 text-sm font-normal flex-shrink-0">*</span>
                                )}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Controller
                                name={q._id}
                                control={control}
                                rules={{ required: q.isRequired ? "This question is required" : false }}
                                render={({ field }) => (
                                    <div className="space-y-2.5">
                                        {q.options.map((opt) => (
                                            <label 
                                                key={opt._id} 
                                                className={`quiz-option flex items-center gap-4 ${
                                                    field.value === opt._id ? 'selected' : ''
                                                }`}
                                            >
                                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all flex-shrink-0 ${
                                                    field.value === opt._id 
                                                        ? 'border-[#6366f1] bg-[#6366f1]' 
                                                        : 'border-white/20'
                                                }`}>
                                                    {field.value === opt._id && (
                                                        <div className="w-2 h-2 rounded-full bg-white" />
                                                    )}
                                                </div>
                                                <input 
                                                    type="radio" 
                                                    className="sr-only" 
                                                    {...field} 
                                                    value={opt._id} 
                                                    checked={field.value === opt._id} 
                                                />
                                                <span className="text-sm font-medium text-white/90">{opt.text}</span>
                                            </label>
                                        ))}
                                    </div>
                                )}
                            />
                            {getQuestionError(q) && (
                                <p className="text-sm text-red-400 mt-3 flex items-center gap-1.5">
                                    <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                                    {getQuestionError(q)}
                                </p>
                            )}
                        </CardContent>
                    </Card>
                ))}

                <div className="pt-4">
                    <Button 
                        type="submit" 
                        size="lg" 
                        className="w-full btn-primary h-14 text-base shadow-lg shadow-[#6366f1]/20" 
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                                Submitting...
                            </>
                        ) : (
                            <>
                                <Vote className="w-5 h-5 mr-2" />
                                Submit Response
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
}