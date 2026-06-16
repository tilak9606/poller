import { Link } from "react-router";
import { Copy, BarChart2, Eye, Send, Clock, Shield, Globe } from "lucide-react";
import { toast } from "sonner";
import type { Poll } from "../../modules/polls/types";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
    CardDescription,
} from "./Card";
import { Button } from "./Button";

interface PollCardProps {
    poll: Poll;
    onPublish?: (pollId: string) => Promise<void>;
    isPublishing?: boolean;
}

export function PollCard({
    poll,
    onPublish,
    isPublishing = false,
}: PollCardProps) {
    const isPublished = !!poll.publishedAt;
    const isExpired = !isPublished && new Date(poll.expiresAt) < new Date();
    const statusLabel = isPublished ? "Published" : isExpired ? "Expired" : "Active";

    const statusConfig = {
        Published: {
            className: "bg-[#6366f1]/10 text-[#818cf8] border-[#6366f1]/20",
            dotColor: "bg-[#6366f1]",
        },
        Expired: {
            className: "bg-white/[0.04] text-white/40 border-white/[0.08]",
            dotColor: "bg-white/30",
        },
        Active: {
            className: "bg-[#22c55e]/10 text-[#4ade80] border-[#22c55e]/20",
            dotColor: "bg-[#22c55e]",
        },
    };

    const config = statusConfig[statusLabel as keyof typeof statusConfig];
    const publicUrl = `${window.location.origin}/polls/${poll._id}`;

    const copyLink = () => {
        navigator.clipboard.writeText(publicUrl);
        toast.success("Link copied to clipboard", {
            description: "Share this link with your audience to collect responses.",
        });
    };

    return (
        <Card className="flex flex-col h-full border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-300 group hover:-translate-y-1 hover:shadow-xl hover:shadow-black/20">
            <CardHeader className="pb-3">
                <div className="flex justify-between items-start mb-3">
                    <CardTitle className="text-lg line-clamp-1 text-white font-semibold group-hover:text-gradient transition-all">
                        {poll.title}
                    </CardTitle>
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${config.className}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${config.dotColor} ${statusLabel === "Active" ? "animate-pulse" : ""}`} />
                        {statusLabel}
                    </span>
                </div>
                {poll.description && (
                    <CardDescription className="line-clamp-2 text-white/40">
                        {poll.description}
                    </CardDescription>
                )}
            </CardHeader>

            <CardContent className="flex-1">
                <div className="space-y-2.5 text-sm">
                    <div className="flex items-center gap-2.5 text-white/40">
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                            poll.responseAccess === "authenticated" 
                                ? "bg-[#6366f1]/10" 
                                : "bg-[#06b6d4]/10"
                        }`}>
                            {poll.responseAccess === "authenticated" ? (
                                <Shield className="w-3.5 h-3.5 text-[#818cf8]" />
                            ) : (
                                <Globe className="w-3.5 h-3.5 text-[#22d3ee]" />
                            )}
                        </div>
                        <span className="capitalize">{poll.responseAccess} access</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-white/40">
                        <div className="w-7 h-7 rounded-lg bg-white/[0.04] flex items-center justify-center">
                            <Clock className="w-3.5 h-3.5 text-white/30" />
                        </div>
                        <span>Expires {new Date(poll.expiresAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                    </div>
                </div>
            </CardContent>

            <CardFooter className="flex items-center justify-between gap-2 border-t border-white/[0.06] pt-4">
                <div className="flex gap-1">
                    <Link to={`/polls/${poll._id}`}>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="w-9 h-9 p-0 text-white/30 hover:text-white hover:bg-white/10 rounded-lg"
                            title="View Public Page"
                        >
                            <Eye className="w-4 h-4" />
                        </Button>
                    </Link>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={copyLink}
                        className="w-9 h-9 p-0 text-white/30 hover:text-white hover:bg-white/10 rounded-lg"
                        title="Copy Link"
                    >
                        <Copy className="w-4 h-4" />
                    </Button>
                    {!isPublished && onPublish && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onPublish(poll._id)}
                            title="Publish Poll"
                            disabled={isPublishing}
                            className="w-9 h-9 p-0 text-white/30 hover:text-[#4ade80] hover:bg-[#22c55e]/10 rounded-lg disabled:opacity-30"
                        >
                            <Send className="w-4 h-4" />
                        </Button>
                    )}
                </div>
                <Link to={`/polls/${poll._id}/analytics`} className="flex-1 ml-2">
                    <Button 
                        variant="secondary" 
                        size="sm" 
                        className="w-full bg-white/[0.04] text-white/60 hover:bg-white/[0.08] hover:text-white border border-white/[0.06] rounded-lg"
                    >
                        <BarChart2 className="w-4 h-4 mr-2" />
                        Analytics
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    );
}