import { useCallback, useEffect, useState } from "react";
import {
    Bar,
    BarChart,
    Cell,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { getAnalytics } from "../api";
import { publishPoll } from "../../polls/api";
import type { AnalyticsData, AnalyticsQuestion } from "../../polls/types";
import { useSocket } from "../../../shared/hooks/useSocket";
import { getApiErrorMessage } from "../../../shared/lib/api";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "../../../shared/components/Card";
import { Button } from "../../../shared/components/Button";
import { toast } from "sonner";
import {
    Users,
    Globe,
    Activity,
    CheckCircle2,
    BarChart3,
    Share2,
    Zap,
    AlertTriangle,
    Target,
    PieChart as PieChartIcon,
    Clock,
} from "lucide-react";

type TabId = "overview" | "questions";

function TabButton({
    active,
    onClick,
    icon,
    label,
    badge,
}: {
    active: boolean;
    onClick: () => void;
    icon: React.ReactNode;
    label: string;
    badge?: number;
}) {
    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                active
                    ? "bg-[#6366f1]/15 text-[#818cf8] border border-[#6366f1]/25"
                    : "text-white/40 hover:text-white/70 hover:bg-white/[0.03] border border-transparent"
            }`}
        >
            {icon}
            {label}
            {badge !== undefined && badge > 0 && (
                <span className="ml-1 px-1.5 py-0.5 rounded-md bg-[#6366f1]/20 text-[#818cf8] text-xs font-bold">
                    {badge}
                </span>
            )}
        </button>
    );
}

function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
    const [display, setDisplay] = useState(0);

    useEffect(() => {
        const start = performance.now();
        const duration = 900;
        let frame = 0;

        const animate = (timestamp: number) => {
            const progress = Math.min((timestamp - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay(Math.floor(eased * value));
            if (progress < 1) {
                frame = requestAnimationFrame(animate);
            }
        };

        frame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(frame);
    }, [value]);

    return <span>{display.toLocaleString()}{suffix}</span>;
}

function StatCard({
    icon,
    label,
    value,
    subtext,
    color = "indigo",
}: {
    icon: React.ReactNode;
    label: string;
    value: number;
    subtext?: string;
    color?: string;
}) {
    const colorMap: Record<string, { bg: string; border: string }> = {
        indigo: { bg: "bg-[#6366f1]/10", border: "border-[#6366f1]/20" },
        pink: { bg: "bg-[#ec4899]/10", border: "border-[#ec4899]/20" },
        cyan: { bg: "bg-[#06b6d4]/10", border: "border-[#06b6d4]/20" },
        emerald: { bg: "bg-[#22c55e]/10", border: "border-[#22c55e]/20" },
        amber: { bg: "bg-[#f59e0b]/10", border: "border-[#f59e0b]/20" },
    };
    const c = colorMap[color];

    return (
        <Card className="border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.03] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
            <CardContent className="pt-6">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                        <p className="text-xs font-medium text-white/40 uppercase tracking-wider mb-1">
                            {label}
                        </p>
                        <p className="text-3xl font-bold text-white tracking-tight">
                            <AnimatedNumber value={value} />
                        </p>
                        {subtext && (
                            <p className="text-xs text-white/40 mt-1.5">{subtext}</p>
                        )}
                    </div>
                    <div className={`p-3 ${c.bg} rounded-xl border ${c.border}`}>
                        {icon}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

function AuthDistributionChart({
    participation,
    totalResponses,
}: {
    participation: AnalyticsData["insights"]["participation"];
    totalResponses: number;
}) {
    const data = [
        {
            name: "Authenticated",
            value: participation.authenticated.count,
            color: "#6366f1",
        },
        {
            name: "Anonymous",
            value: participation.anonymous.count,
            color: "#06b6d4",
        },
    ].filter((entry) => entry.value > 0);

    return (
        <Card className="border-white/[0.06] bg-white/[0.02]">
            <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#818cf8]" />
                    Respondent Type
                </CardTitle>
                <CardDescription>
                    {totalResponses} total {totalResponses === 1 ? "response" : "responses"}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-4">
                        <div className="text-xs text-white/40">Authenticated</div>
                        <div className="text-2xl font-bold text-white mt-1">
                            {participation.authenticated.count}
                        </div>
                        <div className="text-xs text-[#818cf8] mt-1">
                            {participation.authenticated.percentage}%
                        </div>
                    </div>
                    <div className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-4">
                        <div className="text-xs text-white/40">Anonymous</div>
                        <div className="text-2xl font-bold text-white mt-1">
                            {participation.anonymous.count}
                        </div>
                        <div className="text-xs text-[#22d3ee] mt-1">
                            {participation.anonymous.percentage}%
                        </div>
                    </div>
                </div>
                {data.length > 0 ? (
                    <div className="h-[180px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={data}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={45}
                                    outerRadius={70}
                                    paddingAngle={4}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {data.map((entry) => (
                                        <Cell key={entry.name} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{
                                        borderRadius: "12px",
                                        border: "1px solid rgba(255,255,255,0.1)",
                                        backgroundColor: "rgba(15,15,20,0.98)",
                                        color: "white",
                                    }}
                                />
                                <Legend
                                    verticalAlign="bottom"
                                    height={30}
                                    iconType="circle"
                                    iconSize={6}
                                    formatter={(value: string) => (
                                        <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "11px" }}>
                                            {value}
                                        </span>
                                    )}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                ) : (
                    <div className="h-[180px] rounded-xl border border-dashed border-white/[0.08] flex items-center justify-center text-white/30 text-sm">
                        No responses yet
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

function ParticipationChart({
    questions,
}: {
    questions: AnalyticsQuestion[];
}) {
    const data = questions.map((question) => ({
        question: question.questionText.length > 24
            ? `${question.questionText.slice(0, 24)}...`
            : question.questionText,
        answered: question.totalAnswers,
    }));

    return (
        <Card className="border-white/[0.06] bg-white/[0.02]">
            <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                    <Activity className="w-4 h-4 text-[#22d3ee]" />
                    Answers by Question
                </CardTitle>
                <CardDescription>
                    Participation per question against total responses
                </CardDescription>
            </CardHeader>
            <CardContent>
                {data.length > 0 ? (
                    <div className="h-[260px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data} margin={{ top: 8, right: 20, left: 0, bottom: 32 }}>
                                <XAxis
                                    dataKey="question"
                                    tick={{ fill: "rgba(255,255,255,0.45)", fontSize: 11 }}
                                    axisLine={false}
                                    tickLine={false}
                                    interval={0}
                                />
                                <YAxis
                                    tick={{ fill: "rgba(255,255,255,0.45)", fontSize: 11 }}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <Tooltip
                                    cursor={{ fill: "rgba(255,255,255,0.02)" }}
                                    contentStyle={{
                                        borderRadius: "12px",
                                        border: "1px solid rgba(255,255,255,0.1)",
                                        backgroundColor: "rgba(15,15,20,0.98)",
                                        color: "white",
                                    }}
                                />
                                <Bar dataKey="answered" radius={[8, 8, 0, 0]} barSize={36}>
                                    {data.map((_, index) => (
                                        <Cell key={index} fill={index % 2 === 0 ? "#6366f1" : "#ec4899"} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                ) : (
                    <div className="h-[260px] rounded-xl border border-dashed border-white/[0.08] flex items-center justify-center text-white/30 text-sm">
                        No question data yet
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

function QuestionAnalytics({
    q,
    index,
    totalResponses,
}: {
    q: AnalyticsQuestion;
    index: number;
    totalResponses: number;
}) {
    const COLORS = ["#6366f1", "#8b5cf6", "#ec4899", "#f472b6", "#06b6d4", "#22d3ee", "#f59e0b", "#fbbf24"];
    const leadingOption = q.options.length > 0
        ? q.options.reduce((current, option) => option.count > current.count ? option : current)
        : null;

    return (
        <Card className="border-white/[0.06] bg-white/[0.02] overflow-hidden hover:border-white/[0.1] transition-all duration-300">
            <CardHeader className="bg-white/[0.02] border-b border-white/[0.06]">
                <div className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#6366f1]/10 text-[#818cf8] text-sm font-bold border border-[#6366f1]/20 flex-shrink-0 mt-0.5">
                        {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                        <CardTitle className="text-lg font-semibold leading-relaxed text-white">
                            {q.questionText}
                        </CardTitle>
                        <CardDescription className="mt-1.5 flex items-center gap-2 flex-wrap">
                            <Users className="w-3.5 h-3.5" />
                            {q.totalAnswers} {q.totalAnswers === 1 ? "answer" : "answers"}
                            <span className="text-white/20">•</span>
                            <span>{Math.round((q.totalAnswers / Math.max(totalResponses, 1)) * 100)}% participation</span>
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="pt-6">
                <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8">
                    <div className="h-[280px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={q.options} layout="vertical" margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
                                <XAxis type="number" hide />
                                <YAxis
                                    dataKey="optionText"
                                    type="category"
                                    width={100}
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 12 }}
                                />
                                <Tooltip
                                    cursor={{ fill: "rgba(255,255,255,0.02)" }}
                                    contentStyle={{
                                        borderRadius: "12px",
                                        border: "1px solid rgba(255,255,255,0.1)",
                                        backgroundColor: "rgba(15,15,20,0.98)",
                                        color: "white",
                                    }}
                                />
                                <Bar dataKey="count" radius={[0, 8, 8, 0]} barSize={28}>
                                    {q.options.map((_, idx) => (
                                        <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="space-y-4">
                        {q.options.map((opt, i) => (
                            <div key={opt.optionId}>
                                <div className="flex justify-between items-center text-sm mb-2">
                                    <span className="font-medium text-white/80">{opt.optionText}</span>
                                    <div className="flex items-center gap-3">
                                        <span className="text-white/60 font-mono text-sm">{opt.count}</span>
                                        <span
                                            className="text-sm font-bold px-2 py-0.5 rounded-md"
                                            style={{
                                                backgroundColor: `${COLORS[i % COLORS.length]}15`,
                                                color: COLORS[i % COLORS.length],
                                            }}
                                        >
                                            {opt.percentage}%
                                        </span>
                                    </div>
                                </div>
                                <div className="h-2.5 w-full bg-white/[0.04] rounded-full overflow-hidden">
                                    <div
                                        className="h-full rounded-full transition-all duration-1000 ease-out"
                                        style={{
                                            width: `${opt.percentage}%`,
                                            backgroundColor: COLORS[i % COLORS.length],
                                            opacity: 0.8,
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                        {leadingOption && (
                            <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-[#6366f1]/5 to-[#ec4899]/5 border border-white/[0.06]">
                                <div className="flex items-center gap-2 text-sm">
                                    <Zap className="w-4 h-4 text-[#fbbf24]" />
                                    <span className="text-white/60">
                                        Leading: <span className="text-white font-semibold">{leadingOption.optionText}</span>{" "}
                                        with <span className="text-[#818cf8] font-semibold">{leadingOption.percentage}%</span>
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export default function AnalyticsDashboard({
    pollId,
    isPublicView = false,
}: {
    pollId: string;
    isPublicView?: boolean;
}) {
    const [data, setData] = useState<AnalyticsData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isPublishing, setIsPublishing] = useState(false);
    const [activeTab, setActiveTab] = useState<TabId>("overview");
    const [error, setError] = useState<string | null>(null);
    const socket = useSocket({ pollId });

    const fetchAnalytics = useCallback(async () => {
        try {
            setError(null);
            const res = await getAnalytics(pollId);
            setData(res);
        } catch (err) {
            const message = getApiErrorMessage(err, "Failed to load analytics");
            setError(message);
            toast.error(message);
        } finally {
            setIsLoading(false);
        }
    }, [pollId]);

    useEffect(() => {
        const timer = window.setTimeout(() => { void fetchAnalytics(); }, 0);
        return () => window.clearTimeout(timer);
    }, [fetchAnalytics]);

    useEffect(() => {
        if (!socket) return;

        const handleUpdate = (snapshot: AnalyticsData) => setData(snapshot);
        const handlePublish = ({ pollId: publishedPollId, publishedAt }: { pollId: string; publishedAt: string }) => {
            if (publishedPollId !== pollId) return;
            setData((current) => current ? {
                ...current,
                poll: { ...current.poll, publishedAt },
                insights: { ...current.insights, status: "published" },
            } : current);
        };

        socket.on("poll:analytics:update", handleUpdate);
        socket.on("poll:publish", handlePublish);

        return () => {
            socket.off("poll:analytics:update", handleUpdate);
            socket.off("poll:publish", handlePublish);
        };
    }, [socket, pollId]);

    const handlePublish = async () => {
        try {
            setIsPublishing(true);
            const updatedPoll = await publishPoll(pollId);
            setData((current) => current ? {
                ...current,
                poll: { ...current.poll, publishedAt: updatedPoll.publishedAt },
                insights: { ...current.insights, status: "published" },
            } : current);
            toast.success("Poll published successfully!", {
                description: "Your results are now visible to everyone.",
            });
        } catch (err) {
            toast.error(getApiErrorMessage(err, "Failed to publish poll"));
        } finally {
            setIsPublishing(false);
        }
    };

    const handleShare = async () => {
        const url = `${window.location.origin}/polls/${pollId}`;
        try {
            await navigator.clipboard.writeText(url);
            toast.success("Link copied!", {
                description: "Share this link to let others view the results.",
            });
        } catch {
            window.prompt("Copy this link", url);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <div className="relative">
                    <div className="w-12 h-12 border-2 border-[#6366f1]/20 border-t-[#6366f1] rounded-full animate-spin" />
                    <div className="absolute inset-0 w-12 h-12 border-2 border-transparent border-t-[#ec4899] rounded-full animate-spin" style={{ animationDuration: "1.5s" }} />
                </div>
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="p-8 text-center">
                <div className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
                    <AlertTriangle className="w-5 h-5" />
                    {error ?? "Could not load analytics data."}
                </div>
            </div>
        );
    }

    const { poll, totalResponses, questions, insights } = data;
    const isPublished = !!poll.publishedAt;
    const participation = insights.participation;
    const participationRate = totalResponses > 0 && questions.length > 0
        ? Math.round(
            (questions.reduce((sum, question) => sum + question.totalAnswers, 0) /
                (questions.length * totalResponses)) * 100,
        )
        : 0;
    const statusLabel = isPublished ? "Published" : insights.status === "expired" ? "Expired" : "Collecting Responses";

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6366f1]/20 to-[#ec4899]/20 flex items-center justify-center border border-white/10">
                            <BarChart3 className="w-5 h-5 text-[#818cf8]" />
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight text-white">
                            {isPublicView ? "Results:" : "Analytics:"}{" "}
                            <span className="text-gradient">{poll.title}</span>
                        </h1>
                    </div>
                    <div className="flex items-center gap-3 flex-wrap">
                        <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border ${
                            isPublished
                                ? "bg-[#6366f1]/10 text-[#818cf8] border-[#6366f1]/20"
                                : insights.status === "expired"
                                    ? "bg-white/[0.04] text-white/40 border-white/[0.08]"
                                    : "bg-[#22c55e]/10 text-[#4ade80] border-[#22c55e]/20"
                        }`}>
                            {isPublished ? <CheckCircle2 className="w-3.5 h-3.5" /> : <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />}
                            {statusLabel}
                        </span>
                        <span className="text-sm text-white/40 flex items-center gap-1.5">
                            <Users className="w-3.5 h-3.5" />
                            {totalResponses} total {totalResponses === 1 ? "response" : "responses"}
                        </span>
                        {poll.expiresAt && (
                            <span className="text-sm text-white/40 flex items-center gap-1.5">
                                <Clock className="w-3.5 h-3.5" />
                                {isPublished ? "Ended" : `Ends ${new Date(poll.expiresAt).toLocaleDateString()}`}
                            </span>
                        )}
                    </div>
                </div>
                <div className="flex gap-2">
                    {!isPublicView && !isPublished && (
                        <Button
                            onClick={handlePublish}
                            className="btn-primary h-10 px-5 shadow-lg shadow-[#6366f1]/20"
                            disabled={isPublishing}
                        >
                            {isPublishing ? (
                                <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />Publishing...</>
                            ) : (
                                <><CheckCircle2 className="w-4 h-4 mr-2" />Publish Results</>
                            )}
                        </Button>
                    )}
                    <Button variant="outline" onClick={handleShare} className="border-white/20 h-10 px-4">
                        <Share2 className="w-4 h-4 mr-2" />
                        Share
                    </Button>
                </div>
            </div>

            {!isPublicView && (
                <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
                    <TabButton
                        active={activeTab === "overview"}
                        onClick={() => setActiveTab("overview")}
                        icon={<BarChart3 className="w-4 h-4" />}
                        label="Overview"
                    />
                    <TabButton
                        active={activeTab === "questions"}
                        onClick={() => setActiveTab("questions")}
                        icon={<Target className="w-4 h-4" />}
                        label="Questions"
                        badge={questions.length}
                    />
                </div>
            )}

            {(isPublicView || activeTab === "overview") && (
                <div className="space-y-8 mb-8">
                    {!isPublicView && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <StatCard icon={<Users className="w-5 h-5 text-[#818cf8]" />} label="Total Responses" value={totalResponses} subtext="All time" color="indigo" />
                            <StatCard icon={<Target className="w-5 h-5 text-[#f472b6]" />} label="Questions" value={insights.totalQuestions} subtext={`${questions.length} answered`} color="pink" />
                            <StatCard icon={<Activity className="w-5 h-5 text-[#22d3ee]" />} label="Participation Rate" value={participationRate} subtext="Questions answered" color="cyan" />
                            <StatCard icon={<PieChartIcon className="w-5 h-5 text-[#fbbf24]" />} label="Anonymous Share" value={participation.anonymous.percentage} subtext="of respondents" color="amber" />
                        </div>
                    )}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <AuthDistributionChart participation={participation} totalResponses={totalResponses} />
                        <ParticipationChart questions={questions} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card className="border-white/[0.06] bg-white/[0.02] p-6">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 rounded-xl bg-[#6366f1]/10 border border-[#6366f1]/20 flex items-center justify-center">
                                    <Users className="w-5 h-5 text-[#818cf8]" />
                                </div>
                                <div>
                                    <div className="text-sm text-white/40">Authenticated</div>
                                    <div className="text-2xl font-bold text-white">{participation.authenticated.count}</div>
                                </div>
                            </div>
                            <p className="text-xs text-white/30">{participation.authenticated.percentage}% of total responses</p>
                        </Card>
                        <Card className="border-white/[0.06] bg-white/[0.02] p-6">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 rounded-xl bg-[#06b6d4]/10 border border-[#06b6d4]/20 flex items-center justify-center">
                                    <Globe className="w-5 h-5 text-[#22d3ee]" />
                                </div>
                                <div>
                                    <div className="text-sm text-white/40">Anonymous</div>
                                    <div className="text-2xl font-bold text-white">{participation.anonymous.count}</div>
                                </div>
                            </div>
                            <p className="text-xs text-white/30">{participation.anonymous.percentage}% of total responses</p>
                        </Card>
                        <Card className="border-white/[0.06] bg-white/[0.02] p-6">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 rounded-xl bg-[#22c55e]/10 border border-[#22c55e]/20 flex items-center justify-center">
                                    <CheckCircle2 className="w-5 h-5 text-[#4ade80]" />
                                </div>
                                <div>
                                    <div className="text-sm text-white/40">Last Updated</div>
                                    <div className="text-lg font-bold text-white">{data.lastUpdated ? new Date(data.lastUpdated).toLocaleTimeString() : "—"}</div>
                                </div>
                            </div>
                            <p className="text-xs text-white/30">Refreshed from backend analytics</p>
                        </Card>
                    </div>
                </div>
            )}

            {activeTab === "questions" && !isPublicView && (
                <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-[#ec4899]/10 flex items-center justify-center border border-[#ec4899]/20">
                            <Target className="w-4 h-4 text-[#f472b6]" />
                        </div>
                        <h2 className="text-xl font-semibold text-white">Question Results</h2>
                    </div>
                    {questions.map((question, index) => (
                        <QuestionAnalytics
                            key={question.questionId}
                            q={question}
                            index={index}
                            totalResponses={totalResponses}
                        />
                    ))}
                </div>
            )}

            {isPublicView && (
                <div className="space-y-6">
                    {questions.map((question, index) => (
                        <QuestionAnalytics
                            key={question.questionId}
                            q={question}
                            index={index}
                            totalResponses={totalResponses}
                        />
                    ))}
                </div>
            )}

            {isPublished && (
                <div className="mt-8 p-4 rounded-xl bg-[#22c55e]/5 border border-[#22c55e]/10 text-center">
                    <p className="text-sm text-[#4ade80] flex items-center justify-center gap-2">
                        <CheckCircle2 className="w-4 h-4" />
                        These results have been published and are visible to all participants.
                    </p>
                </div>
            )}
        </div>
    );
}
