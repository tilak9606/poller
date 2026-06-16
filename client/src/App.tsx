import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { useAuth, useUser, SignInButton } from "@clerk/react";
import { Toaster } from "sonner";
import { api, setAuthTokenGetter } from "./shared/lib/api";

import { Header } from "./shared/components/Header";

const HomePage = lazy(() => import("./modules/home/pages/HomePage"));
const DashboardPage = lazy(() => import("./modules/polls/pages/DashboardPage"));
const CreatePollPage = lazy(() => import("./modules/polls/pages/CreatePollPage"));
const PublicPollPage = lazy(() => import("./modules/polls/pages/PublicPollPage"));
const AnalyticsPage = lazy(() => import("./modules/analytics/pages/AnalyticsPage"));
const NotFoundPage = lazy(() => import("./modules/home/pages/NotFoundPage"));

function AuthSync() {
    const { isSignedIn, isLoaded } = useUser();
    const { getToken } = useAuth();

    useEffect(() => {
        setAuthTokenGetter(getToken);
        return () => {
            setAuthTokenGetter(null);
        };
    }, [getToken]);

    useEffect(() => {
        async function syncUser() {
            if (isSignedIn && isLoaded) {
                try {
                    await api.get("/api/auth/me");
                } catch (error) {
                    console.error("Failed to sync user", error);
                }
            }
        }
        syncUser();
    }, [isSignedIn, isLoaded, getToken]);

    return null;
}

function PageFallback() {
    return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <div className="relative">
                <div className="w-12 h-12 border-2 border-[#6366f1]/20 border-t-[#6366f1] rounded-full animate-spin" />
                <div className="absolute inset-0 w-12 h-12 border-2 border-transparent border-t-[#ec4899] rounded-full animate-spin" style={{ animationDuration: "1.5s" }} />
            </div>
        </div>
    );
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { isLoaded, isSignedIn } = useAuth();

    if (!isLoaded) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="relative">
                    <div className="w-12 h-12 border-2 border-[#6366f1]/20 border-t-[#6366f1] rounded-full animate-spin" />
                    <div className="absolute inset-0 w-12 h-12 border-2 border-transparent border-t-[#ec4899] rounded-full animate-spin" style={{ animationDuration: '1.5s' }} />
                </div>
            </div>
        );
    }

    if (!isSignedIn) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8 px-4">
                <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-r from-[#6366f1]/20 to-[#ec4899]/20 rounded-3xl blur-2xl" />
                    <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-[#6366f1]/20 to-[#ec4899]/20 flex items-center justify-center border border-white/10 backdrop-blur-sm">
                        <svg className="w-10 h-10 text-[#818cf8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                        </svg>
                    </div>
                </div>
                <div className="text-center space-y-3 max-w-sm">
                    <h2 className="text-3xl font-bold tracking-tight text-white">
                        Authentication Required
                    </h2>
                    <p className="text-[#94a3b8] leading-relaxed">
                        Sign in to access your dashboard, create polls, and view detailed analytics.
                    </p>
                </div>
                <SignInButton mode="modal">
                    <button className="btn-primary h-12 px-8 text-base shadow-lg shadow-[#6366f1]/20">
                        Sign In to Continue
                    </button>
                </SignInButton>
            </div>
        );
    }

    return <>{children}</>;
}

export default function App() {
    return (
        <BrowserRouter>
            <AuthSync />
            <div className="min-h-screen bg-[#0a0a0f] text-white flex flex-col particles-bg">
                <Header />
                <main className="flex-1">
                    <Suspense fallback={<PageFallback />}>
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
                            <Route path="/polls/new" element={<ProtectedRoute><CreatePollPage /></ProtectedRoute>} />
                            <Route path="/polls/:pollId/analytics" element={<ProtectedRoute><AnalyticsPage /></ProtectedRoute>} />
                            <Route path="/polls/:pollId" element={<PublicPollPage />} />
                            <Route path="/not-found" element={<NotFoundPage />} />
                            <Route path="*" element={<Navigate to="/not-found" replace />} />
                        </Routes>
                    </Suspense>
                </main>
                <Toaster 
                    position="top-right" 
                    theme="dark" 
                    toastOptions={{ 
                        style: { 
                            background: 'rgba(15, 15, 20, 0.98)', 
                            border: '1px solid rgba(255,255,255,0.08)', 
                            backdropFilter: 'blur(16px)',
                            borderRadius: '0.875rem',
                            padding: '1rem 1.25rem'
                        } 
                    }} 
                />
            </div>
        </BrowserRouter>
    );
}