"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, ContactShadows, PerspectiveCamera, OrbitControls } from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from "three";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

// --- 3D Product Models ---

function Mango({ position, scale = 1 }: { position?: [number, number, number]; scale?: number }) {
    return (
        <group position={position} scale={scale}>
            {/* Mango Body */}
            <mesh position={[0, 0, 0]}>
                {/* Deformed sphere for mango shape */}
                <sphereGeometry args={[1, 32, 32]} />
                <meshStandardMaterial color="#FFB703" roughness={0.4} metalness={0.1} />
            </mesh>
            {/* Stem */}
            <mesh position={[0, 0.9, 0]}>
                <cylinderGeometry args={[0.05, 0.05, 0.3]} />
                <meshStandardMaterial color="#3D2C2E" />
            </mesh>
            {/* Leaf */}
            <mesh position={[0.2, 0.9, 0]} rotation={[0, 0, -0.5]}>
                <coneGeometry args={[0.2, 0.6, 5]} />
                <meshStandardMaterial color="#2D6A4F" />
            </mesh>
        </group>
    );
}

function Cashew({ position, scale = 1 }: { position?: [number, number, number]; scale?: number }) {
    return (
        <group position={position} scale={scale}>
            {/* Kidney Shape - approximated with dual spheres + connection */}
            <mesh position={[-0.4, 0.2, 0]} rotation={[0, 0, 0.5]}>
                <capsuleGeometry args={[0.4, 1.2, 8, 16]} />
                <meshStandardMaterial color="#F4F1DE" roughness={0.5} />
            </mesh>
            <mesh position={[0.4, 0.4, 0]} rotation={[0, 0, -0.5]}>
                <capsuleGeometry args={[0.35, 1, 8, 16]} />
                <meshStandardMaterial color="#F4F1DE" roughness={0.5} />
            </mesh>
        </group>
    )
}

function PulpCan({ position, scale = 1 }: { position?: [number, number, number]; scale?: number }) {
    return (
        <group position={position} scale={scale}>
            <mesh castShadow receiveShadow>
                <cylinderGeometry args={[0.8, 0.8, 2.2, 32]} />
                <meshStandardMaterial color="#eee" metalness={0.8} roughness={0.2} />
            </mesh>
            {/* Label */}
            <mesh position={[0, 0, 0.81]}>
                <cylinderGeometry args={[0.81, 0.81, 1.4, 32, 1, true, 0, Math.PI]} />
                <meshStandardMaterial color="#FFB703" side={THREE.DoubleSide} />
            </mesh>
            {/* Lid */}
            <mesh position={[0, 1.1, 0]}>
                <cylinderGeometry args={[0.82, 0.82, 0.1, 32]} />
                <meshStandardMaterial color="#Silver" metalness={0.9} roughness={0.2} />
            </mesh>
        </group>
    )
}

function ProductStage({ type }: { type: 'mango' | 'cashew' | 'pulp' }) {
    const meshRef = useRef<THREE.Group>(null);
    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
            meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
        }
    })

    return (
        <group ref={meshRef}>
            <Float rotationIntensity={0.2} floatIntensity={0.5}>
                {type === 'mango' && <Mango position={[0, 0, 0]} scale={2.2} />}
                {type === 'cashew' && <Cashew position={[0, 0, 0]} scale={2.5} />}
                {type === 'pulp' && <PulpCan position={[0, 0, 0]} scale={1.8} />}
            </Float>
            <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={10} blur={2} far={4.5} />
        </group>
    )
}


const products = [
    {
        id: "mango",
        name: "Alphonso Mangoes",
        desc: "The King of Mangoes. GI-tagged Ratnagiri Alphonso with rich aroma and sweetness.",
        price: "Variable / Dozen",
        type: 'mango' as const
    },
    {
        id: "pulp",
        name: "Premium Mango Pulp",
        desc: "100% natural, additive-free pulp. Ideal for beverages and confectionery.",
        price: "Variable / Kg",
        type: 'pulp' as const
    },
    {
        id: "cashew",
        name: "Jumbo Cashews",
        desc: "W180/W240 Grade. Crisp, whole kernels processed in hygienic facilities.",
        price: "Variable / Kg",
        type: 'cashew' as const
    },
];

export default function ProductShowcase() {
    return (
        <section id="products" className="py-24 bg-brand-beige">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16 space-y-4">
                    <span className="text-brand-clay font-bold tracking-widest uppercase text-sm">Agriculture</span>
                    <h2 className="text-4xl md:text-5xl font-bold font-heading text-brand-navy">
                        Our Premium <span className="text-brand-mango">Harvest</span>
                    </h2>
                    <p className="text-brand-navy/70 max-w-2xl mx-auto">
                        Directly sourced. Meticulously graded. Export ready.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {products.map((product) => (
                        <div key={product.id} className="group relative bg-white rounded-3xl p-6 shadow-xl transition-all hover:scale-[1.02] hover:shadow-2xl border border-transparent hover:border-brand-mango/20">

                            {/* 3D Viewer Area */}
                            <div className="h-64 w-full bg-brand-beige/50 rounded-2xl mb-6 relative overflow-hidden">
                                <div className="absolute inset-0 pointer-events-none group-hover:pointer-events-auto transition-opacity">
                                    <Canvas shadows>
                                        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={45} />
                                        <ambientLight intensity={0.6} />
                                        <spotLight position={[5, 10, 5]} angle={0.3} penumbra={1} intensity={1} castShadow />
                                        <Environment preset="city" />
                                        <ProductStage type={product.type} />
                                        <OrbitControls enableZoom={false} autoRotate={false} />
                                    </Canvas>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between items-start">
                                    <h3 className="text-2xl font-bold font-heading text-brand-navy">{product.name}</h3>
                                </div>
                                <p className="text-brand-navy/70 text-sm leading-relaxed min-h-[60px]">
                                    {product.desc}
                                </p>
                                <div className="pt-4 flex items-center justify-between border-t border-gray-100">
                                    <Button variant="outline" size="sm" className="w-full group-hover:bg-brand-mango group-hover:text-brand-navy group-hover:border-brand-mango">
                                        View Details <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                </div>
                            </div>

                            {/* Floating Tag */}
                            <div className="absolute top-6 right-6 bg-brand-green/10 text-brand-green text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                                Export Grade
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
