import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { 
    ArrowRight, 
    BarChart3, 
    Share2, 
    Zap, 
    LayoutDashboard, 
    CheckCircle2,
    Clock,
    Shield,
    Globe,
    Sparkles,
    TrendingUp,
    MessageSquare,
    Vote,
    ChevronDown
} from "lucide-react";
import { Button } from "../../../shared/components/Button";
import { useAuth, SignInButton, SignUpButton } from "@clerk/react";


function FloatingParticles() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationId: number;
        const particles: Array<{
            x: number; y: number; vx: number; vy: number;
            radius: number; opacity: number; color: string;
        }> = [];

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener("resize", resize);

        const colors = ["rgba(99, 102, 241, ", "rgba(236, 72, 153, ", "rgba(6, 182, 212, "];
        for (let i = 0; i < 50; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                radius: Math.random() * 2 + 0.5,
                opacity: Math.random() * 0.5 + 0.1,
                color: colors[Math.floor(Math.random() * colors.length)],
            });
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach((p) => {
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = p.color + p.opacity + ")";
                ctx.fill();
            });
            animationId = requestAnimationFrame(animate);
        };
        animate();

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener("resize", resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none"
            style={{ zIndex: 0 }}
        />
    );
}


function FeatureCard({ 
    icon, 
    title, 
    description, 
    color = "indigo",
    delay = 0 
}: { 
    icon: React.ReactNode; 
    title: string; 
    description: string; 
    color?: string;
    delay?: number;
}) {
    const colorMap: Record<string, string> = {
        indigo: "from-[#6366f1]/20 to-[#818cf8]/10 border-[#6366f1]/20 text-[#818cf8]",
        pink: "from-[#ec4899]/20 to-[#f472b6]/10 border-[#ec4899]/20 text-[#f472b6]",
        cyan: "from-[#06b6d4]/20 to-[#22d3ee]/10 border-[#06b6d4]/20 text-[#22d3ee]",
        emerald: "from-[#22c55e]/20 to-[#4ade80]/10 border-[#22c55e]/20 text-[#4ade80]",
        amber: "from-[#f59e0b]/20 to-[#fbbf24]/10 border-[#f59e0b]/20 text-[#fbbf24]",
    };

    return (
        <div 
            className={`glass-card p-6 group animate-slide-up delay-${delay}`}
            style={{ animationDelay: `${delay}ms`, animationFillMode: 'both' }}
        >
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorMap[color]} flex items-center justify-center mb-4 border group-hover:scale-110 transition-transform duration-300`}>
                {icon}
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
            <p className="text-[#94a3b8] text-sm leading-relaxed">{description}</p>
        </div>
    );
}

function StepCard({ 
    number, 
    icon, 
    title, 
    description, 
    delay = 0 
}: { 
    number: string;
    icon: React.ReactNode; 
    title: string; 
    description: string; 
    delay?: number;
}) {
    return (
        <div 
            className="relative animate-slide-up"
            style={{ animationDelay: `${delay}ms`, animationFillMode: 'both' }}
        >
            <div className="glass-card p-6 h-full">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6366f1]/20 to-[#ec4899]/20 flex items-center justify-center text-sm font-bold text-[#818cf8] border border-[#6366f1]/20">
                        {number}
                    </div>
                    <div className="text-[#6366f1]">{icon}</div>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
                <p className="text-[#94a3b8] text-sm leading-relaxed">{description}</p>
            </div>
            {/* Connector line */}
            <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-gradient-to-r from-[#6366f1]/30 to-transparent" />
        </div>
    );
}


export default function HomePage() {
    const { isSignedIn } = useAuth();
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="flex flex-col min-h-[calc(100vh-4rem)] relative overflow-hidden">
            <FloatingParticles />

            {/* ═══ HERO SECTION ═══ */}
            <section className="relative pt-20 pb-24 md:pt-32 md:pb-40 flex flex-col items-center justify-center text-center px-4">
                {/* Background glows */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div 
                        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full opacity-30"
                        style={{
                            background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)',
                            transform: `translate(-50%, ${scrollY * 0.1}px)`
                        }}
                    />
                    <div 
                        className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full opacity-20"
                        style={{
                            background: 'radial-gradient(circle, rgba(236,72,153,0.1) 0%, transparent 70%)',
                            transform: `translateY(${-scrollY * 0.05}px)`
                        }}
                    />
                </div>

                <div className="relative z-10 max-w-5xl mx-auto">
                    {/* Live Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#6366f1]/10 border border-[#6366f1]/20 text-sm text-[#818cf8] mb-8 backdrop-blur-sm animate-slide-up">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22c55e] opacity-75" />
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#22c55e]" />
                        </span>
                        Live Polling Platform — Now with Real-time Analytics
                    </div>

                    {/* Headline */}
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-6 leading-[1.1] animate-slide-up delay-100">
                        <span className="text-white">Create Polls.</span>
                        <br />
                        <span className="text-gradient glow-text">Get Answers.</span>
                        <br />
                        <span className="text-white/60 text-4xl md:text-6xl lg:text-7xl font-bold">Move Forward.</span>
                    </h1>

                    {/* Subheadline */}
                    <p className="text-lg md:text-xl text-[#94a3b8] mb-10 max-w-2xl mx-auto leading-relaxed animate-slide-up delay-200">
                        Design beautiful, interactive polls and surveys in seconds. Share with your audience, 
                        collect responses in real-time, and make data-driven decisions with powerful analytics.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up delay-300">
                        {isSignedIn ? (
                            <>
                                <Link to="/polls/new">
                                    <Button size="lg" className="btn-primary h-14 px-8 text-base shadow-lg shadow-[#6366f1]/25">
                                        <Vote className="w-5 h-5 mr-2" />
                                        Create a Poll
                                    </Button>
                                </Link>
                                <Link to="/dashboard">
                                    <Button variant="outline" size="lg" className="h-14 px-8 text-base border-white/20 text-white hover:bg-white/5 hover:border-white/30">
                                        <LayoutDashboard className="w-5 h-5 mr-2" />
                                        View Dashboard
                                    </Button>
                                </Link>
                            </>
                        ) : (
                            <>
                                <SignUpButton mode="modal">
                                    <Button size="lg" className="btn-primary h-14 px-8 text-base shadow-lg shadow-[#6366f1]/25">
                                        Get Started Free
                                        <ArrowRight className="w-5 h-5 ml-2" />
                                    </Button>
                                </SignUpButton>
                                <SignInButton mode="modal">
                                    <Button variant="outline" size="lg" className="h-14 px-8 text-base border-white/20 text-white hover:bg-white/5 hover:border-white/30">
                                        Sign In
                                    </Button>
                                </SignInButton>
                            </>
                        )}
                    </div>

                    {/* Trust badges */}
                    <div className="mt-12 flex flex-wrap justify-center gap-6 text-[#64748b] text-sm animate-slide-up delay-400">
                        <span className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-[#22c55e]" />
                            No credit card required
                        </span>
                        <span className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-[#22c55e]" />
                            Free forever plan
                        </span>
                        <span className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-[#22c55e]" />
                            Real-time results
                        </span>
                    </div>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                    <ChevronDown className="w-6 h-6 text-white/30" />
                </div>
            </section>

            {/* ═══ STATS BAR ═══ */}
            <section className="relative z-10 border-y border-white/[0.06] bg-white/[0.02] backdrop-blur-sm">
            </section>

            {/* ═══ FEATURES SECTION ═══ */}
            <section className="relative z-10 py-24 md:py-32">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#6366f1]/10 border border-[#6366f1]/20 text-xs text-[#818cf8] mb-4">
                            <Sparkles className="w-3.5 h-3.5" />
                            Powerful Features
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-white">
                            Everything You Need to{" "}
                            <span className="text-gradient">Engage Your Audience</span>
                        </h2>
                        <p className="text-[#94a3b8] text-lg max-w-2xl mx-auto">
                            From quick polls to comprehensive surveys, our platform gives you the tools to create, share, and analyze with ease.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <FeatureCard
                            icon={<Vote className="w-5 h-5" />}
                            title="Interactive Poll Builder"
                            description="Drag-and-drop interface to create beautiful polls with multiple question types, images, and custom styling."
                            color="indigo"
                            delay={0}
                        />
                        <FeatureCard
                            icon={<Zap className="w-5 h-5" />}
                            title="Real-time Results"
                            description="Watch responses come in live with instant updates. No refresh needed — see the data as it happens."
                            color="pink"
                            delay={100}
                        />
                        <FeatureCard
                            icon={<BarChart3 className="w-5 h-5" />}
                            title="Advanced Analytics"
                            description="Deep insights with beautiful charts, demographic breakdowns, export options, and trend analysis."
                            color="cyan"
                            delay={200}
                        />
                        <FeatureCard
                            icon={<Share2 className="w-5 h-5" />}
                            title="One-Click Sharing"
                            description="Share via link, embed on your website, or post directly to social media with custom branded URLs."
                            color="emerald"
                            delay={300}
                        />
                        <FeatureCard
                            icon={<Shield className="w-5 h-5" />}
                            title="Secure & Private"
                            description="Choose between anonymous or authenticated responses. GDPR compliant with enterprise-grade security."
                            color="amber"
                            delay={400}
                        />
                        <FeatureCard
                            icon={<Globe className="w-5 h-5" />}
                            title="Multi-Device Support"
                            description="Your polls look stunning on desktop, tablet, and mobile. Responsive design built-in from the ground up."
                            color="indigo"
                            delay={500}
                        />
                    </div>
                </div>
            </section>

            {/* ═══ HOW IT WORKS ═══ */}
            <section className="relative z-10 py-24 md:py-32 border-t border-white/[0.06]">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#ec4899]/10 border border-[#ec4899]/20 text-xs text-[#f472b6] mb-4">
                            <Clock className="w-3.5 h-3.5" />
                            Quick & Easy
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-white">
                            Create Your First Poll in{" "}
                            <span className="text-gradient-alt">Under 60 Seconds</span>
                        </h2>
                        <p className="text-[#94a3b8] text-lg max-w-2xl mx-auto">
                            No complex setup. No learning curve. Just powerful polling at your fingertips.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <StepCard
                            number="1"
                            icon={<LayoutDashboard className="w-5 h-5" />}
                            title="Design Your Questions"
                            description="Use our intuitive builder to craft single or multiple-choice questions with rich formatting options."
                            delay={0}
                        />
                        <StepCard
                            number="2"
                            icon={<Share2 className="w-5 h-5" />}
                            title="Share the Link"
                            description="Get a unique URL instantly. Share via email, social media, QR code, or embed directly on your site."
                            delay={100}
                        />
                        <StepCard
                            number="3"
                            icon={<TrendingUp className="w-5 h-5" />}
                            title="Watch Live Results"
                            description="See responses roll in real-time on your dashboard with beautiful visualizations and instant updates."
                            delay={200}
                        />
                        <StepCard
                            number="4"
                            icon={<CheckCircle2 className="w-5 h-5" />}
                            title="Publish & Analyze"
                            description="Share final results with participants. Export data, generate reports, and gain actionable insights."
                            delay={300}
                        />
                    </div>
                </div>
            </section>

            {/* ═══ POLL PREVIEW / DEMO ═══ */}
            <section className="relative z-10 py-24 md:py-32 border-t border-white/[0.06] overflow-hidden">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#22c55e]/10 border border-[#22c55e]/20 text-xs text-[#4ade80] mb-4">
                                <MessageSquare className="w-3.5 h-3.5" />
                                Live Demo
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-white">
                                See What Your{" "}
                                <span className="text-gradient">Participants See</span>
                            </h2>
                            <p className="text-[#94a3b8] text-lg leading-relaxed mb-8">
                                Clean, distraction-free polling interfaces that your audience will love. 
                                Mobile-optimized, accessible, and designed for maximum engagement.
                            </p>
                            <ul className="space-y-4">
                                {[
                                    "Beautiful, responsive poll cards",
                                    "One-tap voting on mobile",
                                    "Progress indicators and completion tracking",
                                    "Instant confirmation and thank-you screens"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-[#cbd5e1]">
                                        <div className="w-5 h-5 rounded-full bg-[#22c55e]/10 flex items-center justify-center flex-shrink-0">
                                            <CheckCircle2 className="w-3 h-3 text-[#4ade80]" />
                                        </div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Demo Card */}
                        <div className="relative">
                            <div className="absolute -inset-4 bg-gradient-to-r from-[#6366f1]/10 to-[#ec4899]/10 rounded-3xl blur-2xl" />
                            <div className="relative glass-card p-6 md:p-8">
                                <div className="flex items-center gap-2 mb-6">
                                    <div className="w-2 h-2 rounded-full bg-red-500" />
                                    <div className="w-2 h-2 rounded-full bg-yellow-500" />
                                    <div className="w-2 h-2 rounded-full bg-green-500" />
                                    <div className="ml-auto text-xs text-[#64748b]">pollr.io/p/demo</div>
                                </div>

                                <div className="mb-6">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#22c55e]/10 border border-[#22c55e]/20 text-xs text-[#4ade80] mb-4">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse" />
                                        Active Poll
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">What's your favorite frontend framework?</h3>
                                    <p className="text-[#64748b] text-sm">Help us understand the developer landscape for 2026.</p>
                                </div>

                                <div className="space-y-3">
                                    {["React", "Vue.js", "Svelte", "Angular"].map((opt, i) => (
                                        <div key={i} className={`quiz-option ${i === 0 ? 'selected' : ''}`}>
                                            <div className="flex items-center gap-3">
                                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${i === 0 ? 'border-[#6366f1] bg-[#6366f1]' : 'border-white/30'}`}>
                                                    {i === 0 && <div className="w-2 h-2 rounded-full bg-white" />}
                                                </div>
                                                <span className="text-white/90 font-medium">{opt}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="relative z-10 py-24 md:py-32 border-t border-white/[0.06]">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="relative glass-card p-8 md:p-16 text-center overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#6366f1]/5 via-transparent to-[#ec4899]/5" />
                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-white">
                                Ready to Start{" "}
                                <span className="text-gradient">Polling?</span>
                            </h2>
                            <p className="text-[#94a3b8] text-lg max-w-xl mx-auto mb-8">
                                Join thousands of creators, educators, and teams who trust Poller for their polling needs.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                {isSignedIn ? (
                                    <Link to="/polls/new">
                                        <Button size="lg" className="btn-primary h-14 px-8 text-base shadow-lg shadow-[#6366f1]/25">
                                            <Vote className="w-5 h-5 mr-2" />
                                            Create Your First Poll
                                        </Button>
                                    </Link>
                                ) : (
                                    <SignUpButton mode="modal">
                                        <Button size="lg" className="btn-primary h-14 px-8 text-base shadow-lg shadow-[#6366f1]/25">
                                            Get Started for Free
                                            <ArrowRight className="w-5 h-5 ml-2" />
                                        </Button>
                                    </SignUpButton>
                                )}
                            </div>
                            <p className="text-[#64748b] text-sm mt-4">Free forever. No credit card required.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ FOOTER ═══ */}
            <footer className="relative z-10 border-t border-white/[0.06] bg-white/[0.01] py-12">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6366f1] to-[#ec4899] flex items-center justify-center">
                                <Vote className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-xl font-bold text-white">Poller</span>
                        </div>
                        <div className="flex items-center gap-6 text-sm text-[#64748b]">
                            <span>© 2026 Poller. All rights reserved.</span>
                            <span className="hidden md:inline">•</span>
                            <span className="hidden md:inline">Built with care for better decisions.</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}