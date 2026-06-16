import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "../lib/utils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, error, ...props }, ref) => {
        return (
            <div className="w-full">
                <input
                    ref={ref}
                    className={cn(
                        "flex h-11 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white ring-offset-0 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6366f1]/40 focus-visible:ring-offset-0 focus-visible:border-[#6366f1]/30 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 hover:border-white/15",
                        error && "border-red-500/40 focus-visible:ring-red-500/30 focus-visible:border-red-500/30",
                        className,
                    )}
                    {...props}
                />
                {error && (
                    <span className="text-xs text-red-400 mt-1.5 flex items-center gap-1">
                        <svg className="w-3 h-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {error}
                    </span>
                )}
            </div>
        );
    },
);
Input.displayName = "Input";