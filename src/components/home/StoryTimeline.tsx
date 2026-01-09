"use client";

import { useRef, useState } from "react";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";

const steps = [
    {
        id: "farm",
        title: "1. The Source",
        description: "Handpicked from the lush, rugged hills of Ratnagiri. Our farmers ensure each harvest is peak quality.",
        color: "bg-brand-green/10 border-brand-green",
        image: "/images/timeline-farm.png"
    },
    {
        id: "process",
        title: "2. Processing",
        description: "Sorted, graded, and packed in hygienic facilities using state-of-the-art preservation techniques.",
        color: "bg-brand-mango/10 border-brand-mango",
        image: "/images/timeline-processing.png"
    },
    {
        id: "export",
        title: "3. Logistics",
        description: "Integrated cold-chain logistics from 'Dongar' (Hill) to 'Darya' (Port) ensuring freshness.",
        color: "bg-brand-navy/10 border-brand-navy",
        image: "/images/timeline-logistics.png"
    },
    {
        id: "global",
        title: "4. Global Reach",
        description: "Delivered to international markets securely. Bridging boundaries with premium Indian produce.",
        color: "bg-brand-teal/10 border-brand-teal",
        // Reuse global map reference or similar conceptual image. 
        // Since we have global-map.png, we can use it here too or just keep consistency with new style if generated.
        // Let's use global-map.png for now as it fits perfectly.
        image: "/images/global-map.png"
    },
];

export default function StoryTimeline() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const [activeStep, setActiveStep] = useState(0);

    return (
        <section ref={containerRef} id="process" className="relative bg-brand-beige">
            <div className="flex flex-col md:flex-row">

                {/* Left Side: Sticky Visuals */}
                <div className="w-full md:w-1/2 h-[50vh] md:h-screen sticky top-0 flex items-center justify-center bg-brand-beige overflow-hidden z-10 border-b md:border-b-0 border-brand-navy/5 p-8">
                    <div className="relative w-full max-w-md aspect-square">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeStep}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.05 }}
                                transition={{ duration: 0.4 }}
                                className="absolute inset-0"
                            >
                                <Image
                                    src={steps[activeStep].image}
                                    alt={steps[activeStep].title}
                                    fill
                                    className="object-contain drop-shadow-2xl"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Right Side: Scrollable Text Content */}
                <div className="w-full md:w-1/2 relative bg-brand-beige md:bg-transparent">
                    {/* Add padding top/bottom to allow scrolling flow */}
                    <div className="py-12 md:py-[20vh] space-y-16 md:space-y-[60vh] px-4 md:px-16">
                        {steps.map((step, index) => (
                            <StepCard
                                key={step.id}
                                step={step}
                                index={index}
                                onActive={() => setActiveStep(index)}
                            />
                        ))}
                        {/* Spacing to allow last item to scroll up */}
                        <div className="h-[20vh] md:hidden" />
                    </div>
                </div>
            </div>
        </section>
    );
}

function StepCard({ step, index, onActive }: any) {
    return (
        <motion.div
            className={cn("glass-panel p-6 md:p-12 rounded-2xl border-l-4 shadow-lg backdrop-blur-md bg-white/80 md:bg-white/60", step.color)}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ amount: 0.6, margin: "0px 0px -20% 0px" }}
            transition={{ duration: 0.6, type: "spring" }}
            onViewportEnter={onActive}
        >
            <h3 className="text-2xl md:text-3xl font-bold font-heading text-brand-navy mb-4">{step.title}</h3>
            <p className="text-base md:text-lg text-brand-navy/80 leading-relaxed">{step.description}</p>
        </motion.div>
    )
}
