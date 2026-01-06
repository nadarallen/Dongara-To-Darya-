"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { MessageCircle, Calculator, PackageCheck, Globe2 } from "lucide-react";
import { cn } from "@/lib/utils";

const products = [
    { id: "mango", name: "Alphonso Mangoes", unit: "Dozen", basePrice: 800 },
    { id: "pulp", name: "Mango Pulp", unit: "Kg", basePrice: 150 },
    { id: "cashew", name: "Jumbo Cashews", unit: "Kg", basePrice: 1200 },
];

const countries = [
    "United States", "United Kingdom", "UAE", "Germany", "Singapore", "Australia", "Other"
];

export default function OrderCalculator() {
    const [selectedProduct, setSelectedProduct] = useState(products[0]);
    const [quantity, setQuantity] = useState(10);
    const [country, setCountry] = useState("United States");

    const estimatedCost = selectedProduct.basePrice * quantity;

    const handleWhatsApp = () => {
        const message = `Hello Dongar To Darya, I'm interested in importing:
    
Product: ${selectedProduct.name}
Quantity: ${quantity} ${selectedProduct.unit}
Destination: ${country}
Estimated Value: ₹${estimatedCost}

Please provide a formal quote.`;

        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/919876543210?text=${encodedMessage}`, '_blank');
    };

    return (
        <section className="py-24 bg-brand-navy relative overflow-hidden" id="calculator">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-teal/5 rounded-l-[10rem] pointer-events-none"></div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left Content */}
                    <div className="space-y-8 text-white">
                        <div className="space-y-4">
                            <span className="text-brand-mango font-bold tracking-widest uppercase text-sm">Trade Calculator</span>
                            <h2 className="text-4xl md:text-5xl font-bold font-heading">
                                Instant <span className="text-brand-teal">Export</span> Estimation
                            </h2>
                            <p className="text-gray-300 text-lg max-w-lg leading-relaxed">
                                Plan your shipment with real-time pricing estimates. Select your product, quantity, and destination to get started instantly.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="glass-panel bg-white/5 border-white/10 p-6 rounded-2xl">
                                <Globe2 className="w-8 h-8 text-brand-mango mb-4" />
                                <h4 className="font-bold text-lg mb-1">Global Reach</h4>
                                <p className="text-sm text-gray-400">Exporting to 20+ countries worldwide.</p>
                            </div>
                            <div className="glass-panel bg-white/5 border-white/10 p-6 rounded-2xl">
                                <PackageCheck className="w-8 h-8 text-brand-mango mb-4" />
                                <h4 className="font-bold text-lg mb-1">Secure Packing</h4>
                                <p className="text-sm text-gray-400">Certified export-grade materials.</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Calculator Card */}
                    <div className="glass-card bg-white rounded-3xl p-8 md:p-10 shadow-2xl border-t border-white/60 relative">
                        <div className="absolute -top-6 -right-6 w-20 h-20 bg-brand-mango rounded-2xl rotate-12 flex items-center justify-center shadow-lg">
                            <Calculator className="w-10 h-10 text-brand-navy -rotate-12" />
                        </div>

                        <div className="space-y-8">
                            {/* Product Selection */}
                            <div className="space-y-3">
                                <label className="text-brand-navy font-bold text-sm uppercase tracking-wide">Select Product</label>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                    {products.map((p) => (
                                        <button
                                            key={p.id}
                                            onClick={() => setSelectedProduct(p)}
                                            className={cn(
                                                "px-4 py-3 rounded-xl border text-sm font-bold transition-all",
                                                selectedProduct.id === p.id
                                                    ? "bg-brand-navy text-white border-brand-navy shadow-lg scale-105"
                                                    : "bg-gray-50 text-gray-600 border-gray-200 hover:border-brand-navy/30"
                                            )}
                                        >
                                            {p.name}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Quantity & Country */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <label className="text-brand-navy font-bold text-sm uppercase tracking-wide">Quantity ({selectedProduct.unit})</label>
                                    <input
                                        type="number"
                                        min="10"
                                        value={quantity}
                                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 0))}
                                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-brand-navy focus:ring-0 outline-none font-bold text-brand-navy text-lg transition-colors"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-brand-navy font-bold text-sm uppercase tracking-wide">Destination</label>
                                    <select
                                        value={country}
                                        onChange={(e) => setCountry(e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-brand-navy focus:ring-0 outline-none font-bold text-brand-navy text-lg transition-colors appearance-none"
                                    >
                                        {countries.map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>
                            </div>

                            {/* Total & Action */}
                            <div className="pt-8 border-t border-gray-100 space-y-6">
                                <div className="flex justify-between items-end">
                                    <span className="text-gray-500 font-medium">Estimated Value (Excl. Shipping)</span>
                                    <span className="text-3xl font-bold text-brand-navy font-heading">
                                        ₹{estimatedCost.toLocaleString()}
                                    </span>
                                </div>

                                <Button
                                    onClick={handleWhatsApp}
                                    size="lg"
                                    className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white border-none shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all"
                                >
                                    <MessageCircle className="w-6 h-6 mr-2" />
                                    Proceed via WhatsApp
                                </Button>
                                <p className="text-xs text-center text-gray-400">
                                    *Final pricing may vary based on seasonal rates and logistics.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
