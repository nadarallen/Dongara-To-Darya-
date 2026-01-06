"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Anchor } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Products", href: "#products" },
        { name: "Process", href: "#process" },
        { name: "Contact", href: "#contact" },
    ];

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
                isScrolled
                    ? "glass-panel py-3 border-white/20"
                    : "bg-transparent py-5"
            )}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 bg-brand-navy rounded-lg flex items-center justify-center shadow-lg group-hover:bg-brand-mango transition-colors">
                            <Anchor className="text-white w-6 h-6" />
                        </div>
                        <span className={cn("text-2xl font-bold tracking-tight font-heading", isScrolled ? "text-brand-navy" : "text-brand-navy drop-shadow-md")}>
                            Dongar To Darya
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-brand-navy hover:text-brand-clay font-medium transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Button size="sm" variant="primary">
                            Get Quote
                        </Button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-brand-navy hover:text-brand-clay transition-colors"
                        >
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden glass-panel absolute top-full left-0 right-0 border-t border-white/20 p-4 flex flex-col space-y-4 shadow-xl">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-brand-navy hover:text-brand-clay font-medium text-lg py-2"
                            onClick={() => setIsOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Button className="w-full">Get Quote</Button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
