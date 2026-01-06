import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", ...props }, ref) => {
        const variants = {
            primary:
                "bg-brand-mango text-brand-navy shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 active:shadow-md border border-brand-mango/50",
            secondary:
                "bg-brand-navy text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 active:shadow-md border border-brand-navy/50",
            outline:
                "bg-transparent border-2 border-brand-navy text-brand-navy hover:bg-brand-navy/5",
            ghost: "bg-transparent text-brand-navy hover:bg-brand-navy/10 shadow-none",
        };

        const sizes = {
            sm: "h-9 px-4 text-sm",
            md: "h-11 px-6 text-base",
            lg: "h-14 px-8 text-lg",
        };

        return (
            <button
                ref={ref}
                className={cn(
                    "relative inline-flex items-center justify-center font-bold tracking-wide transition-all duration-300 rounded-xl disabled:opacity-50 disabled:pointer-events-none",
                    variants[variant],
                    sizes[size],
                    className
                )}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export { Button };
