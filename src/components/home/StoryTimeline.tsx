"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, PerspectiveCamera, Html } from "@react-three/drei";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import * as THREE from "three";

// --- 3D Elements ---

function TimelineIcon({ type, isActive }: { type: string; isActive: boolean }) {
    const meshRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (meshRef.current) {
            if (isActive) {
                meshRef.current.rotation.y += 0.02;
                meshRef.current.scale.lerp(new THREE.Vector3(1.2, 1.2, 1.2), 0.1);
            } else {
                meshRef.current.rotation.y += 0.005;
                meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
            }
        }
    });

    const getColor = () => {
        switch (type) {
            case 'farm': return "#81B29A"; // Green
            case 'process': return "#FFB703"; // Mango
            case 'export': return "#264653"; // Navy
            case 'global': return "#2A9D8F"; // Teal
            default: return "#ccc";
        }
    }

    return (
        <group ref={meshRef}>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                {/* Simple Low Poly Representations */}
                {type === 'farm' && (
                    <group>
                        <mesh position={[0, -0.5, 0]}>
                            <coneGeometry args={[1, 2, 4]} />
                            <meshStandardMaterial color={getColor()} />
                        </mesh>
                        <mesh position={[0.8, -0.8, 0.5]}>
                            <boxGeometry args={[0.5, 0.5, 0.5]} />
                            <meshStandardMaterial color="#E07A5F" />
                        </mesh>
                    </group>
                )}

                {type === 'process' && (
                    <group>
                        <mesh>
                            <cylinderGeometry args={[0.8, 0.8, 1, 8]} />
                            <meshStandardMaterial color={getColor()} />
                        </mesh>
                        <mesh position={[0, 0.6, 0]}>
                            <coneGeometry args={[0.8, 0.5, 8]} />
                            <meshStandardMaterial color="#E07A5F" />
                        </mesh>
                    </group>
                )}

                {type === 'export' && (
                    <group>
                        <mesh position={[0, -0.2, 0]}>
                            <boxGeometry args={[1.5, 0.8, 2.5]} />
                            <meshStandardMaterial color={getColor()} />
                        </mesh>
                        <mesh position={[0, 0.4, 0.5]}>
                            <boxGeometry args={[1, 0.5, 1]} />
                            <meshStandardMaterial color="#64748B" />
                        </mesh>
                    </group>
                )}

                {type === 'global' && (
                    <group>
                        <mesh>
                            <sphereGeometry args={[1, 16, 16]} />
                            <meshStandardMaterial color={getColor()} wireframe={true} />
                        </mesh>
                        <mesh>
                            <sphereGeometry args={[0.8, 16, 16]} />
                            <meshStandardMaterial color={getColor()} opacity={0.5} transparent />
                        </mesh>
                    </group>
                )}
            </Float>
        </group>
    );
}

const steps = [
    {
        id: "farm",
        title: "1. The Source",
        description: "Handpicked from the lush, rugged hills of Ratnagiri. Our farmers ensure each harvest is peak quality.",
        color: "bg-brand-green/10 border-brand-green",
    },
    {
        id: "process",
        title: "2. Processing",
        description: "Sorted, graded, and packed in hygienic facilities using state-of-the-art preservation techniques.",
        color: "bg-brand-mango/10 border-brand-mango",
    },
    {
        id: "export",
        title: "3. Logistics",
        description: "Integrated cold-chain logistics from 'Dongar' (Hill) to 'Darya' (Port) ensuring freshness.",
        color: "bg-brand-navy/10 border-brand-navy",
    },
    {
        id: "global",
        title: "4. Global Reach",
        description: "Delivered to international markets securely. Bridging boundaries with premium Indian produce.",
        color: "bg-brand-teal/10 border-brand-teal",
    },
];

export default function StoryTimeline() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const [activeStep, setActiveStep] = useState(0);

    // Simplified logic: Dividing scroll progress into 4 chunks
    // useFrame removed as it was outside Canvas context. 
    // State is driven by onViewportEnter in StepCard.

    return (
        <section ref={containerRef} id="process" className="relative h-[400vh] bg-brand-beige">
            <div className="sticky top-0 w-full h-screen flex flex-col md:flex-row overflow-hidden">

                {/* Left Side: 3D Visualization */}
                <div className="w-full md:w-1/2 h-1/2 md:h-full relative bg-gradient-to-br from-brand-beige to-white">
                    <Canvas shadows className="w-full h-full">
                        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
                        <ambientLight intensity={0.5} />
                        <pointLight position={[10, 10, 10]} intensity={1} castShadow />
                        <Environment preset="studio" />

                        <TimelineIcon type={steps[activeStep].id} isActive={true} />
                    </Canvas>
                    {/* Mobile Overlay Text for context if needed */}
                </div>

                {/* Right Side: Scrollable Text Content */}
                <div className="w-full md:w-1/2 h-1/2 md:h-full flex items-center justify-center p-8 relative">
                    {/* We iterate steps and show them based on scroll */}
                    <div className="relative w-full max-w-md space-y-24">
                        {steps.map((step, index) => (
                            <StepCard
                                key={step.id}
                                step={step}
                                index={index}
                                scrollYProgress={scrollYProgress}
                                onActive={() => setActiveStep(index)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function StepCard({ step, index, scrollYProgress, onActive }: any) {
    // A simplified scroll trigger could be an IntersectionObserver, 
    // but here we use motion values to opacity in/out.
    // For simplicity in this demo, we'll try to trigger the 'onActive' via viewport check logic 
    // or just render all and let the user scroll through them (sticky right side is tricky).

    // BETTER APPROACH for "Sticky + Scroll":
    // The parent is 400vh. The sticky container holds the 3D view.
    // The right side content flows normally? No, that would scroll away.
    // The user wants "Smooth scroll based animations".

    // Let's use `whileInView` framer motion to trigger the state change.

    return (
        <motion.div
            className={cn("glass-panel p-8 rounded-2xl border-l-4 shadow-lg my-32", step.color)}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ amount: 0.8, margin: "-20% 0px -20% 0px" }}
            transition={{ duration: 0.8 }}
            onViewportEnter={onActive}
        >
            <h3 className="text-3xl font-bold font-heading text-brand-navy mb-4">{step.title}</h3>
            <p className="text-lg text-brand-navy/80">{step.description}</p>
        </motion.div>
    )
}
