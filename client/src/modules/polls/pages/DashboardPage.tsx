import { useEffect, useState } from "react";
import { Link } from "react-router";
import { PlusCircle, LayoutDashboard, Sparkles, TrendingUp, Clock, BarChart3 } from "lucide-react";
import { toast } from "sonner";
import { getPolls, publishPoll } from "../api";
import type { Poll } from "../types";
import { PollCard } from "../../../shared/components/PollCard";
import { Button } from "../../../shared/components/Button";
import { getApiErrorMessage } from "../../../shared/lib/api";

function StatWidget({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string | number; color: string }) {
    const colorMap: Record<string, string> = {
        indigo: "from-[#6366f1]/20 to-[#818cf8]/10 text-[#818cf8] border-[#6366f1]/20",
        pink: "from-[#ec4899]/20 to-[#f472b6]/10 text-[#f472b6] border-[#ec4899]/20",
        emerald: "from-[#22c55e]/20 to-[#4ade80]/10 text-[#4ade80] border-[#22c55e]/20",
        amber: "from-[#f59e0b]/20 to-[#fbbf24]/10 text-[#fbbf24] border-[#f59e0b]/20",
    };

    return (
        <div className={`glass-card p-5 flex items-center gap-4`}>
            <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${colorMap[color]} flex items-center justify-center border flex-shrink-0`}>
                {icon}
            </div>
            <div>
                <div className="text-2xl font-bold text-white">{value}</div>
                <div className="text-xs text-[#64748b] uppercase tracking-wider font-medium">{label}</div>
            </div>
        </div>
    );
}

export default function DashboardPage() {
    const [polls, setPolls] = useState<Poll[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [publishingPollId, setPublishingPollId] = useState<string | null>(null);

    useEffect(() => {
        async function loadPolls() {
            try {
                const data = await getPolls();
                setPolls(data || []);
            } catch (err) {
                setError(getApiErrorMessage(err, "Failed to load polls"));
            } finally {
                setIsLoading(false);
            }
        }
        loadPolls();
    }, []);

    const handlePublish = async (pollId: string) => {
        try {
            setPublishingPollId(pollId);
            const publishedPoll = await publishPoll(pollId);
            setPolls((previousPolls) =>
                previousPolls.map((poll) =>
                    poll._id === pollId
                        ? { ...poll, publishedAt: publishedPoll.publishedAt }
                        : poll,
                ),
            );
            toast.success("Poll published successfully!", {
                description: "Your results are now visible to the public.",
            });
        } catch (err) {
            toast.error(getApiErrorMessage(err, "Failed to publish poll"));
        } finally {
            setPublishingPollId(null);
        }
    };

    const activePolls = polls.filter(p => !p.publishedAt && new Date(p.expiresAt) >= new Date()).length;
    const publishedPolls = polls.filter(p => !!p.publishedAt).length;
    const expiredPolls = polls.filter(p => !p.publishedAt && new Date(p.expiresAt) < new Date()).length;

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-8 max-w-6xl">
                <div className="flex items-center justify-between mb-10">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center animate-pulse">
                            <LayoutDashboard className="w-5 h-5 text-white/20" />
                        </div>
                        <div>
                            <div className="h-8 w-32 bg-white/5 rounded-lg animate-pulse mb-1" />
                            <div className="h-4 w-48 bg-white/5 rounded animate-pulse" />
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-64 rounded-2xl border border-white/5 bg-white/[0.02] animate-pulse" />
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8 text-center">
                <div className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                    </svg>
                    {error}
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6366f1]/20 to-[#ec4899]/20 flex items-center justify-center border border-white/10">
                        <LayoutDashboard className="w-5 h-5 text-[#818cf8]" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-white">Dashboard</h1>
                        <p className="text-[#64748b] text-sm">Manage and track your polls</p>
                    </div>
                </div>
                <Link to="/polls/new">
                    <Button className="btn-primary h-11 px-6 shadow-lg shadow-[#6366f1]/20">
                        <PlusCircle className="w-4 h-4 mr-2" />
                        Create Poll
                    </Button>
                </Link>
            </div>

            {/* Stats Widgets */}
            {polls.length > 0 && (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                    <StatWidget 
                        icon={<TrendingUp className="w-5 h-5" />} 
                        label="Total Polls" 
                        value={polls.length} 
                        color="indigo" 
                    />
                    <StatWidget 
                        icon={<Clock className="w-5 h-5" />} 
                        label="Active" 
                        value={activePolls} 
                        color="emerald" 
                    />
                    <StatWidget 
                        icon={<BarChart3 className="w-5 h-5" />} 
                        label="Published" 
                        value={publishedPolls} 
                        color="pink" 
                    />
                    <StatWidget 
                        icon={<Clock className="w-5 h-5" />} 
                        label="Expired" 
                        value={expiredPolls} 
                        color="amber" 
                    />
                </div>
            )}

            {/* Polls Grid */}
            {polls.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-16 text-center border border-dashed border-white/10 rounded-2xl bg-white/[0.01]">
                    <div className="relative mb-6">
                        <div className="absolute -inset-4 bg-gradient-to-r from-[#6366f1]/10 to-[#ec4899]/10 rounded-3xl blur-xl" />
                        <div className="relative w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
                            <Sparkles className="w-8 h-8 text-[#818cf8]/60" />
                        </div>
                    </div>
                    <h2 className="text-xl font-semibold mb-2 text-white">No polls yet</h2>
                    <p className="text-[#64748b] max-w-sm mb-6 leading-relaxed">
                        Create your first poll to start gathering responses from your audience. It only takes a minute!
                    </p>
                    <Link to="/polls/new">
                        <Button className="btn-primary h-11 px-6 shadow-lg shadow-[#6366f1]/20">
                            <PlusCircle className="w-4 h-4 mr-2" />
                            Create Your First Poll
                        </Button>
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {polls.map((poll) => (
                        <PollCard 
                            key={poll._id} 
                            poll={poll} 
                            onPublish={handlePublish} 
                            isPublishing={publishingPollId === poll._id} 
                        />
                    ))}
                </div>
            )}
        </div>
    );
}