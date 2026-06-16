import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "../lib/utils";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "gradient";
    size?: "sm" | "md" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", ...props }, ref) => {
        const variants = {
            primary: "bg-white text-[#0a0a0f] hover:bg-white/90 shadow-lg shadow-white/10",
            secondary: "bg-white/[0.06] text-white/80 hover:bg-white/[0.1] border border-white/[0.08] hover:border-white/[0.15]",
            outline: "border border-white/20 bg-transparent text-white hover:bg-white/5 hover:border-white/30",
            ghost: "text-white/50 hover:text-white hover:bg-white/5",
            danger: "bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20",
            gradient: "bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white hover:from-[#818cf8] hover:to-[#a78bfa] shadow-lg shadow-[#6366f1]/20",
        };

        const sizes = {
            sm: "h-9 px-3 text-sm",
            md: "h-10 px-4 py-2",
            lg: "h-12 px-8 text-base",
        };

        return (
            <button
                ref={ref}
                className={cn(
                    "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6366f1]/50 focus-visible:ring-offset-0 disabled:pointer-events-none disabled:opacity-40 active:scale-[0.98]",
                    variants[variant],
                    sizes[size],
                    className,
                )}
                {...props}
            />
        );
    },
);
Button.displayName = "Button";