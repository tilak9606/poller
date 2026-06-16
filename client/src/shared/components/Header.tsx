import { Link, useLocation } from "react-router";
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/react";
import { Button } from "./Button";
import { Vote, LayoutDashboard, PlusCircle } from "lucide-react";
import { useState, useEffect } from "react";

export function Header() {
    const { isSignedIn } = useUser();
    const location = useLocation();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const isActive = (path: string) => location.pathname === path;

    return (
        <header 
            className={`sticky top-0 z-50 w-full transition-all duration-300 ${
                scrolled 
                    ? "bg-[#0a0a0f]/90 backdrop-blur-xl border-b border-white/[0.06] shadow-lg shadow-black/20" 
                    : "bg-transparent border-b border-transparent"
            }`}
        >
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2.5 group">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#6366f1] to-[#ec4899] flex items-center justify-center shadow-lg shadow-[#6366f1]/20 group-hover:shadow-[#6366f1]/30 transition-shadow">
                        <Vote className="w-4.5 h-4.5 text-white" />
                    </div>
                    <span className="font-bold text-xl tracking-tight text-white">
                        Poller
                    </span>
                </Link>

                {/* Navigation */}
                <nav className="flex items-center gap-2">
                    {isSignedIn ? (
                        <>
                            <Link
                                to="/dashboard"
                                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                                    isActive("/dashboard")
                                        ? "text-white bg-white/10"
                                        : "text-white/50 hover:text-white hover:bg-white/5"
                                }`}
                            >
                                <LayoutDashboard className="w-4 h-4" />
                                <span className="hidden sm:inline">Dashboard</span>
                            </Link>
                            <Link
                                to="/polls/new"
                                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] hover:from-[#818cf8] hover:to-[#a78bfa] transition-all shadow-lg shadow-[#6366f1]/20"
                            >
                                <PlusCircle className="w-4 h-4" />
                                <span className="hidden sm:inline">New Poll</span>
                            </Link>
                            <div className="pl-2 ml-1 border-l border-white/10">
                                <UserButton
                                    appearance={{
                                        elements: {
                                            userButtonAvatarBox: "w-8 h-8 ring-2 ring-white/10",
                                        }
                                    }}
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            <SignInButton mode="modal">
                                <Button variant="ghost" size="sm" className="text-white/50 hover:text-white hover:bg-white/5">
                                    Sign In
                                </Button>
                            </SignInButton>
                            <SignUpButton mode="modal">
                                <Button
                                    size="sm"
                                    className="bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white hover:from-[#818cf8] hover:to-[#a78bfa] rounded-lg h-9 px-4 shadow-lg shadow-[#6366f1]/20"
                                >
                                    Get Started
                                </Button>
                            </SignUpButton>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
}