import { Link } from "react-router";
import { ArrowLeft, Compass } from "lucide-react";
import { Button } from "../../../shared/components/Button";

export default function NotFoundPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
            <div className="relative mb-8">
                <div className="absolute -inset-6 bg-gradient-to-r from-[#6366f1]/10 to-[#ec4899]/10 rounded-3xl blur-2xl" />
                <div className="relative w-24 h-24 bg-white/[0.03] rounded-2xl flex items-center justify-center border border-white/10">
                    <Compass className="w-12 h-12 text-white/20" />
                </div>
            </div>
            <h1 className="text-6xl font-bold tracking-tight mb-2 text-gradient">
                404
            </h1>
            <h2 className="text-2xl font-bold text-white mb-3">
                Page Not Found
            </h2>
            <p className="text-[#94a3b8] text-lg mb-8 max-w-md leading-relaxed">
                We couldn't find the page you're looking for. It might have been moved, deleted, or never existed.
            </p>
            <Link to="/">
                <Button size="lg" className="btn-primary h-12 px-8 shadow-lg shadow-[#6366f1]/20">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Home
                </Button>
            </Link>
        </div>
    );
}