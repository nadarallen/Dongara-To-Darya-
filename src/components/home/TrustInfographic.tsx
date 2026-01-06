"use client";

import { Canvas } from "@react-three/fiber";
import { Float, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { motion } from "framer-motion";

// --- 3D Badges ---
function Badge3D({ type }: { type: string }) {
    const getColor = () => {
        switch (type) {
            case 'qc': return "#E07A5F"; // Terracotta
            case 'pack': return "#F2CC8F"; // Light Orange
            case 'cold': return "#A8DADC"; // Ice Blue
            case 'ship': return "#457B9D"; // Deep Blue
            default: return "#ccc";
        }
    }

    return (
        <Float rotationIntensity={0.5} floatIntensity={0.5} speed={2}>
            <mesh rotation={[0.5, 0.5, 0]}>
                {type === 'qc' && <icosahedronGeometry args={[1.2, 0]} />}
                {type === 'pack' && <boxGeometry args={[1.5, 1.5, 1.5]} />}
                {type === 'cold' && <octahedronGeometry args={[1.3, 0]} />}
                {type === 'ship' && <torusGeometry args={[0.8, 0.4, 16, 32]} />}
                <meshStandardMaterial color={getColor()} roughness={0.3} metalness={0.8} />
            </mesh>
        </Float>
    )
}

const trustFactors = [
    {
        id: "qc",
        title: "Quality Certified",
        desc: "100% Export Grade. APEDA registered & Phyto-sanitary certified.",
    },
    {
        id: "pack",
        title: "Premium Packaging",
        desc: "Shock-proof, aerated packaging ensuring zero damage in transit.",
    },
    {
        id: "cold",
        title: "Cold Chain",
        desc: "Unbroken cold storage from 13°C farm collection to reefer containers.",
    },
    {
        id: "ship",
        title: "Global Logistics",
        desc: "Partnerships with Maersk & Hapag-Lloyd for guaranteed slot booking.",
    },
];

export default function TrustInfographic() {
    return (
        <section className="py-24 bg-brand-navy relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full bg-[url('/noise.png')] opacity-10 pointer-events-none"></div>

            <div className="container mx-auto px-4">
                <div className="text-center mb-16 space-y-4">
                    <span className="text-brand-mango font-bold tracking-widest uppercase text-sm">Why Choose Us</span>
                    <h2 className="text-4xl md:text-5xl font-bold font-heading text-white">
                        Uncompromising <span className="text-brand-teal">Quality</span>
                    </h2>
                    <p className="text-gray-300 max-w-2xl mx-auto">
                        From the soil of Ratnagiri to the shelves of Europe. We maintain impeccable standards at every step.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {trustFactors.map((factor, index) => (
                        <motion.div
                            key={factor.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="glass-panel bg-white/5 border-white/10 p-6 rounded-2xl flex flex-col items-center text-center group hover:bg-white/10 transition-all duration-300"
                        >
                            <div className="w-full h-40 mb-6 relative">
                                <Canvas shadows>
                                    <PerspectiveCamera makeDefault position={[0, 0, 5]} />
                                    <ambientLight intensity={0.5} />
                                    <pointLight position={[10, 10, 10]} />
                                    <Badge3D type={factor.id} />
                                </Canvas>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-brand-mango transition-colors">{factor.title}</h3>
                            <p className="text-sm text-gray-400 leading-relaxed">{factor.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
